import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme: string = 'light';

  constructor(private el: ElementRef) {}

  ngOnChanges() {

    if (this.appTheme === 'dark') {

      this.el.nativeElement.style.background = '#0f172a';
      this.el.nativeElement.style.color = '#f1f5f9';
      this.el.nativeElement.style.transition = '0.4s';

    } else {

      this.el.nativeElement.style.background = '#f8fafc';
      this.el.nativeElement.style.color = '#0f172a';
      this.el.nativeElement.style.transition = '0.4s';

    }

  }

}