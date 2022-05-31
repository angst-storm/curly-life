import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'choose-plan',
    templateUrl: './choose-plan.component.html',
    styleUrls: ['./choose-plan.component.css']
})
export class ChoosePlanComponent {
    public plansCount: number = 0;
    public deleteMode: boolean = false;

    constructor(private _userService: UserService, private _router: Router) {
    }

    public add(): void {
        this.plansCount += 1;
    }

    public delete(i: number): void {
        alert(i);
    }

    public toControl(): void {
        this._router.navigate(['/control']);
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['/user/auth']);
    }
}
