import { Injectable } from '@angular/core';
import { PlanElement } from '../models/planElement.model';

@Injectable()
export class PlanService {
    public plan: PlanElement;

    constructor() {
        this.plan = PlanElement.createPlan(35000);
        const compulsoryExpenses: PlanElement = this.plan.createSubElement('Обязательные расходы', 50);
        compulsoryExpenses.createSubElement('Продукты', 45);
        compulsoryExpenses.createSubElement('ЖКХ', 40);
        compulsoryExpenses.createSubElement('Подписки', 15);
        this.plan.createSubElement('Необязательные расходы', 30);
        this.plan.createSubElement('Накопления', 20);
    }
}
