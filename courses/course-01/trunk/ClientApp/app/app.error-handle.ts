import { Inject } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

    //tell the angular to inject an instance of ToastyService using @Inject(ToastyService)
    constructor(@Inject(ToastyService) private toastyService: ToastyService) { }

    // handleError(error: any): void {
    //     this.toastyService.error({
    //             title: 'Error happens',
    //             msg: 'vehicleService.create.',
    //             showClose: true,
    //             timeout: 1000,
    //             theme: 'bootstrap'
    //     });
    // }

    handleError(error: any): void {
        //console.log(window);
        //if (typeof(window) !== 'undefined') {
            //NOT WORKING AS EXPECTED. WHEN I CLICK TO SAVE BUTTON
            this.toastyService.error({
                title: 'Error',
                msg: 'An unexpected error happened',
                theme: 'bootstrap',
                showClose: true,
                timeout: 1000
            });
            console.log(this.toastyService);
        //}
    }

}