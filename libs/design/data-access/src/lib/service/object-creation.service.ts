import { Injectable } from '@angular/core';
import * as fabric from 'fabric';

@Injectable({
  providedIn: 'root',
})
export class ObjectCreationService {
  createText(
    text: string,
    options: Partial<fabric.Textbox> = {}
  ): fabric.Textbox {
    return new fabric.Textbox(text, { ...options });
  }

  createRectangle(options: Partial<fabric.Rect> = {}): fabric.Rect {
    return new fabric.Rect(options);
  }

  createCircle(options: Partial<fabric.Circle> = {}): fabric.Circle {
    return new fabric.Circle(options);
  }
}
