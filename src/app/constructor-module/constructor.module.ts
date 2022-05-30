import { NgModule } from '@angular/core';
import { ConstructorComponent } from './constructor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddPanelComponent } from './children/add-panel/add-panel.component';
import { ConfPanelComponent } from './children/conf-panel/conf-panel.component';

const routes: Routes = [
    { path: '', component: ConstructorComponent },
];

@NgModule({
    declarations: [
        ConstructorComponent,
        ConfPanelComponent,
        AddPanelComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
})
export class ConstructorModule {
}
