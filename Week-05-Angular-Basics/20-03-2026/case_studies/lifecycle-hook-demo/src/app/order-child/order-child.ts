import { Component , 
  Input, 
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit, 
  AfterContentChecked, 
  AfterViewInit, 
  AfterViewChecked, 
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-child.html',
  styleUrl: './order-child.css',
})
export class OrderChild implements
OnChanges,
OnInit,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {

  @Input () orderData: any;

  logs: string[] =[];

  log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()} - ${message}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.log(' ngOnChanges - Input data changed');
  }
  
  ngOnInit() {
      this.log('ngOnInit - Component Initialized');
  }
  ngDoCheck() {
     this.log('ngDoCheck - Change detection');
  }

  ngAfterContentInit() {
      this.log('ngAfterContentInit - Content Initialized');
  }

  ngAfterContentChecked() {
      this.log('ngAfterContentChecked - Content checked');
  }

  ngAfterViewInit() {
       this.log('ngAfterViewInit - View Initialized');
  }

  ngAfterViewChecked() {
       this.log('ngAfterViewChecked - View checked');
  }

  ngOnDestroy() {
      this.log('ngOnDestroy - Component destroyed');
  }
}
