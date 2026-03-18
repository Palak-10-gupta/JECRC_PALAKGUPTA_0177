import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective {

  @Input() appClickBlock: boolean = true;

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): boolean {

    if (!this.appClickBlock) {

      alert('Access Blocked ❌');

      event.preventDefault();
      event.stopPropagation();

      return false;   
    }

    return true;      
  }

}