import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnInit {

  @Input() appStatusColor: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {

    if (this.appStatusColor >= 50) {

      this.el.nativeElement.style.borderLeft = '8px solid #16a34a';
      this.el.nativeElement.style.background = '#f0fdf4';

    } else {

      this.el.nativeElement.style.borderLeft = '8px solid #dc2626';
      this.el.nativeElement.style.background = '#fef2f2';

    }

  }

}