import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthData } from '../../models/auth.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {
    public form: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    public wrongData: boolean = false;

    constructor(private _router: Router, private _userService: UserService) {
    }

    public submit(): void {
        this.wrongData = false;
        if (this.form.valid) {
            const model: AuthData = new AuthData(
                this.form.controls['login'].value,
                this.form.controls['password'].value);
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
