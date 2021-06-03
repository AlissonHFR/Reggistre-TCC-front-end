import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenulChildDirective } from './item-menu-child.directive';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})
export class ItemMenuComponent {

  @Input() icon: string = ''
  @Input() title: string = ''

  @Input() singlePanel?: boolean = false
  @Input() sidenav?: any
  @Input() path?: string = ''
  expand: boolean = false

  @ContentChildren(ItemMenulChildDirective)
  children!: Array<ItemMenulChildDirective>;

  constructor(private router: Router) {
  }

  goToPath() {
    this.sidenav.close()
    this.expand = false
    this.router.navigate([this.path])
  }


}
