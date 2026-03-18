import { Component } from '@angular/core';
import { PortalComponent } from './portal/portal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PortalComponent],
  template: `<app-portal></app-portal>`
})
export class App {}