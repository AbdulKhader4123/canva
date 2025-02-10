import {
  Component,
  ElementRef,
  OnInit,
  viewChild,
  ViewContainerRef,
  OnDestroy,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@canva/shared/ui';
import { FullHeightDirective } from '@canva/shared/utils';
import { ToolbarComponent } from './toolbar/toolbar';
import * as fabric from 'fabric';
import { debounceTime, Subject } from 'rxjs';
import { CanvasFacadeService } from '@canva/design/data-access';
import { TextEditorComponent } from './textEditor/textEditor';

@Component({
  selector: 'design-feature',
  imports: [
    CommonModule,
    HeaderComponent,
    ToolbarComponent,
    FullHeightDirective,
    TextEditorComponent,
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
      <div fullHeight [flexDirection]="'row'" class="relative">
        <design-toolbar />
        <div
          #workSpaceHolder
          flexChild
          class="flex justify-center items-center work-space-holder"
        >
          <design-text-editor />
          <canvas id="fabricSurface"></canvas>
        </div>
      </div>
    </div>
  `,
})
export class FeatureCreateDesignComponent implements OnInit, OnDestroy {
  design = input('');
  vcr = viewChild('workSpaceHolder', { read: ViewContainerRef });
  workSpaceHolder = viewChild('workSpaceHolder', { read: ElementRef });

  private resizeObserver!: ResizeObserver;
  private resizeSubject = new Subject<{ width: number; height: number }>();
  private initialCanvasWidth!: number;
  private initialCanvasHeight!: number;
  private initialDimensionsSet = false;

  public canvasFacadeService = inject(CanvasFacadeService);

  ngOnInit() {
    const canvas = this.canvasFacadeService.initializeCanvas();
    setTimeout(() => {
      const workSpaceHolder = this.workSpaceHolder()?.nativeElement;
      const { width, height } = workSpaceHolder.getBoundingClientRect();
      this.updateCanvasDimensions(canvas, width * 0.9, height * 0.7);
    });
    this.initializeResizeObserver();
    this.subscribeToResizeEvents(canvas);
    this.updateObjectLocation(canvas);

    canvas.on('selection:created', (e) => this.handleSelection(e));
    canvas.on('selection:updated', (e) => this.handleSelection(e));

    // Listen for object deselection
    canvas.on('selection:cleared', () => {
      this.canvasFacadeService.setSelectedObjects([]);
    });
  }

  handleSelection(e: any) {
    const selectedObjects = e.selected;
    this.canvasFacadeService.setSelectedObjects(selectedObjects);
  }

  showTextEditor() {
    // Show the text editor at the top of the screen
    const textEditor = document.getElementById('textEditor');
    if (textEditor) {
      textEditor.style.display = 'block';
    }
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
      this.initialCanvasWidth = width;
      this.initialCanvasHeight = height;
      this.initialDimensionsSet = true;
    }

    const scaleX = width / this.initialCanvasWidth;
    const scaleY = height / this.initialCanvasHeight;

    canvas.setDimensions({ width: width, height: height });
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

  subscribeToResizeEvents(canvas: fabric.Canvas): void {
    this.resizeSubject.pipe(debounceTime(50)).subscribe(({ width, height }) => {
      this.updateCanvasDimensions(canvas, width * 0.9, height * 0.7);
    });
  }

  updateObjectLocation(canvas: fabric.Canvas) {
    canvas.on('object:modified', (e) => {
      const obj = e.target;
      if (obj) {
        obj.set({
          initialLeft: obj.left,
          initialTop: obj.top,
        });
      }
    });
  }

  undo() {
    this.canvasFacadeService.undo();
  }

  redo() {
    this.canvasFacadeService.redo();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.resizeSubject.complete();
  }
}
