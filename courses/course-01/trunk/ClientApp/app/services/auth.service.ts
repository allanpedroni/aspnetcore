
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import * as auth0 from 'auth0-js';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { of } from 'rxjs/observable/of';
import { map, filter, tap, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer'

@Injectable()
export class AuthService {

  requestedScopes: any;
  user_realname: any;
  user_nickname: any;
  refreshSub: any;
  userProfile: any;
  private roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: 'Z1pbdTCkXYGCMB1Mve5l0vzd2tLiVUhG',
    domain: 'allanpedroni.auth0.com',
    responseType: 'token id_token',
    audience: 'https://api.trunk.com',
    redirectUri: 'http://localhost:51633/home',
    scope: 'openid profile email'
  });

  constructor(public router: Router) { }

  public login() {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      //console.log('handleAuthentication: ', authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.readRolesFromSession();
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log('ERROR:> handleAuthentication', err);
      }
    });
  }

  public isInRole(role: any): boolean {
    return this.roles.indexOf(role) > -1;
  }

  private setSession(authResult: any): void {
    //TODO: console.log it
    //this.user_nickname = decodeToken['https://trunk.com/user/nickname'];
    //this.user_realname = decodeToken['https://trunk.com/user/real_name'];

    const scopes = authResult.scope || this.requestedScopes || '';

    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));

    this.scheduleRenewal();
  }

  private readRolesFromSession() {
    var helper = new JwtHelper();
    var decodeToken = helper.decodeToken(localStorage.getItem('id_token'));
    this.roles = decodeToken['https://trunk.com/roles'];
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.unscheduleRenewal();

    this.roles = [];
    this.userProfile = null;
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
        //console.log('The user profile: ', profile);
      }
      else
        console.log('There is something error with profile.');
      cb(err, profile);
    });
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const expiresIn$ = of(expiresAt)
      .pipe(
        mergeMap(
          (expiresAt: any) => {
            const now = Date.now();
            // Use timer to track delay until expiration
            // to run the refresh at the proper time
            return timer(Math.max(1, expiresAt - now));
          }
        )
      );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSub = expiresIn$.subscribe(
      () => {
        this.renewToken();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}