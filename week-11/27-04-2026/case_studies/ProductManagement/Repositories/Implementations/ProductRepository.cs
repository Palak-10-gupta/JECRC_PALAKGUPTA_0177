using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Models;
using ProductManagement.Repositories.Interfaces;

namespace ProductManagement.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        // CREATE
        public async Task<int> CreateAsync(ProductRequestDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                CategoryId = dto.CategoryId
            };

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            // Add Product Details
            if (!string.IsNullOrEmpty(dto.Description))
            {
                var details = new ProductDetails
                {
                    Id = product.Id,
                    Description = dto.Description
                };

                await _context.ProductDetails.AddAsync(details);
            }

            // Add Tags
            if (dto.TagIds != null && dto.TagIds.Any())
            {
                foreach (var tagId in dto.TagIds)
                {
                    await _context.ProductTags.AddAsync(
                        new ProductTag
                        {
                            ProductId = product.Id,
                            TagId = tagId
                        });
                }
            }

            await _context.SaveChangesAsync();

            return product.Id;
        }


        // DELETE
        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.productDetails)
                .Include(p => p.ProductTags)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            if (product.productDetails != null)
                _context.ProductDetails.Remove(product.productDetails);

            if (product.ProductTags.Any())
                _context.ProductTags.RemoveRange(product.ProductTags);

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            return true;
        }


        // GET ALL
        public async Task<IEnumerable<ProductResponseDto>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.productDetails)
                .Include(p => p.ProductTags)
                    .ThenInclude(pt => pt.Tag)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    CategoryName = p.Category.Name,
                    Description = p.productDetails.Description,
                    Tags = p.ProductTags
                            .Select(pt => pt.Tag.Name)
                            .ToList()
                })
                .ToListAsync();
        }


        // GET BY ID
        public async Task<ProductResponseDto> GetByIdAsync(int id)
        {
            var p = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.productDetails)
                .Include(p => p.ProductTags)
                    .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (p == null)
                return null;

            return new ProductResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                CategoryName = p.Category.Name,
                Description = p.productDetails.Description,
                Tags = p.ProductTags
                        .Select(pt => pt.Tag.Name)
                        .ToList()
            };
        }


        // UPDATE
        public async Task<bool> UpdateAsync(int id, ProductRequestDto dto)
        {
            var product = await _context.Products
                .Include(p => p.productDetails)
                .Include(p => p.ProductTags)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            // Update product
            product.Name = dto.Name;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;

            // Update description
            if (product.productDetails != null)
            {
                product.productDetails.Description = dto.Description;
            }
            else
            {
                product.productDetails = new ProductDetails
                {
                   Id = product.Id,
                    Description = dto.Description
                };
            }

            // Remove old tags
            _context.ProductTags.RemoveRange(product.ProductTags);

            // Add new tags
            if (dto.TagIds != null && dto.TagIds.Any())
            {
                foreach (var tagId in dto.TagIds)
                {
                    await _context.ProductTags.AddAsync(
                        new ProductTag
                        {
                            ProductId = product.Id,
                            TagId = tagId
                        });
                }
            }

            await _context.SaveChangesAsync();

            return true;
        }

        Task<IEnumerable<ProductRequestDto>> IProductRepository.GetAllAsync()
        {
            throw new NotImplementedException();
        }

        Task<ProductRequestDto> IProductRepository.GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}