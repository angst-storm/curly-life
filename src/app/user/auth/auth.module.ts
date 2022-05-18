import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
];

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
})
export class AuthModule {
}
