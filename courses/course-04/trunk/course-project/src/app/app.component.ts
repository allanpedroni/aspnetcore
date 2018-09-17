import { Component, OnInit } from '@angular/core';
import * as firabase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit(): void {
    firabase.initializeApp({
      apiKey: '',
      authDomain: '',
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
