import { Component } from '@angular/core';
import { PlanService } from '../services/planElements.service';
import { PlanElement } from '../models/planElement.model';
import { Cost } from '../models/cost.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'constructor',
    templateUrl: './constructor.component.html',
    styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent {
    public blocks: PlanElement[];
    public addingBlockName: string = '';
    public addingBlockPercent: number = 0;
    public configuredBlock: PlanElement;

    constructor(public planService: PlanService,
        private _userService: UserService,
        private _router: Router,
        private _modalService: ModalService) {
        this.configuredBlock = planService.plan;
        this.blocks = planService.plan.allElements;
    }

    public configure(block: PlanElement): void {
        this.configuredBlock = block;
        this._modalService.open('configuration');
    }

    public closeConfiguration(): void {
        this._modalService.close('configuration');
    }

    public startSubBlockAdding(block: PlanElement): void {
        this.closeConfiguration();
        this.configuredBlock = block;
        this.addingBlockPercent = block.freePercent;
        this._modalService.open('adding');
    }

    public addSubBlock(): void {
        this.configuredBlock.createSubElement(this.addingBlockName, this.addingBlockPercent);
        this.endSubBlockAdding();
        this.updateBlocks();
    }

    public endSubBlockAdding(): void {
        this._modalService.close('adding');
    }

    public removeSubBlocks(): void {
        this.configuredBlock.removeSubElements();
        this.updateBlocks();
    }

    public removeBlock(): void {
        this.configuredBlock.parent?.removeElement(this.configuredBlock);
        this.closeConfiguration();
        this.updateBlocks();
    }

    public exit(): void {
        this._userService.deleteToken();
        this._router.navigate(['/user/auth']);
    }

    private updateBlocks(): void {
        this.blocks = this.planService.plan.allElements;
    }
}
