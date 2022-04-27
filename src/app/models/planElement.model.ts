import { PlanError } from './planError.model';
import { Cost } from './cost.model';

export class PlanElement {
    public percent: number;
    public freePercent: number;
    public name: string;

    public get fill(): number {
        return Math.floor(this.costs.reduce((a: number, b: Cost) => a + b.sum, 0) / this.sum * 100);
    }

    public subElements: PlanElement[];
    private readonly _costs: Cost[] = [];
    public get costs(): Cost[] {
        return !this.subElements.length ? this._costs : this.subElements
            .reduce((a: Cost[], b: PlanElement) => a.concat(b.costs), [])
            .sort((a: Cost, b: Cost) => a.time < b.time ? 1 : a.time > b.time ? -1 : 0);
    }

    public addCost(cost: Cost): void {
        this._costs.push(cost);
    }

    private _sum: number;

    public get sum(): number {
        return this._sum;
    }

    public set sum(value: number) {
        for (const subElement of this.subElements) {
            subElement.sum = Math.floor(value * subElement.percent / 100);
        }
        this._sum = value;
    }

    constructor(sum: number, percent: number = 100, name: string = '') {
        this._sum = sum;
        this.subElements = [];
        this._costs = [];
        this.freePercent = 100;
        this.percent = percent;
        this.name = name;
    }

    public addElement(name: string, percent: number): void {
        if (percent <= this.freePercent) {
            this.subElements.push(new PlanElement(Math.floor(this._sum * percent / 100), percent, name));
            this.freePercent -= percent;
        } else {
            throw new PlanError('Сумма процентных блоков больше 100%');
        }
    }
}
