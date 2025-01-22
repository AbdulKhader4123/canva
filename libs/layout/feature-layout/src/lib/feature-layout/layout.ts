import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@canva/layout/ui';
import { CommonModule } from '@angular/common';
import { FullHeightDirective } from '@canva/shared/utils';

@Component({
  selector: 'layout-feature',
  imports: [SidebarComponent, RouterModule, CommonModule, FullHeightDirective],
  template: `
    <div fullHeight [flexDirection]="'row'" [ngClass]="containerClass">
      <layout-sidebar />
      <div flexChild class="layout-main-container">
        <div class="layout-main h-full">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class FeatureLayoutComponent {
  get containerClass() {
    return {
      // 'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
      // 'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
      // 'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
      // 'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
      // 'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
    };
  }
}
