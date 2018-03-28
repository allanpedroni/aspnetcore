import { Component } from '@angular/core';
// import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cuisines = ['c1', 'c2', 'c2'];

  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {

    this.items = this.db.list('/cuisines').valueChanges();

    this.getCourses('/cuisines').subscribe(x => {
      this.cuisines = x;
    });
  }
  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
}
