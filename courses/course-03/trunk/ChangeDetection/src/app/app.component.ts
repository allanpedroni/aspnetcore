import { Component, DoCheck } from '@angular/core';

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
    { title: 'm1' },
    { title: 'm2' },
    { title: 'm3' }
  ];

  constructor() {

  }

  ngDoCheck() {
    console.log('appcomponent-docheck');
  }

  click() {
    this.movies[0].title = 'update';
  }
}
