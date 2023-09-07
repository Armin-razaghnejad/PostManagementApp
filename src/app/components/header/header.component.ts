import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [NgFor, RouterLinkActive, RouterLink]
})
export class HeaderComponent {
  menus = [
    {
      label: 'Home', path: '/'
    },
    {
      label: 'Add Post', path: '/add'
    },
  ]
}
