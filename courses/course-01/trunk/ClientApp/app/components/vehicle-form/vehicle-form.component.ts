import { FeatureService } from './../../services/feature.service';
import { MakeService } from './../../services/make.service';
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

  constructor(
    private makeService: MakeService,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe(m => {
      this.makes = m; 
      //console.log('todos makes do banco', this.makes);
    });
    
    this.featureService.getFeatures().subscribe(m => {
      this.features = m; 
      //console.log('todos makes do banco', this.makes);
    });

  }

  onMakeChange(){
    //console.log("this.vehicle.make", this.vehicle.make);
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    //console.log("selectedMake", selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
