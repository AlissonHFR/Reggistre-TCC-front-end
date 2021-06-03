import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[itemMenulChild]',
})
export class ItemMenulChildDirective {
  public itemTemplate: TemplateRef<any>;

  constructor(private templateRef: TemplateRef<any>) {
    this.itemTemplate = this.templateRef;
  }
}