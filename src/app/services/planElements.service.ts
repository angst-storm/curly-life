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
        this.plan.getElement('Обязательные расходы').addElement('Продукты', 45);
        this.plan.getElement('Обязательные расходы').addElement('ЖКХ', 40);
        this.plan.getElement('Обязательные расходы').addElement('Подписки', 15);
    }
}