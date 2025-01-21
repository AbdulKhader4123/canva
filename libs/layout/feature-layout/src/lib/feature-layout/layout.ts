import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@canva/layout/ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'layout-feature',
  imports: [SidebarComponent, RouterModule, CommonModule],
  template: `
    <div class="flex h-full" [ngClass]="containerClass">
      <layout-sidebar />
      <div class="layout-main-container flex-1">
        <div class="layout-main">
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
