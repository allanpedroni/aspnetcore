
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { tokenNotExpired } from 'angular2-jwt';

import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

//   lock = new Auth0Lock('Z1pbdTCkXYGCMB1Mve5l0vzd2tLiVUhG', 'allanpedroni.auth0.com', {});
//   //   autoclose: true,
//   //   auth: {
//   //     redirect: true,
//   //     redirectUrl: 'http://localhost:5000/',
//   //     responseType: 'token id_token',
//   //     audience: 'https://allanpedroni.auth0.com/userinfo',
//   //     params: {
//   //       scope: 'openid'
//   //     }
//   //   }
//   // });

//   constructor(public router: Router) { 
    
//     this.lock.on('authenticated', (authResult) => {
//       console.log('authResult: ', authResult)
//       this.setSession(authResult);
//     });
//   }

//   public login(): void {
//     this.lock.show();
//   }

//   // Call this method in app.component.ts
//   // if using hash-based routing
//   // public handleAuthenticationWithHash(): void {
//   //   this
//   //     .router
//   //     .events
//   //     .pipe(
//   //       filter(event => event instanceof NavigationStart),
//   //       filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
//   //     )
//   //     .subscribe(() => {
//   //       this.lock.resumeAuth(window.location.hash, (err, authResult) => {
//   //         if (err) {
//   //           this.router.navigate(['/']);
//   //           console.log(err);
//   //           alert(`Error: ${err.error}. Check the console for further details.`);
//   //           return;
//   //         }
//   //         this.setSession(authResult);
//   //         this.router.navigate(['/']);
//   //       });
//   //   });
//   // }

//   private setSession(authResult: any): void {
//     // Set the time that the access token will expire at
//     const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//   }

//   public logout(): void {
//     // Remove tokens and expiry time from localStorage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('token');
//     localStorage.removeItem('expires_at');
//     // Go back to the home route
//     this.router.navigate(['/']);
//   }

//   public isAuthenticated(): boolean {
//     // Check whether the current time is past the
//     // access token's expiry time
//     //const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//     //return new Date().getTime() < expiresAt;
//     return tokenNotExpired('token');
//   }

// }

  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'Z1pbdTCkXYGCMB1Mve5l0vzd2tLiVUhG',
    domain: 'allanpedroni.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api.trunk.com',
    redirectUri: 'http://localhost:5000/user',
    scope: 'openid profile email'
  });

  constructor(public router: Router) {}

  public login() {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log('entrou handleAuthentication:', authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/user']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log('handleAuthentication:',err);
      }
    });
  }

  private setSession(authResult : any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb: any): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        console.log('The user profile: ', profile);
      }
      else
        console.log('There is something error with profile.');
      cb(err, profile);
    });
  }
}