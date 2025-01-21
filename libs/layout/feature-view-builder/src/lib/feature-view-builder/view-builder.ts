import {
  Component,
  Input,
  OnInit,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { PageRoutes } from '@canva/shared/models';
import { ComponentConfig } from '@canva/layout/models';
import ComponentsMap from '../configs/componentsMap';
import dashboardControls from '../configs/dashboard.config';

@Component({
  selector: 'layout-view-builder',
  template: `<ng-container #container> </ng-container> `,
})
export class FeatureViewBuilderComponent implements OnInit {
  @Input() page = PageRoutes.dashboard;
  vcr = viewChild('container', { read: ViewContainerRef });

  ngOnInit() {
    const components = this.getComponentList(this.page);
    this.loadComponents(components);
  }

  getComponentList(page: string) {
    if (page === PageRoutes.dashboard) {
      return dashboardControls;
    }
    return [];
  }

  loadComponents(components: ComponentConfig[]) {
    for (const component of components) {
      this.vcr()?.createComponent(ComponentsMap[component.type]);
    }
  }
}
