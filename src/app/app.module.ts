import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MyAppComponent } from './my-app/my-app.component';
import { CostsControlComponent } from './costs-сontrol/costs-control.component';
import { ConstructorComponent } from './constructor/constructor.component';
import { BlockComponent } from './costs-сontrol/block/block.component';
import { CostComponent } from './costs-сontrol/cost/cost.component';

import { PlanService } from './services/planElements.service';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: CostsControlComponent },
    { path: 'constructor', component: ConstructorComponent },
    { path: 'user', loadChildren: () => import('./user/user.module').then((m : any) => m.UserModule) },
    { path: '**', redirectTo: 'user' },
];

@NgModule({
    declarations: [
        MyAppComponent,
        CostsControlComponent,
        ConstructorComponent,
        BlockComponent,
        CostComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [MyAppComponent],
    providers: [PlanService]
})
export class AppModule {
}
