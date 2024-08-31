import { Component, Input } from '@angular/core';

@Component({
  selector: 'button',
  template: ` <div>{{ buttonText }}</div> `,
})
export class ButtonComponent {
  @Input() buttonText!: string;
}
