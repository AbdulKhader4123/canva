import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { FullHeightDirective } from '@canva/shared/utils';
import { ToolistComponent } from '@canva/design/ui';
import { MenuLabels, TextTypes } from '@canva/design/models';
import { CanvasFacadeService } from '@canva/design/data-access';
import * as fabric from 'fabric';

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
          [selectedMenu]="activeMenu() ? activeMenu() : popoverMenu()"
          (addText)="addText($event)"
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
  canvasFacadeService = inject(CanvasFacadeService);

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

  addText(textType: TextTypes) {
    let text = '';
    const options: Partial<fabric.Textbox> = {};

    switch (textType) {
      case TextTypes.HEADING:
        text = 'Add a heading';
        options.fontSize = 32;
        break;
      case TextTypes.SUBHEADING:
        text = 'Add a subheading';
        options.fontSize = 24;
        break;
      case TextTypes.BODY:
        text = 'Add a little bit of body text';
        options.fontSize = 16;
        break;
      case TextTypes.PARAGRAPH:
      default:
        text = 'Your paragraph text';
        options.fontSize = 18;
        break;
    }
    this.canvasFacadeService.addText(text, options);
  }
}
