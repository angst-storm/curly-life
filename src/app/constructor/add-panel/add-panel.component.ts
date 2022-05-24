import { Component, EventEmitter, Output } from '@angular/core';
import { PlanElement } from '../../models/planElement.model';
import { ModalService } from '../../services/modal.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
    selector: 'add-panel',
    templateUrl: './add-panel.component.html',
    styleUrls: ['./add-panel.component.css']
})
export class AddPanelComponent {
    @Output() public blockAdded: EventEmitter<null> = new EventEmitter<null>();
    public parentBlock: PlanElement | null = null;

    public form: FormGroup = new FormGroup({
        'name': new FormControl('', Validators.required),
        'percent': new FormControl(1, [Validators.required, Validators.min(1),
            (control: AbstractControl): ValidationErrors | null => {
                return this.parentBlock && control.value > this.parentBlock.freePercent ? { 'percent': true } : null;
            }])
    });

    constructor(private _modalService: ModalService) {
    }

    public open(parent: PlanElement): void {
        this.parentBlock = parent;
        this.form.controls['name'].setValue('');
        this.form.controls['percent'].setValue(Math.floor(parent.freePercent / 2));
        this._modalService.open('add-panel-modal');
    }

    public close(): void {
        this.parentBlock = null;
        this.form.controls['name'].setValue('');
        this.form.controls['percent'].setValue(0);
        this._modalService.close('add-panel-modal');
    }

    public submit(): void {
        if (this.form.valid) {
            this.parentBlock?.createSubElement(this.form.controls['name'].value,
                this.form.controls['percent'].value);
            this.blockAdded.emit();
            this.close();
        }
    }
}
