import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.tamplateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private tamplateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }
}
