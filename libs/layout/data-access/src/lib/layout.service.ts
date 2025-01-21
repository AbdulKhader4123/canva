import { Injectable, signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

interface LayoutState {
  staticMenuActive?: boolean;
  overlayMenuActive?: boolean;
  configSidebarVisible?: boolean;
}

interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  _state: LayoutState = {
    staticMenuActive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
  };

  layoutState = signal<LayoutState>(this._state);

  private overlayOpen = new Subject<any>();

  private menuSource = new Subject<MenuChangeEvent>();

  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();

  resetSource$ = this.resetSource.asObservable();

  overlayOpen$ = this.overlayOpen.asObservable();

  isSidebarActive = computed(
    () =>
      this.layoutState().overlayMenuActive ||
      this.layoutState().staticMenuActive
  );

  onMenuToggle() {
    if (this.isDesktop()) {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuActive: !this.layoutState().staticMenuActive,
      }));
    } else {
      this.layoutState.update((prev) => ({
        ...prev,
        overlayMenuActive: !this.layoutState().overlayMenuActive,
      }));

      if (this.layoutState().overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next(true);
  }
}
