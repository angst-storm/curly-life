import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PlanElement } from '../../../models/planElement.model';
import { ModalService } from '../../../services/modal.service';
import { AddPanelComponent } from '../add-panel/add-panel.component';

@Component({
    selector: 'conf-panel',
    templateUrl: './conf-panel.component.html',
    styleUrls: ['./conf-panel.component.css']
})
export class ConfPanelComponent {
    @Output() planChanged: EventEmitter<null> = new EventEmitter<null>();
    public configuredBlock: PlanElement = PlanElement.createPlan(0);

    constructor(private _modalService: ModalService) {
    }

    @ViewChild(AddPanelComponent, { static: false })
    private _addPanel: AddPanelComponent | undefined;

    public addSubBlock(block: PlanElement): void {
        this.close();
        this._addPanel?.open(block);
    }

    public removeSubBlocks(): void {
        this.configuredBlock.removeSubElements();
        this.planChanged.emit();
    }

    public removeBlock(): void {
        this.configuredBlock.parent?.removeElement(this.configuredBlock);
        this.close();
        this.planChanged.emit();
    }

    public open(block: PlanElement): void {
        this.configuredBlock = block;
        this._modalService.open('conf-panel-modal');
    }

    public close(): void {
        this._modalService.close('conf-panel-modal');
    }
}
