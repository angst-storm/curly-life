import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegComponent } from './reg.component';

const routes: Routes = [
    { path: '', component: RegComponent },
];

@NgModule({
    declarations: [
        RegComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
})
export class RegModule { }
