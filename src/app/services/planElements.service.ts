import { Injectable } from '@angular/core';
import { PlanElement } from '../models/planElement.model';
import { PlanOnServer } from './server.service.model/planOnServer.model';
import { PlanElementOnServer } from './server.service.model/planElementOnServer.model';
import { ServerService } from './server.service';
import { map, Observable } from 'rxjs';
import { PlanError } from '../models/planError.model';
import { Cost } from '../models/cost.model';
import { CostOnServer } from './server.service.model/costOnServer.model';

@Injectable()
export class PlanService {
    private static serializePlan(plan: PlanElement): PlanOnServer {
        return new PlanOnServer(plan.sum,
            plan.subElements.map((e: PlanElement) => PlanService.serializeElement(e)),
            plan.costs.map((c: Cost) => new CostOnServer(c.sum, c.time)));
    }

    private static serializeElement(element: PlanElement): PlanElementOnServer {
        return new PlanElementOnServer(
            element.name,
            element.percent,
            element.subElements.map((e: PlanElement) => PlanService.serializeElement(e)),
            element.costs.map((c: Cost) => new CostOnServer(c.sum, c.time)));
    }

    private static deserializePlan(data: PlanOnServer): PlanElement {
        const plan: PlanElement = PlanElement.createPlan(data.sum);
        this.deserializeElement(plan, data);

        return plan;
    }

    private static deserializeElement(element: PlanElement, data: PlanOnServer | PlanElementOnServer): void {
        for (const subElement of data.subElements) {
            const sub: PlanElement = element.createSubElement(subElement.name, subElement.percent);
            this.deserializeElement(sub, subElement);
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

    public updatePlan(token: string, plan: PlanElement): Observable<boolean> {
        return this._server.putPlan(token, PlanService.serializePlan(plan)).pipe(map((res: PlanOnServer | null) => {
            if (!res) {
                throw new PlanError('Не удалось обновить план - токен не действителен');
            }

            return true;
        }));
    }
}
