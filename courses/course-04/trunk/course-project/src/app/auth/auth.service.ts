import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import * as firabase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router,
    private store: Store<fromApp.AppState>) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (value: firebase.auth.UserCredential) => {
          console.log('then signupUser', value);
          this.store.dispatch(new AuthActions.Signup());
          firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.store.dispatch(new AuthActions.SetToken(token));
            }
          );
        }
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
              this.store.dispatch(new AuthActions.SetToken(token));
            }
          );
        console.log('signinUser', response);
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigate(['/']);
      })
      .catch(error => console.log('erro signinUser', error));
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
