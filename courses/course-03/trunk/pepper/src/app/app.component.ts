import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // cuisines = ['c1', 'c2', 'c2'];

  cuisines: Observable<any[]>;
  cusineFireList: AngularFireList<any[]>;
  restaurant: Observable<any[]>;
  restaurantFireList: AngularFireObject<{}>;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.cuisines = this.filterNodes('/cuisines');

    this.restaurant = this.filterNode('/restaurant');
    // this.restaurant.subscribe(x => {
    //   console.log('restaurant', x);
    // });

    // this.cuisines.subscribe(x => {
    //   console.log('cuisines', x);
    // });
  }

  filterNodes(listPath): Observable<any[]> {

    this.cusineFireList = this.db.list(listPath);

    return this.cusineFireList.valueChanges();
  }

  filterNode(node): Observable<any[]> {

    this.restaurantFireList = this.db.object(node);

    return this.restaurantFireList.valueChanges();
  }

  add() {
    this.cusineFireList.push(['asian']);
  }

  update() {
    // update the node
    this.restaurantFireList.update(
      {address: {city: 'belo horizonte 11' }, 'cuisine': 'brazilian', 'name': 'new name', 'rating': 5 }
    );

    // replace the node values
    this.restaurantFireList.set(
      {address: {city: 'belo horizonte' }, 'cuisine': 'brazilian', 'name': 'new name', 'rating': 5 }
    );
  }

  delete() {
    this.restaurantFireList.remove();
  }
}
