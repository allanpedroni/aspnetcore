import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `
  <p [@myAwesomeAnimation]='state' (click)="animateMe()">I will animate</p>
  `,
  styles: [`
  p {
    width:200px;
    background:lightgray;
    margin: 100px auto;
    text-align:center;
    padding:20px;
    font-size:1.5em;
  }
  `],
  animations: [
    trigger('myAwesomeAnimation', [
        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.2)',
        })),
        transition('small <=> large', animate('1000ms ease-in', keyframes([
          style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-55%)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-35%)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-25%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))),
    ]),
  ]
})
export class AppComponent {
  myData: Array<any>;
  answer = '';
  answerDisplay = '';
  showSpinner = false;
  state = 'small';

  animateMe() {
        this.state = (this.state === 'small' ? 'large' : 'small');
  }

  constructor(private http: HttpClient) {

    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .subscribe((res: any) => this.myData = res);

  }

  showAnswer() {
    this.showSpinner = true;

    setTimeout(() => {
      this.answerDisplay = this.answer;
      this.showSpinner = false;
    }, 2000);
  }
}

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
