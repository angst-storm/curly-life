import { PlanElement } from './planElement.model';

export class Cost {
    public sum: number;
    public time: number;
    public element: PlanElement;

    public get name(): string {
        return this.element.path;
    }

    constructor(element: PlanElement, sum: number, time: number) {
        this.sum = sum;
        this.element = element;
        this.time = time;
    }
}
