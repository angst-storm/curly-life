import { NgModule } from '@angular/core';
import { ConstructorComponent } from './constructor.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: ConstructorComponent },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [],
})
export class ConstructorModule {
}
