import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public regForm: FormGroup = new FormGroup({
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', [
            Validators.required,
            Validators.pattern(/^[\w!"#$%&'()*+,\-./]+$/),
            Validators.minLength(8)
        ]),
        'confirmPassword': new FormControl('', Validators.required),

    }, {
        validators: (group: AbstractControl): ValidationErrors | null => {
            return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { notSame: true };
        }
    });
}
