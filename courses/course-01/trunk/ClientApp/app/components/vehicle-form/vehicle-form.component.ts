import * as _ from 'underscore'; 
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { SaveVehicle, Vehicle } from '../../model/vehicle';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
   makes: any[] = [];   
   models: any[] = [];
   features: any[] = [];
   vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) { 

      route.params.subscribe(p => {
          this.vehicle.id = +p['id'] || 0; //+ = convert to a number
      });
    }

  ngOnInit() {

    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    else
      this.vehicle.id = 0;

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      
      if (this.vehicle.id){
        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = [];
    this.vehicle.features = _.pluck(v.features, 'id');
  } 

  onMakeChange() {
    this.populateModels(); //console.log("selectedMake", selectedMake);
    delete this.vehicle.modelId; //when changing make, delete the selected model option
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId); //console.log("this.vehicle.make", this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
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
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
    result$.subscribe(vehicle => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'The vehicle data was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/vehicles/', vehicle.id])
    });
  }

  // delete() {
  //   if (confirm("Are you sure?")) {
  //     this.vehicleService.delete(this.vehicle.id)
  //       .subscribe(x => {
  //         this.router.navigate(['/home']);
  //       });
  //   }
  // }

  // navigateBack() {
  //   this.router.navigate(['/vehicles']);
  // }
}
