import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegViewModel } from '../view-model/reg.view-model';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { AuthData } from '../../models/auth.model';

@Component({
    selector: 'reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})
export class RegComponent {
    public viewModel: RegViewModel = new RegViewModel(this._fb);

    constructor(private _router: Router, private _userService: UserService, private _fb: FormBuilder) {
    }

    public submit(): void {
        if (this.viewModel.form.valid) {
            const data: AuthData = this.viewModel.toModel();
            this._userService.registerUser(data).subscribe(() => {
                this._router.navigate(['/user/auth']);
            });
        }
    }
}
