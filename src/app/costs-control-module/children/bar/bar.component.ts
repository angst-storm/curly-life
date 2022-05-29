import { Component, Input } from '@angular/core';

@Component({
    selector: 'bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.css']
})
export class BarComponent {
    @Input()
    public sum: number = 0;
    @Input()
    public costsSum: number = 0;

    public get remainder(): number {
        return this.sum - this.costsSum;
    }

    public get fill(): number {
        return Math.floor(this.costsSum / this.sum * 100);
    }

    public get barFill(): number {
        return this.sum ? this.fill <= 100 ? this.fill : 100 : 0;
    }

    public get barColor(): string {
        return this.fill <= 50 ? 'lightgreen' : this.fill < 100 ? 'yellow' : 'red';
    }

}
