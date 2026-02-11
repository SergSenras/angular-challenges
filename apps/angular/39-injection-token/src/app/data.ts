import { InjectionToken } from '@angular/core';

const DEFAULT_TIMER = 1000;

export const TIMER = new InjectionToken('timer token', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER,
});
