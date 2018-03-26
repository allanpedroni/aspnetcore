import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastyService } from 'ng2-toasty';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class AuthAdminGuardService extends AuthGuardService {

  constructor(auth: AuthService, router: Router, toastyService: ToastyService) {
    super(auth, router, toastyService);
  }

  canActivate(): boolean {
    
    var isAuthenticated = super.canActivate();
    
    var authenticatedAndIsInTheAdminRole = false;

    if (isAuthenticated)
      authenticatedAndIsInTheAdminRole = this.auth.isInRole('admin');

    if (!authenticatedAndIsInTheAdminRole) {
      this.toastyService.error({
        title: 'Error',
        msg: 'You do not have this role.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });
    }

    return authenticatedAndIsInTheAdminRole;
  }
}