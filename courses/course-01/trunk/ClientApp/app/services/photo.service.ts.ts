import { Injectable } from '@angular/core';
import { map } from 'rxjs/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoService {

    constructor(private http:HttpClient) { }

    upload(vehicleId: any, photoFile: File) {
        var formData = new FormData();
        formData.append('file', photoFile);

        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData)
            .map(res => res);
    }

    getPhotos(vehicleId : any) {
        return this.http.get(`/api/vehicles/${vehicleId}/photos`, vehicleId)
            .map(res => res);
    }
}