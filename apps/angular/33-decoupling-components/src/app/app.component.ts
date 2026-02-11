import {
  BtnDisabledDirective,
  ButtonState,
} from '@angular-challenges/decoupling/brain';
import { BtnHelmetDirective } from '@angular-challenges/decoupling/helmet';
import { Component, signal } from '@angular/core';

@Component({
  imports: [BtnDisabledDirective, BtnHelmetDirective],
  selector: 'app-root',
  template: `
    <button
      btnDisabled
      hlm
      (stateChanged)="onStateChange($event)"
      [btnState]="btnState()">
      Coucou
    </button>
  `,
})
export class AppComponent {
  public btnState = signal<ButtonState>('enabled');

  onStateChange(newState: ButtonState) {
    this.btnState.set(newState);
  }
}
