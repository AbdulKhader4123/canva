import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLabels } from '@canva/design/models';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'design-toolist',
  imports: [CommonModule, ButtonModule],
  styleUrl: './toolist.scss',
  template: ` @if (selectedMenu() === MenuLabels.TEXT) {
    <p-button styleClass="w-full" label="Add a text box" icon="pi pi-plus" />
    }`,
})
export class ToolistComponent {
  @Input() selectedMenu!: Signal<string>;
  MenuLabels = MenuLabels;
}
