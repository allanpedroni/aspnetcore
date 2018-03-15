import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operator/map';

@Injectable()
export class PhotoService {

    constructor(private http:Http) { }


    upload(vehicleId: any, photoFile: File) {
        var formData = new FormData();
        formData.append('file', photoFile);

        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData)
            .map(res => res.json());
    }

    getPhotos(vehicleId : any) {
        return this.http.get(`/api/vehicles/${vehicleId}/photos`, vehicleId)
            .map(res => res.json());
    }
}