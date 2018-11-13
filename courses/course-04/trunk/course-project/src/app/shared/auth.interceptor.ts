import { Store } from '@ngrx/store';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor working fine!', req);
    return this.store.select('auth')
      .pipe(
        take(1),
        switchMap(
          (authState: fromAuth.State) => {
            console.log('authState.token', authState.token);
            const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
            return next.handle(copiedReq);
          }));
  }
}
