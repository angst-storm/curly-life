import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'choose-plan',
    templateUrl: './choose-plan.component.html',
    styleUrls: ['./choose-plan.component.css']
})
export class ChoosePlanComponent {
    public plans: string[] = ['План 1', 'План 2', 'План 3'];

    constructor(private _userService: UserService, private _router: Router) {
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['/user/auth']);
    }
}
