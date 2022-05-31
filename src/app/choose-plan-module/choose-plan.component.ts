import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { PlanService } from '../services/planElements.service';

@Component({
    selector: 'choose-plan',
    templateUrl: './choose-plan.component.html',
    styleUrls: ['./choose-plan.component.css']
})
export class ChoosePlanComponent {
    public deleteMode: boolean = false;
    public plansIDs: number[] = [];

    constructor(private _userService: UserService, private _planService: PlanService, private _router: Router) {
        if (this._userService.token) {
            this._planService.getPlansIDs(this._userService.token)
                .subscribe((plans: number[]) => {
                    this.plansIDs = plans;
                });
        }
    }

    public add(): void {
        if (this._userService.token) {
            this._planService.createPlan(this._userService.token).subscribe((res: number) => {
                this.plansIDs.push(res);
            });
        }
    }

    public delete(id: number): void {
        if (this._userService.token) {
            this._planService.deletePlan(this._userService.token, +id).subscribe(
                (res: boolean) => {
                    if (res) {
                        this.plansIDs.splice(this.plansIDs.indexOf(id), 1);
                    }
                }
            );
        }
    }

    public toControl(id: number): void {
        this._router.navigate(['control', id]);
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['user', 'auth']);
    }
}
