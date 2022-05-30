import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegComponent } from './reg.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: RegComponent },
];

@NgModule({
    declarations: [
        RegComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
})
export class RegModule { }
