import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'reg',
                loadChildren: () => import('./reg/reg.module').then((m : any) => m.RegModule)
            },
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then((m : any) => m.AuthModule)
            },
            {
                path: '',
                redirectTo: '/user/auth'
            }
        ],
    },
];

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [
        UserService
    ],
})
export class UserModule { }
