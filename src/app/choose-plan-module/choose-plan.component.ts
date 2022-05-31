import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { PlanElement } from '../models/planElement.model';
import { PlanService } from '../services/planElements.service';

@Component({
    selector: 'choose-plan',
    templateUrl: './choose-plan.component.html',
    styleUrls: ['./choose-plan.component.css']
})
export class ChoosePlanComponent {
    public deleteMode: boolean = false;
    public plans: { [id: number]: PlanElement } = {};

    constructor(private _userService: UserService, private _planService: PlanService, private _router: Router) {
        if (this._userService.token) {
            this._planService.getPlans(this._userService.token)
                .subscribe((plans: { [id: number]: PlanElement }) => {
                    this.plans = plans;
                });
        }
    }

    public add(): void {
        console.error('Добавить новый план');
    }

    public delete(id: string): void {
        console.error(`Удалить план по ID ${id}`);
    }

    public toControl(id: string): void {
        this._router.navigate(['control', id]);
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['user', 'auth']);
    }
}
