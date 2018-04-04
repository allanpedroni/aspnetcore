import { Component, OnInit, OnDestroy, state } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  cuisines: Observable<any[]>;
  cusineFireList: AngularFireList<any[]>;
  restaurants: Observable<{}>;
  restaurantFireList: AngularFireObject<{}>;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.cuisines = this.filterNodes('/cuisines',
      req => req.orderByValue().equalTo('Italian'));

    this.restaurants = this.filterNodes('/restaurants',
      req => req.orderByChild('rating').equalTo(5).limitToFirst(5))
      .map(m => {
        m.map(restaurant => {
          restaurant.cuisineType = this.filterNode('/cuisines/' + restaurant.cuisine);
          restaurant.featureTypes = [];

          for (const f in restaurant.features) {
            if (f)
              restaurant.featureTypes.push(this.filterNode('/features/' + f));
          }
        });

        console.log(m);
        return m;
      });

    // this.cuisines.subscribe(s => console.log('cuisines', s));
    // this.restaurants.subscribe(s => console.log('cuisines', s));
  }

  filterNodes(listPath, filter?: QueryFn): Observable<any[]> {
    // this.cusineFireList = this.db.list(listPath);
    // return this.cusineFireList.valueChanges();
    return this.db.list(listPath, filter).valueChanges();
  }

  filterNode(node): Observable<any[]> {
    // this.restaurantFireList = this.db.object(node);
    // return this.restaurantFireList.valueChanges();
    return this.db.object(node).valueChanges();
  }

  add() {
    this.cusineFireList.push(['asian']);

    this.writeNewPost(3, 'allan.barros', 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
      'first post', 'this is the body of new post');
    // this.toggleStar(firebase.database().ref('/posts/1'), 1);
  }

  update() {
    // update the node
    this.restaurantFireList.update(
      { 1: { address: { city: 'belo horizonte UPDATED' }, 'cuisine': 'brazilian', 'name': 'new name', 'rating': 5 } }
    );

    // replace the node values
    this.restaurantFireList.set(
      { 1: { address: { city: 'belo horizonte REPLACED' }, 'cuisine': 'brazilian', 'name': 'new name', 'rating': 5 } }
    );
    // firebase.database().ref('restaurant').set({
    //   username: 'teste',
    //   email: 'allan@gmail.com',
    //   profile_picture : 'i dont know'
    // });
  }

  delete() {
    this.restaurantFireList.remove();
  }

  login() {

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'pt';
    provider.setCustomParameters({
      'login_hint': 'allan.barros@gmail.com'
    });

    // firebase.auth().signInWithPopup(provider);

    this.afAuth.auth.signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log('token', result.credential.accessToken);
      // The signed-in user info.
      console.log('user', result.user);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      console.log('errorCode', error.code);
      console.log('errorMessage', error.message);
      // The email of the user's account used.
      console.log('email', error.email);
      // The firebase.auth.AuthCredential type that was used.
      console.log('credential', error.credential);
      // ...
    });
  }
  logout() {
    this.afAuth.auth.signOut();
    // firebase.auth().signOut();
  }

  writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    const postData = {
      author: username,
      uid: uid,
      body: body,
      title: title,
      starCount: 0,
      authorPic: picture
    };

    // Get a key for a new Post.
    const newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
  }


  // toggleStar(postRef, uid) {
  //   postRef.transaction(function(post) {
  //     if (post) {
  //       if (post.stars && post.stars[uid]) {
  //         post.starCount--;
  //         post.stars[uid] = null;
  //       } else {
  //         post.starCount++;
  //         if (!post.stars) {
  //           post.stars = {};
  //         }
  //         post.stars[uid] = true;
  //       }
  //     }
  //     return post;
  //   });
  // }
}
