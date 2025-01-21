import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@canva/shared/ui';

@Component({
  selector: 'design-feature',
  imports: [CommonModule, HeaderComponent],
  template: `<shared-header />`,
})
export class FeatureCreateDesignComponent {
  @Input() design = '';
}
