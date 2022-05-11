import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CostsControlComponent } from './costs-сontrol/costs-control.component';
import { BlockComponent } from './costs-сontrol/block/block.component';

import { PlanService } from './services/planElements.service';
import { FormsModule } from '@angular/forms';
import { CostComponent } from './costs-сontrol/cost/cost.component';
import { ConstructorComponent } from './constructor/constructor.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { MyAppComponent } from './my-app/my-app.component';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: CostsControlComponent },
    { path: 'constructor', component: ConstructorComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth', component: AuthComponent },
    { path: '**', component: AuthComponent },
];

@NgModule({
    declarations: [
        MyAppComponent,
        CostsControlComponent,
        BlockComponent,
        CostComponent,
        ConstructorComponent,
        RegisterComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [MyAppComponent],
    providers: [PlanService]
})
export class AppModule {
}
