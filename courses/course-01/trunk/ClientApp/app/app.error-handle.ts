//import * as Raven from 'raven-js';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

    constructor(
        @Inject(NgZone) private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService) { }

    handleError(error: any): void {

        if (typeof (window) !== 'undefined') {
            this.ngZone.run(() => {
                this.toastyService.error({
                    title: 'Error',
                    msg: 'An unexpected error happened. Check the console log.',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 2000
                });
            });

            console.log('App Handler Error > ' + (error.originalError || error));
        }
        else
            console.log('there is no window object...');

        //console.log('dev:' + isDevMode());

        // if (!isDevMode())
        //     Raven.captureException(error.originalError || error);
        // else
        //     throw error;

    }
}