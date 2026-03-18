import { Component } from '@angular/core';
import { ActionPanel } from './action-panel/action-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ActionPanel],
  template: `<app-action-panel></app-action-panel>`
})
export class App {}