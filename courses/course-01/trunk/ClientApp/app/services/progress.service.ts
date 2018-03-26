import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ProgressService {
    private uploadProgress: Subject<any> = new Subject();
    //downloadProgress: Subject<any> = new Subject();

    startTracking() {
        this.uploadProgress = new Subject();
        return this.uploadProgress;
    }

    notify(progress: any) {
        if (this.uploadProgress)
            this.uploadProgress.next(progress);
    }

    endTracking() {
        if (this.uploadProgress)
            this.uploadProgress.complete();
    }
}

@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {
    constructor(private service: ProgressService) {
        super();
    }

    build(): XMLHttpRequest {

        var xhr: XMLHttpRequest = super.build(); //build method from parent class

        // xhr.onprogress = (event) => {
        //     this.service.downloadProgress.next(this.createProgress(event));
        // };

        xhr.upload.onprogress = (event) => {
            this.service.notify(this.createProgress(event));
        };

        xhr.upload.onloadend = () => {
            this.service.endTracking();
        };

        return xhr;
    }

    private createProgress(event: any) {
        return {
            total: event.total,
            percentage: Math.round(event.loaded / event.total * 100)
        };
    }
}