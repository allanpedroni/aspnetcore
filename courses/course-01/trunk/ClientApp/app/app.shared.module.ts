import { AuthService } from './services/auth.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { PhotoService } from './services/photo.service.ts';
import { PaginationComponent } from './components/shared/pagination.component';
//import * as Raven from 'raven-js';
import { AppErrorHandler } from './app.error-handle';
import { ToastyModule } from 'ng2-toasty';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';

import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { UserComponent } from './components/user/user.component'

// Raven
//     .config('https://f3a1107f47b9453aa2de4ff5889f1cb6@sentry.io/300506')
//     .install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'user', component: UserComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])        
    ],
    providers: [
        //wherever it needs create ErrorHandler it will create custom AppErrorHandler
        { provide: ErrorHandler, useClass: AppErrorHandler },  
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },  
        AuthService,
        VehicleService,
        PhotoService,
        ProgressService
    ],
    exports: [ToastyModule],
    
})
export class AppModuleShared {
}
