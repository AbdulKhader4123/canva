import { computed, Injectable, signal } from '@angular/core';
import * as fabric from 'fabric';

interface CanvasState {
  elements: fabric.Object[];
  timestamp: number;
}

interface State {
  stateStack: CanvasState[];
  redoStack: CanvasState[];
  selectedObjects: fabric.Object[];
}

@Injectable({
  providedIn: 'root',
})
export class CanvasStateService {
  private canvas!: fabric.Canvas;
  private state = signal<State>({
    stateStack: [],
    redoStack: [],
    selectedObjects: [],
  });

  getCanvas() {
    return this.canvas;
  }

  get getState() {
    return this.state;
  }

  initializeCanvas() {
    const canvas = new fabric.Canvas('fabricSurface', {
      backgroundColor: '#ebebef',
      preserveObjectStacking: true,
    });
    this.canvas = canvas;
    this.saveState();
    return canvas;
  }

  addElement(element: fabric.Object) {
    this.canvas.add(element);
    this.canvas.centerObject(element);
    element.set({
      initialScaleX: element.scaleX,
      initialScaleY: element.scaleY,
      initialLeft: element.left,
      initialTop: element.top,
    });

    this.saveState();
  }

  removeElement(element: fabric.Object) {
    this.canvas.remove(element);
    this.saveState();
  }

  saveState() {
    const elements: any = this.canvas.getObjects();
    const timestamp = Date.now();
    this.state.update(({ stateStack, ...rest }) => ({
      ...rest,
      stateStack: [...stateStack, { elements, timestamp }],
      redoStack: [],
    }));
  }

  undo() {
    this.state.update(({ stateStack, redoStack, ...rest }) => {
      if (stateStack.length <= 1) return { stateStack, redoStack, ...rest };

      const currentState = stateStack.at(-1);
      const updatedStateStack = stateStack.slice(0, -1);

      return currentState
        ? {
            ...rest,
            stateStack: updatedStateStack,
            redoStack: [...redoStack, currentState],
          }
        : { stateStack, redoStack, ...rest };
    });

    // Restore the previous state AFTER the update to ensure reactivity
    const previousState = this.state().stateStack.at(-1);
    if (previousState) this.restoreState(previousState);
  }

  redo() {
    this.state.update(({ redoStack, stateStack, ...rest }) => {
      if (redoStack.length === 0) return { redoStack, stateStack, ...rest };

      const nextState = redoStack.at(-1);

      return nextState
        ? {
            ...rest,
            redoStack: redoStack.slice(0, -1),
            stateStack: [...stateStack, nextState],
          }
        : { redoStack, stateStack, ...rest };
    });

    // Restore the latest state AFTER the update to ensure reactivity
    const nextState = this.state().stateStack.at(-1);
    if (nextState) this.restoreState(nextState);
  }

  private restoreState(state: CanvasState) {
    this.canvas.remove(...this.canvas.getObjects());

    state.elements.forEach((element) => {
      this.canvas.add(element);
    });
    this.canvas.renderAll();
  }

  setSelectedObjects(objects: fabric.Object[]) {
    this.state.update((rest) => ({
      ...rest,
      selectedObjects: [...objects],
    }));
  }
}
