import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { NavItem } from '../../../models/nav-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed', 
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ])
  ],
})
export class MenuItemComponent implements OnInit{
  declare expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded!: boolean;
  @Input('item') _item!: NavItem;
  @Input('depth') _depth!: number;

  constructor(
    private navSVC: NavService,
    private router: Router,
  ){}

  ngOnInit(): void {
    if(this._depth === undefined) {
      this._depth = 0;
    }
  }

  onItemClick(item: NavItem) {
    if((!item.children || !item.children.length) && item.route) {
      this.router.navigateByUrl(item.route);
    }
    if(item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
