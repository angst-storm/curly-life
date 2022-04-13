import { Component, Input } from '@angular/core';

@Component({
    selector: 'block',
    templateUrl: 'block.component.html',
    styleUrls: ['block.component.css']
})
export class BlockComponent {
    @Input()
    public name: string = '0';
    @Input()
    public percent: number = 0;
    @Input()
    public sum: number = 0;
}
