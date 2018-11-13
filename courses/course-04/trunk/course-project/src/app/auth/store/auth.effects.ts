import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup;

  constructor(private actions$: Actions) {
  }
}
