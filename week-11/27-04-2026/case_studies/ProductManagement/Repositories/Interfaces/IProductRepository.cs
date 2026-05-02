using ProductManagement.DTOs;
using ProductManagement.Repositories.Implementations;

namespace ProductManagement.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductRequestDto>> GetAllAsync();
        Task<ProductRequestDto> GetByIdAsync(int id);
        Task<int> CreateAsync(ProductRequestDto dto);
        Task<bool> UpdateAsync(int id, ProductRequestDto dto);
        Task<bool> DeleteAsync(int id);

    }
}
