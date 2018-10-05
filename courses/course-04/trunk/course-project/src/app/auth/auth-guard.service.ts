import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements OnInit, CanActivate {

  constructor(private store: Store<fromApp.AppState>,
    private router: Router) { }

  ngOnInit(): void {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard working fine!');
    return this.store.select('auth')
      .pipe(map((authState: fromAuth.State) => {
        if (!authState.authenticated) {
          this.router.navigate(['/signin'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
        return true;
      }));
  }
}
