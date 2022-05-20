import { NgModule } from '@angular/core';
import { CostsControlComponent } from './costs-control.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: CostsControlComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: []
})
export class CostsControlModule {
}
