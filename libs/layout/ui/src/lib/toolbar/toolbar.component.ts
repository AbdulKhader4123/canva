import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'layout-toolbar',
  imports: [CommonModule, Menu],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Projects', icon: 'pi pi-folder' },
    { label: 'Templates', icon: 'pi pi-database' },
  ];
  customMenuToken = {
    colorScheme: {
      light: {
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
