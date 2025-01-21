import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../sidenav/sidenav';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'layout-sidebar',
  imports: [CommonModule, SidenavComponent, ButtonModule],
  template: `<div class="flex h-full">
    <layout-sidenav></layout-sidenav>
    <!-- <div class="p-4 w-64">
      <div>
          <img class="mb-4" src="img/canva.svg" alt="canvas"/>
          <p-button label="Create a design" icon="pi pi-plus" styleClass="w-full create-design-btn" />
      </div>
  </div>  -->
  </div> `,
})
export class SidebarComponent {
  @Input() editorMode = false;
}
