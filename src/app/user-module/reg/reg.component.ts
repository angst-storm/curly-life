import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthData } from '../../models/auth.model';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})
export class RegComponent {
    private static passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
        return group.get('password')?.value === group.get('passwordConfirm')?.value ? null : { notSame: true };
    };

    public form: FormGroup = new FormGroup({
        login: new FormControl('', [
            Validators.required,
            Validators.pattern(/^\w+$/),
            Validators.minLength(6),
        ], this.checkLoginValidator.bind(this)),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[\w!"#$%&'()*+,\-./]+$/),
            Validators.minLength(8),
        ]),
        passwordConfirm: new FormControl('', Validators.required)
    }, {
        validators: RegComponent.passwordMatchValidator
    });

    constructor(private _router: Router, private _userService: UserService, private _fb: FormBuilder) {
    }

    public submit(): void {
        if (this.form.valid) {
            const data: AuthData = new AuthData(
                this.form.controls['login'].value,
                this.form.controls['password'].value);
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
