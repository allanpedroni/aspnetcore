import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]', attribute <div app-servers></div>
  // selector: '.app-servers', class <div class="app-servers"></div>
  selector: 'app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

}
