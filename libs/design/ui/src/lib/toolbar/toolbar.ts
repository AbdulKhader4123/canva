import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'design-toolbar',
  imports: [CommonModule, Menu],
  template: `<p-menu [model]="items" [dt]="customMenuToken" styleClass="h-full">
    <ng-template #item let-item>
      <a pRipple class="flex flex-col items-center p-menu-item-link">
        <span style="font-size: 22px;" [class]="item.icon"></span>
        <span style="font-size: 12px;">{{ item.label }}</span>
        <span
          *ngIf="item.shortcut"
          class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
        >
          {{ item.shortcut }}
        </span>
      </a>
    </ng-template>
  </p-menu>`,
  styleUrl: './toolbar.scss',
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
