import { ServerResolver } from './servers/server/server-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from './servers/edit-server/cam-deactivate-guard.service';
import { AuthService } from './auth-service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: 'users/:id/:name', component: UserComponent },
    ] },
    { path: 'servers', canActivateChild: [AuthService], component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
    ] },
    // { path: 'not-found', component: PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!'}},
    { path: '**', redirectTo: '/not-found' }, // redirecting , wildcard = **. this must be in the last line
    // { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
      ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
