import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
   makes: any[] = [];   
   models: any[] = [];
   features: any[] = [];
   vehicle: any ={
    features: [],
    contact: {}
   };

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(m => {
      this.makes = m;  }); //console.log('todos makes do banco', this.makes);
    
    this.vehicleService.getFeatures().subscribe(m => {
      this.features = m; });//console.log('todos makes do banco', this.makes); 
  }

  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId); //console.log("this.vehicle.make", this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : []; //console.log("selectedMake", selectedMake);
    delete this.vehicle.modelId; //when changing make, delete the selected model option
  }
  onFeatureToggle(featureId: any, $event : any) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else{
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index,1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x),
        err => {
          if (err.status == 400){
            
          }
        });
  }
}
