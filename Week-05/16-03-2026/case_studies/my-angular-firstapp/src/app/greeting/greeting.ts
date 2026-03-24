import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  templateUrl: './greeting.html',
  styleUrl: './greeting.css'
})
export class Greeting {

  message = "Hello Welcome to Angular";

}