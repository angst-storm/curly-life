import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegViewModel } from '../view-model/reg.view-model';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { AuthData } from '../../models/auth.model';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})
export class RegComponent {
    public viewModel: RegViewModel;

    constructor(private _router: Router, private _userService: UserService, private _fb: FormBuilder) {
        this.viewModel = new RegViewModel(this._fb);
        this.viewModel.form.controls['login'].addAsyncValidators(this.checkLoginValidator.bind(this));
    }

    public get invalidLogin(): boolean {
        return ['required', 'pattern', 'minlength'].some((e: string) => this.viewModel.form.controls['login'].hasError(e));
    }

    public submit(): void {
        if (this.viewModel.form.valid) {
            const data: AuthData = this.viewModel.toModel();
            this._userService.registerUser(data).subscribe(() => {
                this._router.navigate(['/user/auth']);
            });
        }
    }

    private checkLoginValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        return this._userService.checkLogin(control.value)
            .pipe(map((check: boolean) => check ? null : { loginUsed: true }));
    }
}
