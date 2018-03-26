import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    protected auth: AuthService, 
    protected router: Router,
    protected toastyService: ToastyService) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/home']);

      this.toastyService.warning({
        title: 'Success', 
        msg: 'You need to logon first...',
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });

      return false;
    }
    return true;
  }

}