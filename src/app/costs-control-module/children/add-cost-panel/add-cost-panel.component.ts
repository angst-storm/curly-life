import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanElement } from '../../../models/planElement.model';

@Component({
    selector: 'add-cost-panel',
    templateUrl: './add-cost-panel.component.html',
    styleUrls: ['./add-cost-panel.component.css']
})
export class AddCostPanelComponent {
    @Input() public plan: PlanElement = PlanElement.createPlan(0);
    @Output() public costAdded: EventEmitter<null> = new EventEmitter<null>();

    public form: FormGroup = new FormGroup({
        index: new FormControl(0, Validators.required),
        sum: new FormControl(0, Validators.required),
    });

    constructor(private _modalService: ModalService) {
    }

    public open(): void {
        this._modalService.open('add-cost-panel-modal');
    }

    public close(): void {
        this.form.controls['index'].setValue(0);
        this.form.controls['sum'].setValue(0);
        this._modalService.close('add-cost-panel-modal');
    }

    public submit(): void {
        if (this.form.valid) {
            this.plan.endElements[this.form.controls['index'].value].createCost(this.form.controls['sum'].value);
            this.costAdded.emit();
            this.close();
        }
    }
}
