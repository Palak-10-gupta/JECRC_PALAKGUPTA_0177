import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
   standalone: false  
})
export class AppComponent implements OnInit {
  get inStockCount(): number {
  return this.allProducts.filter(p => p.stock > 0).length;
}
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  showInStockOnly: boolean = false;
  priceSortAsc: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = [...this.allProducts];
    this.categories = [...new Set(this.allProducts.map(p => p.category))];
  }

  applyFilter(): void {
    let result = [...this.allProducts];

    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.showInStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    if (this.priceSortAsc) {
      result.sort((a, b) => a.price - b.price);
    }

    this.filteredProducts = result;
  }

  onFilter(): void {
    this.applyFilter();
  }

  onStockToggle(): void {
    this.applyFilter();
  }

  sortByPrice(): void {
    this.priceSortAsc = true;
    this.applyFilter();
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'badge-out';
    if (stock <= 5) return 'badge-low';
    return 'badge-in';
  }

  getStockLabel(stock: number): string {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';

  }
}