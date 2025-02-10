import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLabels, TextTypes } from '@canva/design/models';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'design-toolist',
  imports: [CommonModule, ButtonModule],
  styleUrl: './toolist.scss',
  template: ` @if (selectedMenu() === MenuLabels.TEXT) {
    <p-button
      styleClass="w-full"
      label="Add a text box"
      (click)="addText.emit(textTypes.PARAGRAPH)"
      icon="pi pi-plus"
    />
    <div class="flex flex-col gap-3 mt-4">
      <p class="group-heading">Default text styles</p>
      <button
        class="text-button text-heading"
        (click)="addText.emit(textTypes.HEADING)"
      >
        Add a heading
      </button>
      <button
        class="text-button text-subheading"
        (click)="addText.emit(textTypes.SUBHEADING)"
      >
        Add a subheading
      </button>
      <button
        class="text-button text-body"
        (click)="addText.emit(textTypes.BODY)"
      >
        Add a little bit of body text
      </button>
    </div>
    }`,
})
export class ToolistComponent {
  selectedMenu = input<string>();
  MenuLabels = MenuLabels;
  addText = output<TextTypes>();
  textTypes = TextTypes;
}
