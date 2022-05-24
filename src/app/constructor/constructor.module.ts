import { NgModule } from '@angular/core';
import { ConstructorComponent } from './constructor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RedDirective } from '../directives/red.directive';
import { AddPanelComponent } from './add-panel/add-panel.component';

const routes: Routes = [
    { path: '', component: ConstructorComponent },
];

@NgModule({
    declarations: [
        ConstructorComponent,
        AddPanelComponent,
        RedDirective
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
