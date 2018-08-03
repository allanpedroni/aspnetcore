import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // replacing this
    // const id = +this.route.snapshot.paramMap['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );

    // by the resolver
    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server']; // this name 'server' used in app-routing.module -> resolve: {server: ServerResolver}
        }
      );
  }

  onEdit() {
    this.router.navigate(['edit', {relativeTo: this.route, queryParamsHandling: 'preserve'} ]);
    // preserve = preseve the rest of string inherit and use it
  }
}
