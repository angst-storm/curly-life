import { PlanError } from './planError.model';
import { Cost } from './cost.model';

export class PlanElement {
    public path: string;
    public subElements: PlanElement[] = [];
    public freePercent: number = 100;

    private readonly _costs: Cost[] = [];

    constructor(
        private _sum: number,
        public level: number = 0,
        public percent: number = 100,
        public name: string = '',
        path: string = ''
    ) {
        this.path = !path.length ? name : `${path} > ${name}`;
    }

    public get sum(): number {
        return this._sum;
    }

    public set sum(value: number) {
        for (const subElement of this.subElements) {
            subElement.sum = Math.floor(value * subElement.percent / 100);
        }
        this._sum = value;
    }

    public get costs(): Cost[] {
        return !this.subElements.length ? this._costs : this.subElements
            .reduce((a: Cost[], b: PlanElement) => a.concat(b.costs), [])
            .sort((a: Cost, b: Cost) => a.time < b.time ? 1 : a.time > b.time ? -1 : 0);
    }

    public get costsSum(): number {
        return this.costs.reduce((a: number, b: Cost) => a + b.sum, 0);
    }

    public get fill(): number {
        return Math.floor(this.costsSum / this.sum * 100);
    }

    public get endElements(): PlanElement[] {
        return !this.subElements.length ? [this] : this.subElements
            .reduce((a: PlanElement[], b: PlanElement) => a.concat(b.endElements), []);
    }

    public get allElements(): PlanElement[] {
        let result: PlanElement[] = [];
        for (const element of this.subElements) {
            result.push(element);
            result = result.concat(element.allElements);
        }

        return result;
    }

    public addCost(cost: Cost): void {
        if (this.subElements.length !== 0) {
            throw new PlanError('Добавлена трата в блок, у которого есть подблоки');
        }
        this._costs.push(cost);
    }

    public removeCost(cost: Cost): void {
        this._costs.splice(this._costs.indexOf(cost), 1);
    }

    public getElement(name: string): PlanElement {
        return this.subElements.filter((e: PlanElement) => e.name === name)[0];
    }

    public addElement(name: string, percent: number): void {
        if (percent <= this.freePercent) {
            this.subElements.push(new PlanElement(Math.floor(this._sum * percent / 100), this.level + 1, percent, name, this.path));
            this.freePercent -= percent;
        } else {
            throw new PlanError('Сумма процентных блоков больше 100%');
        }
    }

    public findFather(element: PlanElement): PlanElement{
        let result: PlanElement = this;
        for (const elementName of element.path.split(' > ').slice(0, -1)){
            result = this.subElements.filter((e: PlanElement) => e.name === elementName)[0];
        }

        return result;
    }

    public resetPath(path: string): void {
        this.path = !path.length ? this.name : `${path} > ${this.name}`;
        this.subElements.forEach((e: PlanElement) => e.resetPath(this.path));
    }
}
