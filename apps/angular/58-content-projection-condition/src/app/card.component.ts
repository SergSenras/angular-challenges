import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-card',
  template: `
    @if (small()) {
      <ng-container [ngTemplateOutlet]="title()" />
      <ng-container [ngTemplateOutlet]="message()" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="title()" />
        </div>
        <ng-container [ngTemplateOutlet]="message()" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);
  title = contentChild.required<TemplateRef<any>>('title');
  message = contentChild.required<TemplateRef<any>>('message');
}
