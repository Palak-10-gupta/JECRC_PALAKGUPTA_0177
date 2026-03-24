import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickBlockDirective } from '../click-block';

@Component({
  selector: 'app-action-panel',
  standalone: true,
  imports: [CommonModule, ClickBlockDirective],
  templateUrl: './action-panel.html',
  styleUrl: './action-panel.css'
})
export class ActionPanel {

  allowAccess = false;

  toggleAccess() {
    this.allowAccess = !this.allowAccess;
  }

  performAction(type: string) {

    if (!this.allowAccess) {
      return;
    }

    alert(type + ' executed ✅');

  }

}