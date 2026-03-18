import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRoleBased]',
  standalone: true
})
export class RoleBasedDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRoleBased(condition: boolean) {
    this.viewContainer.clear();
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}