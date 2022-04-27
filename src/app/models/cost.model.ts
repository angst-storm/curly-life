import { PlanElement } from './planElement.model';

export class Cost {
    public sum: number;
    public time: number;
    public elements: PlanElement[];
    public get name(): string{
        return this.elements.map((e: PlanElement) => e.name).join(' > ');
    }
    constructor(sum: number, elements: PlanElement[]) {
        this.sum = sum;
        this.elements = elements;
        this.time = Date.now();
    }

}