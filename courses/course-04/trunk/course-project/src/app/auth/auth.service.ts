import { Injectable } from '@angular/core';
// import * as firabase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
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
      .then(value => console.log('then signinUser', value))
      .catch(error => console.log('erro signinUser', error));
  }
}
