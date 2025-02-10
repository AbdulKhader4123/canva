import { inject, Injectable } from '@angular/core';
import * as fabric from 'fabric';
import { CanvasStateService } from '../state/canvas-state.service';
import { ObjectCreationService } from '../service/object-creation.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasFacadeService {
  private canvasStateService = inject(CanvasStateService);
  private objectCreationService = inject(ObjectCreationService);

  initializeCanvas() {
    return this.canvasStateService.initializeCanvas();
  }

  getCanvas() {
    return this.canvasStateService.getCanvas();
  }

  addText(text: string, options: Partial<fabric.Textbox> = {}) {
    const textObject = new fabric.Textbox(text, {
      ...options,
      lockScalingX: false,
      lockScalingY: false,
      lockUniScaling: true,
    });
    textObject.setControlsVisibility({
      mt: false,
      mb: false,
    });
    textObject.set({
      width: textObject.calcTextWidth() + 10,
    });

    this.canvasStateService.addElement(textObject);
  }

  addRectangle(options: Partial<fabric.Rect> = {}) {
    const rectangle = this.objectCreationService.createRectangle(options);
    this.canvasStateService.addElement(rectangle);
  }

  addCircle(options: Partial<fabric.Circle> = {}) {
    const circle = this.objectCreationService.createCircle(options);
    this.canvasStateService.addElement(circle);
  }

  undo() {
    this.canvasStateService.undo();
  }

  redo() {
    this.canvasStateService.redo();
  }

  setSelectedObjects(objects: fabric.Object[]) {
    this.canvasStateService.setSelectedObjects(objects);
  }

  get getSelectedObjects() {
    return this.canvasStateService.getState().selectedObjects;
  }
}
