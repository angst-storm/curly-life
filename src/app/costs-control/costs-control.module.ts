import { NgModule } from '@angular/core';
import { CostsControlComponent } from './costs-control.component';
import { RouterModule, Routes } from '@angular/router';
import { CostComponent } from './cost/cost.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarComponent } from './bar/bar.component';
import { SharedModule } from '../shared/shared.module';
import { AddCostPanelComponent } from './add-cost-panel/add-cost-panel.component';

const routes: Routes = [
    { path: '', component: CostsControlComponent },
];

@NgModule({
    declarations: [
        CostsControlComponent,
        BarComponent,
        AddCostPanelComponent,
        CostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class CostsControlModule {
}
