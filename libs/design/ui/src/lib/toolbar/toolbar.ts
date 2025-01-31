import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { FullHeightDirective } from '@canva/shared/utils';
import { ToolistComponent } from '../toolist';
import { MenuLabels } from '@canva/design/models';

@Component({
  selector: 'design-toolbar',
  imports: [
    CommonModule,
    Menu,
    CardModule,
    FullHeightDirective,
    ToolistComponent,
  ],
  template: `
    <div fullHeight [flexDirection]="'row'" class="relative">
      <p-menu
        [model]="items"
        [dt]="customMenuToken"
        styleClass="h-full"
        (mouseleave)="hidePopover()"
        [ngClass]="{
          active: activeMenu() !== ''
        }"
      >
        <ng-template #item let-item>
          <div
            pRipple
            class="flex flex-col items-center p-menu-item-link"
            (click)="setActiveMenu(item.label)"
            (keydown)="$event.key === 'Enter' && setActiveMenu(item.label)"
            (mouseenter)="showPopover(item.label)"
            tabindex="0"
          >
            <div
              [ngClass]="{ 'menu-container': activeMenu() === item.label }"
              class="p-1"
            >
              <img
                style="font-size: 22px;"
                [src]="
                  'img/menu-' +
                  item.icon +
                  (activeMenu() === item.label ? '-active' : '') +
                  '.svg'
                "
                [alt]="item.label"
              />
            </div>
            <span style="font-size: 12px;">{{ item.label }}</span>
          </div>
        </ng-template>
      </p-menu>
      <p-card
        (mouseenter)="showPopover(lastPopoverMenu())"
        (mouseleave)="hidePopover()"
        [ngClass]="{
          'card-static': activeMenu() !== '',
          'card-absolute': popoverMenu() !== '' && activeMenu() === '',
          'card-hidden': activeMenu() === '' && popoverMenu() === ''
        }"
        class="popover-card h-full"
      >
        <design-toolist
          [selectedMenu]="activeMenu() ? activeMenu : popoverMenu"
        />
      </p-card>
    </div>
  `,
  styleUrl: './toolbar.scss',
})
export class ToolbarComponent {
  items: MenuItem[] = [
    { label: MenuLabels.ELEMENTS, icon: 'elements' },
    { label: MenuLabels.TEXT, icon: 'elements' },
  ];
  activeMenu = signal('');
  popoverMenu = signal('');
  lastPopoverMenu = signal('');

  customMenuToken = {
    colorScheme: {
      light: {
        background: 'var(--p-surface-100)',
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

  showPopover(label: string) {
    if (this.activeMenu() === '') {
      this.popoverMenu.set(label);
      this.lastPopoverMenu.set(this.popoverMenu());
    }
  }

  hidePopover() {
    if (this.activeMenu() === '') {
      this.popoverMenu.set('');
    }
  }

  setActiveMenu(label: string) {
    if (label === this.activeMenu()) {
      this.activeMenu.set('');
      return;
    }
    this.activeMenu.set(label);
  }
}
