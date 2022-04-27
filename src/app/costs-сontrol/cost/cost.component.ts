import { Component, Input } from '@angular/core';

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
}
