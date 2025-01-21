import { Route } from '@angular/router';
import { FeatureLayoutComponent } from '@canva/layout/feature-layout';
import { FeatureViewBuilderComponent } from '@canva/layout/feature-view-builder';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: FeatureLayoutComponent,
    children: [
      { path: ':page', component: FeatureViewBuilderComponent },
      {
        path: 'design/:design',
        loadComponent: () =>
          import('@canva/design/feature-create-design').then(
            (m) => m.FeatureCreateDesignComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
