import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { PlanService } from './services/planElements.service';
import { CostsControlComponent } from './costs-сontrol/costs-control.component';
import { ConstructorComponent } from './constructor/constructor.component';
import { BlockComponent } from './costs-сontrol/block/block.component';
import { CostComponent } from './costs-сontrol/cost/cost.component';
import { RootComponent } from './root.component';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { ServerService } from './services/server.service';
import { UserComponent } from './user/user.component';

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
                loadChildren: () => import('./costs-сontrol/costs-control.module').then((m: any) => m.CostsControlModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'constructor',
                loadChildren: () => import('./constructor/constructor.module').then((m: any) => m.ConstructorModule),
                canActivate: [AuthGuard]
            },
            {
                path: '**',
                redirectTo: '/user/auth',
                pathMatch: 'full'
            }
        ]
    },
];

@NgModule({
    declarations: [
        RootComponent,
        AppComponent,
        UserComponent,
        CostsControlComponent,
        ConstructorComponent,
        BlockComponent,
        CostComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
