import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  constructor(public cart: CartService){}

  payment = '';
  delivery = 'standard';

  name = '';
  email = '';
  phone = '';
  city = '';
  state = '';
  country = '';

  terms = false;

  addresses:string[] = [''];

  orderPlaced = false;

  addAddress(){
    this.addresses.push('');
  }

  placeOrder(){

    if(this.name==='' || this.email==='' || this.phone===''){
      alert("Fill required details");
      return;
    }

    if(!this.terms){
      alert("Accept Terms");
      return;
    }

    this.orderPlaced = true;

    alert("🎉 Order Placed Successfully");

    this.cart.clear();

  }

}