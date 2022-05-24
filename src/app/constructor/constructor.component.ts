import { Component } from '@angular/core';
import { PlanService } from '../services/planElements.service';
import { PlanElement } from '../models/planElement.model';
import { Cost } from '../models/cost.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'constructor',
    templateUrl: './constructor.component.html',
    styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent {
    public blocks: PlanElement[];
    public configuredBlockNewName: string = '';
    public addingBlockName: string = '';
    public addingBlockPercent: number = 0;
    public configuredBlock: PlanElement;
    public configurationInProgress: boolean = false;

    constructor(public planService: PlanService, private _userService: UserService, private _router: Router) {
        this.configuredBlock = planService.plan;
        this.blocks = planService.plan.allElements;
    }

    public addSubBlock(): void {
        this.configuredBlock.addElement(this.addingBlockName, this.addingBlockPercent);
        this.configuredBlock.costs.forEach((c: Cost) => this.configuredBlock.removeCost(c));
        this.blocks = this.planService.plan.allElements;
    }

    public renameBlock(): void {
        const oldName: string = this.configuredBlock.name;
        this.configuredBlock.name = this.configuredBlockNewName;
        this.configuredBlock.resetPath(this.configuredBlock.path.slice(0, -oldName.length - (this.configuredBlock.level === 1 ? 0 : 3)));
        this.blocks = this.planService.plan.allElements;
    }

    public removeSubBlocks(): void {
        this.configuredBlock.subElements = [];
        this.configuredBlock.freePercent = 100;
        this.blocks = this.planService.plan.allElements;
    }

    public removeBlock(): void {
        const father: PlanElement = this.planService.plan.findFather(this.configuredBlock);
        const elements: PlanElement[] = father.subElements;
        father.freePercent += this.configuredBlock.percent;
        elements.splice(elements.indexOf(this.configuredBlock), 1);
        this.closeConfiguration();
        this.blocks = this.planService.plan.allElements;
    }

    public configure(block: PlanElement): void {
        this.configurationInProgress = true;
        this.configuredBlock = block;
    }

    public closeConfiguration(): void {
        this.configurationInProgress = false;
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['/user/auth']);
    }
}
