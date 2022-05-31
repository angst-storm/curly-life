import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChoosePlanComponent } from './choose-plan.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: '', component: ChoosePlanComponent },
];

@NgModule({
    declarations: [
        ChoosePlanComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class ChoosePlanModule {
}
