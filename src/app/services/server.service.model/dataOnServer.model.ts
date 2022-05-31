import { PlanOnServer } from './planOnServer.model';

export class DataOnServer {
    constructor(
        public data: PlanOnServer,
        public user: number,
        public id: number) {
    }
}
