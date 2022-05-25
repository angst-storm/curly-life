import { Component } from '@angular/core';
import { AuthViewModel } from '../view-model/auth.view-model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthData } from '../../models/auth.model';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    public viewModel : AuthViewModel = new AuthViewModel(this._fb);
    public wrongData : boolean = false;

    constructor (private _router : Router, private _userService : UserService, private _fb : FormBuilder) { }

    public submit() : void {
        this.wrongData = false;
        if (this.viewModel.form.valid){
            const model: AuthData = this.viewModel.toModel();
            this._userService.authoriseUser(model).subscribe((isAuthorised: boolean) => {
                if (isAuthorised) {
                    this._router.navigate(['/control']);
                } else {
                    this.wrongData = true;
                }
            });
        }
    }
}
