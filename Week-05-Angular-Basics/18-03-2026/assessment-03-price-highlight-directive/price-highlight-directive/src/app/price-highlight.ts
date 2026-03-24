import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPriceHighlight]',
  standalone: true
})
export class PriceHighlightDirective implements OnInit {

  @Input() price!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {

    if (this.price > 50000) {
      this.el.nativeElement.style.backgroundColor = '#ffe5e5';
      this.el.nativeElement.style.borderLeft = '6px solid red';
    } else {
      this.el.nativeElement.style.backgroundColor = '#e8f8f5';
      this.el.nativeElement.style.borderLeft = '6px solid green';
    }

  }

}