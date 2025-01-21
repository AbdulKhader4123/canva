import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { PageRoutes } from '@canva/shared/models';

@Component({
  selector: 'layout-sidenav',
  imports: [CommonModule, Menu, RouterModule],
  template: `<p-menu [model]="items" [dt]="customMenuToken" styleClass="h-full">
    <ng-template #item let-item>
      <a
        [routerLink]="item.route"
        #RouterLink="routerLinkActive"
        routerLinkActive="active-link"
        pRipple
        class="flex flex-col items-center p-menu-item-link"
      >
        <img
          style="font-size: 22px;"
          class="menu-svg"
          [src]="
            'img/menu-' +
            item.icon +
            (RouterLink?.isActive ? '-active' : '') +
            '.svg'
          "
          [alt]="item.label"
        />
        <span style="font-size: 12px;">{{ item.label }}</span>
      </a>
    </ng-template>
  </p-menu>`,
  styleUrl: './sidenav.scss',
})
export class SidenavComponent {
  items: MenuItem[] = [
    { label: 'Home', icon: 'home', route: PageRoutes.dashboard },
    // { label: 'Projects', icon: 'projects', route: 'projects' },
    // { label: 'Templates', icon: 'templates', route: 'templates' },
  ];
  customMenuToken = {
    colorScheme: {
      light: {
        borderRadius: '0',
        item: {
          color: '{purple.700}',
          focus: {
            background: '{purple.50}',
            color: '{purple.700}',
          },
        },
        list: {
          gap: '15px',
        },
      },
      dark: {
        item: {
          color: '{purple.700}',
        },
      },
    },
  };
}
