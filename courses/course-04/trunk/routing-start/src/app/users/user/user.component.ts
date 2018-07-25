import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // localhost:4200/users/1/allan
    this.user = {
      id: +this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
  }
}
