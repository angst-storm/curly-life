import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'block',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.css']
})
export class BlockComponent {
    @Input() public level: number = 0;
    @Input() public name: string = '';
    @Input() public percent: number = 0;
    @Input() public sum: number = 0;
    @Output() public blockClick: EventEmitter<null> = new EventEmitter<null>();
}
