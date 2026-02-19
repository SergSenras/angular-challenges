import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    <app-card>
      <ng-template #title>
        <div>Card 1</div>
      </ng-template>
      <ng-template #message>
        <div>Message 1</div>
      </ng-template>
    </app-card>
    <app-card [small]="true">
      <ng-template #title>
        <div>Card 2</div>
      </ng-template>
      <ng-template #message>
        <div>Message 2</div>
      </ng-template>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
