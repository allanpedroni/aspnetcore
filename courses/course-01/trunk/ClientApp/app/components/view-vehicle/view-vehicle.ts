import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service.ts';
import { Vehicle } from './../../model/vehicle';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../../services/vehicle.service';
import { BrowserXhr } from '@angular/common/http/src/xhr';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.html',
  providers: [
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    ProgressService
  ]
})
export class ViewVehicleComponent implements OnInit {

  @ViewChild('fileInputField') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number = 0;
  photos: any[];
  progress: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'] || 0;
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {

    this.photoService.getPhotos(this.vehicleId)
      .subscribe((p : any) => this.photos = p);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    this.progressService.startTracking()
      .subscribe(p => {
        this.zone.run(() => {
          this.progress = p;
        });
      },
    null,
    () => {
      this.progress = null;
    });

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';
    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      },
    err => {
      this.toasty.error({
        title: 'Error',
        msg: err.text(),
        theme: 'bootstrap',
        showClose: true,
        timeout: 2000
      });
    });
  }
}