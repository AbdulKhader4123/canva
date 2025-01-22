import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
} from '@angular/core';

@Directive({
  selector: '[fullHeight]',
})
export class FullHeightDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input() flexDirection: 'row' | 'column' = 'column';
  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(
      this.el.nativeElement,
      'flexDirection',
      this.flexDirection
    );
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');

    const childFlexElements =
      this.el.nativeElement.querySelectorAll('[flexChild]');
    childFlexElements.forEach((flexElement: HTMLElement) => {
      this.renderer.setStyle(flexElement, 'flex', '1');
    });
  }
}
