import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ServerService {
  url = 'https://code-udemy.firebaseio.com/data.json';

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({
        'Content-Type': 'application/json'
      });
    return this.http.post(this.url,
      servers,
      {headers: headers});
  }
}
