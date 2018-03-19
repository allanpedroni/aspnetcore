
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'Z1pbdTCkXYGCMB1Mve5l0vzd2tLiVUhG',
    domain: 'allanpedroni.auth0.com',
    responseType: 'token id_token',
    audience: 'https://allanpedroni.auth0.com/userinfo',
    redirectUri: 'http://localhost:51633/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}