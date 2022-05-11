import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.css']
})
export class CostComponent{
    @Input()
    public name: string = '0';
    @Input()
    public sum: number = 0;
    @Input()
    public cost: any = null;

    @Output()
    public costDeleted: EventEmitter<null> = new EventEmitter();

    public delete(): void {
        this.cost.element.removeCost(this.cost);
        this.costDeleted.emit();
    }
}
