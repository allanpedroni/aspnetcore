import * as Raven from 'raven-js';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

    constructor(
        
        @Inject(NgZone) private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService,
        @Inject(ToastyConfig) private toastyConfig: ToastyConfig) {
            //default options
            this.toastyConfig.theme = 'bootstrap';
            this.toastyConfig.position = 'top-right';
            this.toastyConfig.timeout = 3000;
            this.toastyConfig.showClose = true;
    }

    handleError(error: any): void {

        Raven.captureException(error.originalError || error);

        //if (typeof(window) !== 'undefined') {

            this.ngZone.run(() => {
                //this.toastyService.clearAll();
                this.toastyService.error({
                    title: 'Error',
                    msg: 'An unexpected error happened. Lets see what happens: ' + (error.originalError || error)
                });
            })
        //}
    }
}