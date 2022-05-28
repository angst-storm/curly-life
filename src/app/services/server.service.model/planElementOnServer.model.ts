import { CostOnServer } from './costOnServer.model';

export class PlanElementOnServer {
    constructor(
        public name: string,
        public percent: number,
        public subElements: PlanElementOnServer[],
        public costs: CostOnServer[]) {
    }

}
