import { NgModule } from '@angular/core';
import { CostsControlComponent } from './costs-control.component';
import { RouterModule, Routes } from '@angular/router';
import { BlockComponent } from './block/block.component';
import { CostComponent } from './cost/cost.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: CostsControlComponent },
];

@NgModule({
    declarations: [
        CostsControlComponent,
        BlockComponent,
        CostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class CostsControlModule {
}
