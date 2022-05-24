import { Component, ViewChild } from '@angular/core';
import { PlanService } from '../services/planElements.service';
import { PlanElement } from '../models/planElement.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AddPanelComponent } from './add-panel/add-panel.component';
import { BlockData } from './add-panel/blockData.model';

@Component({
    selector: 'constructor',
    templateUrl: './constructor.component.html',
    styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent {
    public blocks: PlanElement[];
    public configuredBlock: PlanElement;

    @ViewChild(AddPanelComponent, { static: false })
    private _addPanel: AddPanelComponent | undefined;

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
        this._addPanel?.open(block);
    }

    public addSubBlock(data: BlockData): void {
        this.configuredBlock.createSubElement(data.name, data.percent);
        this.updateBlocks();
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
