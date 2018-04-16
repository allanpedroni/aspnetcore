import { Component, DoCheck } from '@angular/core';
import { Map, List } from 'immutable';

class ChangeDetector {
  private _oldState;
  constructor(input) {
    this._oldState = input;
  }

  isStateChanged(input) {
    return (this._oldState !== input);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  movies = [
    Map({ title: 'm1', genre: 1 }),
    Map({ title: 'm2' }),
    Map({ title: 'm3' })
  ];

  constructor() {
  }

  ngDoCheck() {
    console.log('appcomponent-docheck');
  }

  click() {
    let movie = this.movies[0];
    console.log('ms', this.movies);
    console.log('m', movie);
    this.movies[0] = movie.set('title', 'UPDATED');
  }
}
