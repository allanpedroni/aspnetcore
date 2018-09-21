import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import * as firabase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (value: firebase.auth.UserCredential) => console.log('then signupUser', value)
      )
      .catch(
        error => console.log('erro signupUser', error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
            }
          );
          console.log('signinUser', response);
          this.router.navigate(['/']);
      })
      .catch(error => console.log('erro signinUser', error));
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}