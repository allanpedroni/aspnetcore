import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
  url = 'https://code-udemy.firebaseio.com/data.json';

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    return this.http.post(this.url, servers);
  }
}
