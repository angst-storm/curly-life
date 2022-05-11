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
    @Input()
    public level: number = 0;
    @Input()
    public costsSum: number = 0;

    public get remainder(): number {
        return this.sum - this.costsSum;
    }

    public get fill(): number {
        return Math.floor(this.costsSum / this.sum * 100);
    }

    public get barFill(): number {
        return this.fill <= 100 ? 47 / 100 * this.fill : 47;
    }

    public get barColor(): string {
        return this.fill <= 50 ? 'lightgreen' : this.fill <= 100 ? 'yellow' : 'red';
    }

    public get backgroundColor(): string {
        const value: number = 255 - 40 * (this.level - 1);

        return `rgb(${value},${value},${value})`;
    }
}
