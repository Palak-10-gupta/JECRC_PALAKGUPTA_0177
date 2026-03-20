import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
selector:'app-dashboard',
standalone:true,
imports:[CommonModule],
templateUrl:'./dashboard.html',
styleUrl:'./dashboard.css'
})
export class Dashboard{

@Input() changePage!: (p:string)=>void;

constructor(public cart:CartService){}

}