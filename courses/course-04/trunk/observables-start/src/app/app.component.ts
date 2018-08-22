import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user1Activated = false;
  user2Activated = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.userActivated.subscribe(
      (id: number) => {
        this.user1Activated = (id === 1);
        this.user2Activated = !this.user1Activated;
      }
    );
  }
}
