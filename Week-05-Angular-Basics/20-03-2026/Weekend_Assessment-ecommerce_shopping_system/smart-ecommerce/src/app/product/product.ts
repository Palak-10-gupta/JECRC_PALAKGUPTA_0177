import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

  search = '';
  category = 'All';

  categories = ['All','Electronics','Fashion','Home'];

  products:any[] = [

    { id:1,name:'Laptop',price:70000,category:'Electronics',rating:4.5,
      image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', qty:1 },

    { id:2,name:'Headphones',price:3000,category:'Electronics',rating:4.2,
      image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', qty:1 },

    { id:3,name:'Smartphone',price:25000,category:'Electronics',rating:4.3,
      image:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', qty:1 },

    { id:4,name:'Shoes',price:2500,category:'Fashion',rating:4,
      image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', qty:1 },

    { id:5,name:'Watch',price:5000,category:'Fashion',rating:4.6,
      image:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400', qty:1 },

    { id:6,name:'Jacket',price:3500,category:'Fashion',rating:4.1,
      image:'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400', qty:1 },

    { id:7,name:'Chair',price:3500,category:'Home',rating:4.2,
      image:'https://images.unsplash.com/photo-1503602642458-232111445657?w=400', qty:1 },

    { id:8,name:'Table',price:5500,category:'Home',rating:4.4,
      image:'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400', qty:1 },

    { id:9,name:'Lamp',price:1500,category:'Home',rating:4,
      image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', qty:1 }

  ];

  constructor(public cart:CartService){}

  addToCart(p:any){

    for(let i=0;i<p.qty;i++){
      this.cart.add(p);
    }

    p.qty = 1;

    alert("Added to cart");

  }

  filteredProducts(){
    return this.products.filter(p =>
      (this.category==='All' || p.category===this.category) &&
      p.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

}