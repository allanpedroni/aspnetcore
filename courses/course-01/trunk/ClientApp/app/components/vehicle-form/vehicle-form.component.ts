import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
   makes: any[] = [];
   vehicle: any ={};
   models: any[] = [];
   features: any[] = [];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(m => {
      this.makes = m;  }); //console.log('todos makes do banco', this.makes);
    
    this.vehicleService.getFeatures().subscribe(m => {
      this.features = m; });//console.log('todos makes do banco', this.makes); 
  }

  onMakeChange(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make); //console.log("this.vehicle.make", this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : []; //console.log("selectedMake", selectedMake);
  }
}
