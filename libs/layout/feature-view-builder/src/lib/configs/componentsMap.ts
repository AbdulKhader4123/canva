import { DesignListComponent, ImageBannerComponent } from '@canva/layout/ui';
import { ComponentType } from '@canva/layout/models';

const ComponentsMap: { [key: string]: any } = {
  [ComponentType.image]: ImageBannerComponent,
  [ComponentType.designList]: DesignListComponent,
};

export default ComponentsMap;
