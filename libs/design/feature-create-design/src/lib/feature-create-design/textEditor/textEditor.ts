import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'design-text-editor',
  imports: [CommonModule, CardModule, InputNumberModule],
  styleUrl: './textEditor.scss',
  template: `
    <p-card class="text-editor-card">
      <div class="flex justify-center items-center gap-4 card-container">
        <div>
          <p-inputnumber
            [showButtons]="true"
            buttonLayout="horizontal"
            inputId="horizontal"
            spinnerMode="horizontal"
            [step]="1"
            [min]="0"
            [max]="800"
            [inputStyle]="{ width: '3.5rem' }"
          >
            <ng-template #incrementbuttonicon>
              <span class="pi pi-plus"></span>
            </ng-template>
            <ng-template #decrementbuttonicon>
              <span class="pi pi-minus"></span>
            </ng-template>
          </p-inputnumber>
        </div>

        <div class="text-color-picker cursor-pointer">
          <img
            style="height: 24px; width:24px; position: relative; top: 4px;"
            src="img/text-color.svg"
            alt="text-color"
          />
          <div
            class="color-picker"
            style="height: 4px; border-radius:6px;"
          ></div>
        </div>

        <div class="cursor-pointer">
          <img
            style="height: 24px; width:24px;"
            src="img/text-bold-active.svg"
            alt="text-bold"
          />
        </div>
      </div>
    </p-card>
  `,
})
export class TextEditorComponent {
  fontSize: number | null = null;
  fontColor: string | null = null;
  isBold = false;
  isItalic = false;

  updateTextProperty(property: string, value: any) {
    console.log(property, value);
  }

  toggleBold() {
    this.isBold = !this.isBold;
    this.updateTextProperty('fontWeight', this.isBold ? 'bold' : 'normal');
  }

  toggleItalic() {
    this.isItalic = !this.isItalic;
    this.updateTextProperty('fontStyle', this.isItalic ? 'italic' : 'normal');
  }
}
