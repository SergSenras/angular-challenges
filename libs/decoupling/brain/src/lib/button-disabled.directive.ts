/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, output, signal, WritableSignal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

@Directive({
  selector: 'button[btnDisabled]',
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  readonly state: WritableSignal<ButtonState> = signal('enabled');
  stateChanged = output<ButtonState>();

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
    this.stateChanged.emit(this.state());
  }
}
