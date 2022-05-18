import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../models/auth.model';

export class AuthViewModel {
    public form: FormGroup = this._fb.group({
        login: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    constructor (private _fb : FormBuilder) { }

    public toModel() : AuthData {
        return {
            login: this.form.get('login')?.value,
            password: this.form.get('password')?.value,
        };
    }
}
