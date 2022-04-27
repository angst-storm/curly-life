import { Injectable } from '@angular/core';
import { PlanElement } from '../models/planElement.model';

@Injectable()
export class PlanService {
    public plan: PlanElement;
    constructor() {
        this.plan = new PlanElement(35000);
        this.plan.addElement('Обязательные расходы', 50);
        this.plan.addElement('Необязательные расходы', 30);
        this.plan.addElement('Накопления', 20);
    }
}