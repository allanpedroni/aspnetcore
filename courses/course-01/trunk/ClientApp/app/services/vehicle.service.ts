import { SaveVehicle } from '../model/vehicle';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles';

  private options: {} = {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
  };

  constructor(private http:HttpClient) { }

  getFeatures()
  {
    return this.http.get('/api/features', this.options)
      .map(res => res);
  }

  getMakes()
  {
    return this.http.get('/api/makes', this.options)
      .map(res => res);
  }

  create(vehicle : any) {
    return this.http.post(this.vehiclesEndpoint, vehicle, this.options)
      .map(res => res);
  }

  getVehicle(id : any) {
    return this.http.get(this.vehiclesEndpoint + '/' + id, this.options)
      .map(res => res);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle, this.options)
      .map(res => res);
  }

  delete(id: any) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id, this.options)
      .map(res => res);
  }

  getVehicles(filter: any) {
    return this.http.get(this.vehiclesEndpoint + this.toQueryString(filter), this.options)
      .map(res => res);
  }

  toQueryString(obj : any) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) 
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    if (parts.join('&').length > 0)
      return '?' + parts.join('&');
    return '';
  }
}
