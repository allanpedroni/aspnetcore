import { Component, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements DoCheck {
  @Input() movie; 

  ngDoCheck() { 
    console.log("MovieComponent-DoCheck");
  }
}
