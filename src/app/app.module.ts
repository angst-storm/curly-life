import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './root.component';
import { AppComponent } from './app.component';

import { AuthGuard } from './guards/auth.guard';

import { PlanService } from './services/planElements.service';
import { UserService } from './services/user.service';
import { ServerService } from './services/server.service';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user-module/user.module';
import { CostsControlModule } from './costs-control-module/costs-control.module';
import { ConstructorModule } from './constructor-module/constructor.module';
import { ChoosePlanModule } from './choose-plan-module/choose-plan.module';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'user',
                loadChildren: (): Promise<UserModule> => import('./user-module/user.module')
                    .then((m: any) => m.UserModule)
            },
            {
                path: 'choose',
                loadChildren: (): Promise<ChoosePlanModule> => import('./choose-plan-module/choose-plan.module')
                    .then((m: any) => m.ChoosePlanModule),
                canActivate: [AuthGuard]

            },
            {
                path: 'control',
                loadChildren: (): Promise<CostsControlModule> => import('./costs-control-module/costs-control.module')
                    .then((m: any) => m.CostsControlModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'constructor',
                loadChildren: (): Promise<ConstructorModule> => import('./constructor-module/constructor.module')
                    .then((m: any) => m.ConstructorModule),
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
        HttpClientModule,
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
