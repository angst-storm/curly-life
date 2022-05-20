import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthData } from '../../models/auth.model';

export class RegViewModel {
    public form: FormGroup = this._fb.group({
        login: ['', [
            Validators.required,
            Validators.pattern(/^\w+$/),
            Validators.minLength(6),
        ]],
        password: ['', [
            Validators.required,
            Validators.pattern(/^[\w!"#$%&'()*+,\-./]+$/),
            Validators.minLength(8),
        ]],
        passwordConfirm: ['', Validators.required],
    }, {
        validators: (group: AbstractControl): ValidationErrors | null => {
            return group.get('password')?.value === group.get('passwordConfirm')?.value ? null : { notSame: true };
        }
    });

    constructor(private _fb: FormBuilder) {
    }

    public toModel(): AuthData {
        return {
            login: this.form.get('login')?.value,
            password: this.form.get('password')?.value
        };
    }
}
