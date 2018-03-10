import { Vehicle, KeyValuePair } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'vehicle-list.html',
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  queryResult: any = {};
  makes: any[] = [];
  query: any = {
    pageSize: this.PAGE_SIZE,
    makeId: 0
  };
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(m => this.makes = m);

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles()
      .subscribe(v => this.vehicles = v);
  }

  onFilterChange() {
    this.query.page = 1; 
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      makeId: 0,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }
}
