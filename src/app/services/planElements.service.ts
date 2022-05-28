import { Injectable } from '@angular/core';
import { PlanElement } from '../models/planElement.model';
import { PlanOnServer } from './server.service.model/planOnServer.model';
import { PlanElementOnServer } from './server.service.model/planElementOnServer.model';
import { ServerService } from './server.service';
import { map, Observable } from 'rxjs';
import { PlanError } from '../models/planError.model';

@Injectable()
export class PlanService {
    private static deserializePlan(data: PlanOnServer): PlanElement {
        const plan: PlanElement = PlanElement.createPlan(data.sum);
        this.addSubElements(plan, data);

        return plan;
    }

    private static addSubElements(element: PlanElement, data: PlanOnServer | PlanElementOnServer): void {
        for (const subElement of data.subElements) {
            const sub: PlanElement = element.createSubElement(subElement.name, subElement.percent);
            this.addSubElements(sub, subElement);
        }
        for (const cost of data.costs) {
            element.createCost(cost.sum, cost.time);
        }
    }

    public plan: PlanElement;

    constructor(private _server: ServerService) {
        this.plan = PlanElement.createPlan(0);
    }

    public downloadPlan(token: string): Observable<PlanElement> {
        return this._server.getPlan(token).pipe(map((plan: PlanOnServer | null) => {
            if (!plan) {
                throw new PlanError('Не удалось подгрузить план - токен не действителен');
            }
            this.plan = PlanService.deserializePlan(plan);

            return this.plan;
        }));
    }
}
