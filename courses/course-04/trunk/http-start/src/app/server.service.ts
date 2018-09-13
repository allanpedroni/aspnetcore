import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerService {
  url = 'https://code-udemy.firebaseio.com/data.json';

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({
        'Content-Type': 'application/json'
      });
    return this.http.put(this.url,
      servers,
      {headers: headers});
  }

  getServers() {
    return this.http.get(this.url).pipe(
    map(
      (response: Response) => response.json()));
  }
}
