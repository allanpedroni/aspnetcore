import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // localhost:4200/users/1/allan
    // this.user = {
    //   id: +this.route.snapshot.params['id'],
    //   name: this.route.snapshot.params['name']
    // };
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = +params['id'];
          this.user.name = params['name'];
        },
        (error: any) => {},
        () => {}
      );
  }

  ngOnDestroy(): void {
    // angular do this by automatically
    this.paramsSubscription.unsubscribe();
  }
}
