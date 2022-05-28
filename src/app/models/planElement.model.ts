import { PlanError } from './planError.model';
import { Cost } from './cost.model';

export class PlanElement {
    public static createPlan(sum: number): PlanElement {
        return new PlanElement('', sum, 100, null);
    }

    public name: string;
    public readonly percent: number;
    public readonly parent: PlanElement | null;

    private _sum: number;
    private _freePercent: number = 100;
    private _subElements: PlanElement[] = [];
    private _costs: Cost[] = [];

    private constructor(name: string, sum: number, percent: number, parent: PlanElement | null) {
        this.name = name;
        this._sum = sum;
        this.percent = percent;
        this.parent = parent;
    }

    public createSubElement(name: string, percent: number): PlanElement {
        if (percent > this._freePercent) {
            throw new PlanError('Сумма процентных блоков больше 100%');
        }
        if (!this.haveSubElements) {
            this._costs = [];
        }
        const element: PlanElement = new PlanElement(name, Math.floor(this._sum * percent / 100), percent, this);
        this._subElements.push(element);
        this._freePercent -= percent;

        return element;
    }

    public get path(): string {
        return this.parent === null ? '' : this.parent.path === '' ? this.name : this.parent.path + ` > ${this.name}`;
    }

    public get sum(): number {
        return this._sum;
    }

    public set sum(value: number) {
        for (const subElement of this._subElements) {
            subElement.sum = Math.floor(value * subElement.percent / 100);
        }
        this._sum = value;
    }

    public get freePercent(): number {
        return this._freePercent;
    }

    public get level(): number {
        return this.parent === null ? 0 : this.parent.level + 1;
    }

    public get subElements(): PlanElement[] {
        return this._subElements.slice();
    }

    public get costs(): Cost[] {
        return this._costs.slice();
    }

    public get allCosts(): Cost[] {
        return !this._subElements.length ? this._costs : this._subElements
            .reduce((a: Cost[], b: PlanElement) => a.concat(b.allCosts), [])
            .sort((a: Cost, b: Cost) => a.time < b.time ? 1 : a.time > b.time ? -1 : 0);
    }

    public get allCostsSum(): number {
        return this.allCosts.reduce((a: number, b: Cost) => a + b.sum, 0);
    }

    public get fill(): number {
        return Math.floor(this.allCostsSum / this.sum * 100);
    }

    public get allElements(): PlanElement[] {
        let result: PlanElement[] = [];
        for (const element of this._subElements) {
            result.push(element);
            result = result.concat(element.allElements);
        }

        return result;
    }

    public get endElements(): PlanElement[] {
        return !this._subElements.length ? [this] : this._subElements
            .reduce((a: PlanElement[], b: PlanElement) => a.concat(b.endElements), []);
    }

    public get haveSubElements(): boolean {
        return this._subElements.length !== 0;
    }

    public createCost(sum: number, time: number = Date.now()): Cost {
        if (this._subElements.length !== 0) {
            throw new PlanError('Добавлена трата в блок, у которого есть подблоки');
        }
        const cost: Cost = new Cost(this, sum, time);
        this._costs.push(cost);

        return cost;
    }

    public removeCost(cost: Cost): void {
        const index: number = this._costs.indexOf(cost);
        if (index === -1) {
            throw new PlanError('Попытка удалить трату, которой нет в блоке');
        }
        this._costs.splice(index, 1);
    }

    public removeElement(element: PlanElement): void {
        const index: number = this._subElements.indexOf(element);
        if (index === -1) {
            throw new PlanError('Попытка удалить подблок, которого нет в блоке');
        }
        this._subElements.splice(index, 1);
        this._freePercent += element.percent;
    }

    public removeSubElements(): void {
        this._subElements = [];
        this._freePercent = 100;
    }
}
