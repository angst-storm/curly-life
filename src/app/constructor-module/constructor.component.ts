import { Component, ViewChild } from '@angular/core';
import { PlanService } from '../services/planElements.service';
import { PlanElement } from '../models/planElement.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ConfPanelComponent } from './children/conf-panel/conf-panel.component';

@Component({
    selector: 'constructor',
    templateUrl: './constructor.component.html',
    styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent {
    public blocks: PlanElement[] = [];

    @ViewChild(ConfPanelComponent, { static: false })
    public confPanel: ConfPanelComponent | undefined;

    constructor(public planService: PlanService, private _userService: UserService, private _router: Router) {
        if (this._userService.token) {
            this.planService.downloadPlan(this._userService.token).subscribe((plan: PlanElement) => {
                this.blocks = plan.allElements;
            });
        }
    }

    public configure(block: PlanElement): void {
        this.confPanel?.open(block);
    }

    public updateBlocks(): void {
        this.blocks = this.planService.plan.allElements;
    }

    public toControlCosts(): void {
        if (this._userService.token) {
            this.planService.updatePlan(this._userService.token, this.planService.plan)
                .subscribe(() => {
                    this._router.navigate(['/control']);
                });
        } else {
            this.exit();
        }
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['/user/auth']);
    }
}
