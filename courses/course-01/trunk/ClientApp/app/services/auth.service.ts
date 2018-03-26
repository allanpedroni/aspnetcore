
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import * as auth0 from 'auth0-js';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

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

  constructor(public router: Router) {}

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
        console.log('ERROR:> handleAuthentication',err);
      }
    });
  }

  public isInRole(role: any) : boolean {
    return this.roles.indexOf(role) > -1;
  }

  private setSession(authResult : any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
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
}