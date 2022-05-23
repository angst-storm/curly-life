import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './root.component';
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';

import { PlanService } from './services/planElements.service';
import { UserService } from './services/user.service';
import { ServerService } from './services/server.service';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then((m: any) => m.UserModule)
            },
            {
                path: 'control',
                loadChildren: () => import('./costs-control/costs-control.module').then((m: any) => m.CostsControlModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'constructor',
                loadChildren: () => import('./constructor/constructor.module').then((m: any) => m.ConstructorModule),
                canActivate: [AuthGuard]
            },
            {
                path: '**',
                redirectTo: '/control',
                pathMatch: 'full'
            }
        ]
    },
];

@NgModule({
    declarations: [
        RootComponent,
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        UserService,
        ServerService,
        PlanService,
        AuthGuard
    ],
    bootstrap: [RootComponent]
})
export class AppModule {
}
