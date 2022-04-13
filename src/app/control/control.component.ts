import { Component } from '@angular/core';
import { Block } from '../models/block.model';
import { BlockService } from '../services/block.service';


@Component({
    selector: 'control',
    templateUrl: 'control.component.html',
    styleUrls: ['control.component.css']
})
export class ControlComponent {
    public blocks: Block[];

    constructor(private _blockService: BlockService) {
        this.blocks = _blockService.blocks;
    }

    public addBlock(): void {
        this.blocks.push(new Block('Добавленный блок', 0, 0));
    }

    public rmBlock(): void {
        if (this.blocks.length > 0) {
            this.blocks.pop();
        }
    }

}
