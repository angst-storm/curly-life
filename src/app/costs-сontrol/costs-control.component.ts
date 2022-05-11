import { Component } from '@angular/core';
import { PlanService } from '../services/planElements.service';
import { PlanElement } from '../models/planElement.model';
import { Cost } from '../models/cost.model';


@Component({
    selector: 'costs-control',
    templateUrl: 'costs-control.component.html',
    styleUrls: ['costs-control.component.css']
})
export class CostsControlComponent {
    public sum: number;
    public blocks: PlanElement[];
    public endBlocks: PlanElement[];
    public costs: Cost[];
    public costSum: string = '';
    public costName: string = '';

    constructor(private _planService: PlanService) {
        this.sum = _planService.plan.sum;
        this.blocks = _planService.plan.allElements;
        this.endBlocks = _planService.plan.endElements;
        this.costs = _planService.plan.costs;
    }

    public addCost(): void {
        const elem: PlanElement = this.blocks.filter((e: PlanElement) => e.name === this.costName)[0];
        elem.addCost(new Cost(parseInt(this.costSum), elem));
        this.updateCosts();
    }

    public updateCosts(): void {
        this.costs = this._planService.plan.costs;
    }
}
