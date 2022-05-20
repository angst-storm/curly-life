import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';
import { ServerService } from '../services/server.service';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then((m : any) => m.AuthModule)
            },
            {
                path: 'reg',
                loadChildren: () => import('./reg/reg.module').then((m : any) => m.RegModule)
            },
            {
                path: '**',
                redirectTo: '/user/auth',
                pathMatch: 'full'
            }
        ],
    },
];

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [
    ],
})
export class UserModule { }
