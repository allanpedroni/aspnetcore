import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
