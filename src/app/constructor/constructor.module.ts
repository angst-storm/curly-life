import { NgModule } from '@angular/core';
import { ConstructorComponent } from './constructor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: ConstructorComponent },
];

@NgModule({
    declarations: [
        ConstructorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
})
export class ConstructorModule {
}
