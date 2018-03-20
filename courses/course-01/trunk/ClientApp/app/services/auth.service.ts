
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { filter } from 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { tokenNotExpired } from 'angular2-jwt';

import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  lock = new Auth0Lock('Z1pbdTCkXYGCMB1Mve5l0vzd2tLiVUhG', 'allanpedroni.auth0.com', {
    autoclose: true,
    auth: {
      redirect: true,
      redirectUrl: 'http://localhost:5000/',
      responseType: 'token id_token',
      audience: 'https://allanpedroni.auth0.com/userinfo',
      params: {
        scope: 'openid'
      }
    }
  });

  constructor(public router: Router) { 
    
    this.lock.on('authenticated', (authResult) => {
      this.setSession(authResult);
    });
  }

  public login(): void {
    this.lock.show();
  }

  // Call this method in app.component.ts
  // if using hash-based routing
  // public handleAuthenticationWithHash(): void {
  //   this
  //     .router
  //     .events
  //     .pipe(
  //       filter(event => event instanceof NavigationStart),
  //       filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
  //     )
  //     .subscribe(() => {
  //       this.lock.resumeAuth(window.location.hash, (err, authResult) => {
  //         if (err) {
  //           this.router.navigate(['/']);
  //           console.log(err);
  //           alert(`Error: ${err.error}. Check the console for further details.`);
  //           return;
  //         }
  //         this.setSession(authResult);
  //         this.router.navigate(['/']);
  //       });
  //   });
  // }

  private setSession(authResult: any): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    //const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    //return new Date().getTime() < expiresAt;
    return tokenNotExpired('token');
  }

}
//   constructor(public router: Router) {}

//   public login() {
//     //this.auth0.authorize();

//   }

//   public handleAuthentication() {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         window.location.hash = '';
//         this.setSession(authResult);
//         this.router.navigate(['/home']);
//       } else if (err) {
//         this.router.navigate(['/home']);
//         console.log('Error>>' + err);
//       }
//     });
//   }

//   private setSession(authResult: any) {
//     // Set the time that the Access Token will expire at
//     const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//   }

//   public logout(): void {
//     // Remove tokens and expiry time from localStorage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('expires_at');
//     // Go back to the home route
//     this.router.navigate(['/']);
//   }

//   public isAuthenticated() {
//     // Check whether the current time is past the
//     // Access Token's expiry time
//     const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//     return new Date().getTime() < expiresAt;
//   }

// }