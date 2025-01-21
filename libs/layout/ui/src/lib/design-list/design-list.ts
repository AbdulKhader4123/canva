import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { DesignRoutes, Designs } from '@canva/shared/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'layout-design-list',
  imports: [CarouselModule, CommonModule, RouterLink],
  template: `<p-carousel
    [value]="designs"
    [numVisible]="5"
    [showIndicators]="false"
    [showNavigators]="false"
    [circular]="false"
    [responsiveOptions]="responsiveOptions"
    styleClass="mt-2 design-carousel"
  >
    <ng-template let-design #item>
      <div
        aria-hidden="true"
        aria-modal="true"
        [routerLink]="['/design/' + design.route]"
        class="flex flex-col p-3 cursor-pointer items-center gap-3 design-item"
      >
        <div
          class="flex justify-center items-center rounded-full"
          style="width: 48px; height: 48px;"
          [ngStyle]="{ backgroundColor: design.bgColor }"
        >
          <img [src]="'img/' + design.img" [alt]="design.label" />
        </div>
        <p>{{ design.label }}</p>
      </div>
    </ng-template>
  </p-carousel> `,
  styleUrl: './design-list.scss',
})
export class DesignListComponent {
  responsiveOptions = [];
  designs = [
    {
      label: Designs.meme,
      route: DesignRoutes.meme,
      img: 'design-meme.svg',
      bgColor: '#fee5e6',
    },
    {
      label: Designs.doc,
      route: DesignRoutes.doc,
      img: 'design-doc.svg',
      bgColor: '#13a3b5',
    },
    {
      label: Designs.whiteboard,
      route: DesignRoutes.whiteboard,
      img: 'design-whiteboard.svg',
      bgColor: '#0ba84a',
    },
    {
      label: Designs.presentation,
      route: DesignRoutes.presentation,
      img: 'design-presentation.svg',
      bgColor: '#ff6105',
    },
    {
      label: Designs.video,
      route: DesignRoutes.video,
      img: 'design-video.svg',
      bgColor: '#e950f7',
    },
  ];
}
