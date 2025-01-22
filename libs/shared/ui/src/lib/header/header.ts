import { Component } from '@angular/core';

@Component({
  selector: 'shared-header',
  imports: [],
  styles: [
    'nav { background-image: linear-gradient(90deg, rgb(0, 196, 204), rgb(125, 42, 232)); height: 57px; }',
  ],
  template: `<nav class="p-0 rounded-t-md"></nav> `,
})
export class HeaderComponent {}
