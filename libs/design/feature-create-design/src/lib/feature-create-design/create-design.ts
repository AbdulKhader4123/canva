import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@canva/shared/ui';
import { FullHeightDirective } from '@canva/shared/utils';
import { ToolbarComponent } from '@canva/design/ui';

@Component({
  selector: 'design-feature',
  imports: [
    CommonModule,
    HeaderComponent,
    ToolbarComponent,
    FullHeightDirective,
  ],
  template: `
    <div fullHeight>
      <shared-header />
      <design-toolbar flexChild />
    </div>
  `,
})
export class FeatureCreateDesignComponent {
  @Input() design = '';
}
