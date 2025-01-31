import {
  Component,
  ElementRef,
  Input,
  OnInit,
  viewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@canva/shared/ui';
import { FullHeightDirective } from '@canva/shared/utils';
import { ToolbarComponent } from '@canva/design/ui';
import * as fabric from 'fabric';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'design-feature',
  imports: [
    CommonModule,
    HeaderComponent,
    ToolbarComponent,
    FullHeightDirective,
  ],
  styles: [
    `
      .work-space-holder {
        background-color: var(--p-surface-100);
        position: relative;
        padding-left: 30px;
      }
    `,
  ],
  template: `
    <div fullHeight>
      <shared-header />
      <div class="temp" fullHeight [flexDirection]="'row'">
        <design-toolbar />
        <div
          flexChild
          #workSpaceHolder
          class="flex justify-center items-center work-space-holder"
        >
          <canvas id="fabricSurface"></canvas>
        </div>
      </div>
    </div>
  `,
})
export class FeatureCreateDesignComponent implements OnInit, OnDestroy {
  @Input() design = '';
  vcr = viewChild('workSpaceHolder', { read: ViewContainerRef });
  workSpaceHolder = viewChild('workSpaceHolder', { read: ElementRef });

  private resizeObserver!: ResizeObserver;
  private resizeSubject = new Subject<{ width: number; height: number }>();
  private canvas!: fabric.Canvas;
  private initialCanvasWidth!: number;
  private initialCanvasHeight!: number;
  private initialDimensionsSet = false;

  ngOnInit() {
    this.canvas = this.initializeCanvas();
    this.initializeResizeObserver();
    this.subscribeToResizeEvents();
    this.addText(this.canvas);
  }

  initializeCanvas() {
    const canvas = new fabric.Canvas('fabricSurface', {
      backgroundColor: '#ebebef',
      preserveObjectStacking: true,
    });

    this.updateCanvasDimensions(canvas, window.innerWidth, window.innerHeight);
    return canvas;
  }

  initializeResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.workSpaceHolder()?.nativeElement) {
          const { width, height } = entry.contentRect;
          this.resizeSubject.next({ width, height });
        }
      }
    });
    this.resizeObserver.observe(this.workSpaceHolder()?.nativeElement);
  }

  updateCanvasDimensions(
    canvas: fabric.Canvas,
    width: number,
    height: number
  ): void {
    if (!this.initialDimensionsSet) {
      this.initialCanvasWidth = width * 0.8;
      this.initialCanvasHeight = height * 0.7;
      this.initialDimensionsSet = true;
    }

    const scaleX = width / this.initialCanvasWidth;
    const scaleY = height / this.initialCanvasHeight;

    canvas.setDimensions({ width: width * 0.8, height: height * 0.7 });
    console.log(scaleX);
    canvas.getObjects().forEach((obj) => {
      const initialScaleX = obj.get('initialScaleX') || obj.scaleX || 1;
      const initialScaleY = obj.get('initialScaleY') || obj.scaleY || 1;
      const initialLeft = obj.get('initialLeft') || obj.left || 0;
      const initialTop = obj.get('initialTop') || obj.top || 0;

      obj.set({
        scaleX: initialScaleX * scaleX,
        scaleY: initialScaleY * scaleY,
        left: initialLeft * scaleX,
        top: initialTop * scaleY,
      });
      obj.setCoords();
    });

    canvas.renderAll();
  }

  addText(canvas: fabric.Canvas): void {
    const text = new fabric.Textbox('Hello World', {
      width: 200,
      height: 100,
      fontSize: 24,
      cursorColor: 'blue',
      left: 498,
      top: 225,
    });
    text.set({
      initialScaleX: text.scaleX,
      initialScaleY: text.scaleY,
      initialLeft: text.left,
      initialTop: text.top,
    });
    canvas.add(text);
  }

  subscribeToResizeEvents(): void {
    this.resizeSubject.pipe(debounceTime(50)).subscribe(({ width, height }) => {
      this.updateCanvasDimensions(this.canvas, width, height);
    });
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.resizeSubject.complete();
  }
}
