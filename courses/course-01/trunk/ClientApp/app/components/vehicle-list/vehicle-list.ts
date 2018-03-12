import { Vehicle, KeyValuePair } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'vehicle-list.html',
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  queryResult: any = {};
  makes: KeyValuePair[] = [];
  query: any = {
    sortBy: '',
    pageSize: this.PAGE_SIZE,
    page: 1,
    isSortAscending: false
  };
  vehicles: Vehicle[] = [];
  
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { }
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(m => this.makes = m);

    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.vehicles = result);
  }

  onFilterChange() {
    this.query.page = 1; 
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy(columnName : any) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending; 
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }
}
