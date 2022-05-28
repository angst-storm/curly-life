import { Component } from '@angular/core';
import { PlanService } from '../services/planElements.service';
import { PlanElement } from '../models/planElement.model';
import { Cost } from '../models/cost.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'costs-control',
    templateUrl: './costs-control.component.html',
    styleUrls: ['./costs-control.component.css']
})
export class CostsControlComponent {
    public sum: number = 0;
    public blocks: PlanElement[] = [];
    public costs: Cost[] = [];

    constructor(public planService: PlanService, private _userService: UserService, private _router: Router) {
        if (this._userService.token) {
            planService.downloadPlan(this._userService.token).subscribe((plan: PlanElement) => {
                this.sum = plan.sum;
                this.blocks = plan.allElements;
                this.costs = plan.costs;
            });
        }
    }

    public updateCosts(): void {
        this.costs = this.planService.plan.costs;
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['/user/auth']);
    }
}
