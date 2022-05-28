import { PlanElementOnServer } from './planElementOnServer.model';
import { CostOnServer } from './costOnServer.model';

export class PlanOnServer {
    constructor(
        public sum: number,
        public subElements: PlanElementOnServer[],
        public costs: CostOnServer[]) {
    }
}
