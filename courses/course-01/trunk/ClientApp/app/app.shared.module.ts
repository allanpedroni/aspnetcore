import { AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthService } from './services/auth.service';
//import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { PhotoService } from './services/photo.service.ts';
import { PaginationComponent } from './components/shared/pagination.component';
//import * as Raven from 'raven-js';
import { AppErrorHandler } from './app.error-handle';
import { ToastyModule } from 'ng2-toasty';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { BrowserXhr } from '@angular/http';

import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { AdminComponent } from './components/admin/admin';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthAdminGuardService as AuthAdminGuard } from './auth/auth-admin-guard.service';
import { ProfileComponent } from './components/profile/profile';

// Raven
//     .config('https://f3a1107f47b9453aa2de4ff5889f1cb6@sentry.io/300506')
//     .install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        AdminComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/:id', component: ViewVehicleComponent, canActivate: [AuthGuard] },
            { path: 'vehicles', component: VehicleListComponent, canActivate: [AuthGuard] },
            { path: 'user', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'home', component: HomeComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard] },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])        
    ],
    providers: [
        //wherever it needs create ErrorHandler it will create custom AppErrorHandler
        { provide: ErrorHandler, useClass: AppErrorHandler },  
        //{ provide: BrowserXhr, useClass: BrowserXhrWithProgress },  //moved into providers component view-vehicle.ts
        { provide: AuthHttp, useClass: HttpClient}, //version of angular2-jwt 0.2.3 doesnt support angular 5
        AuthService,
        AuthGuard,
        //AUTH_PROVIDERS, //version of angular2-jwt 0.2.3 doesnt support angular 5
        AuthAdminGuard,
        VehicleService,
        PhotoService,
        //ProgressService,
    ],
    exports: [ToastyModule],
    
})
export class AppModuleShared {
}
