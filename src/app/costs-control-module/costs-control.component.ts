import { Component } from '@angular/core';
import { PlanService } from '../services/planElements.service';
import { PlanElement } from '../models/planElement.model';
import { Cost } from '../models/cost.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'costs-control',
    templateUrl: './costs-control.component.html',
    styleUrls: ['./costs-control.component.css']
})
export class CostsControlComponent {
    public sum: number = 0;
    public blocks: PlanElement[] = [];
    public costs: Cost[] = [];

    constructor(public planService: PlanService, private _userService: UserService,
        private _route: ActivatedRoute, private _router: Router) {
        if (this._userService.token) {
            this.planService.downloadPlan(this._userService.token, this._route.snapshot.params['id'])
                .subscribe((plan: PlanElement) => {
                    this.sum = plan.sum;
                    this.blocks = plan.allElements;
                    this.costs = plan.allCosts;
                });
        }
    }

    public updateCosts(): void {
        if (this._userService.token) {
            this.planService.updatePlan(this._userService.token, this._route.snapshot.params['id'], this.planService.plan)
                .subscribe();
            this.costs = this.planService.plan.allCosts;
        } else {
            this.exit();
        }
    }

    public toChoosePlan(): void {
        this._router.navigate(['choose']);
    }

    public toConstructor(): void {
        this._router.navigate(['constructor', this._route.snapshot.params['id']]);
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['user', 'auth']);
    }
}
