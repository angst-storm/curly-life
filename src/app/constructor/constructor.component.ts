import { Component } from '@angular/core';
import { PlanService } from '../services/planElements.service';

@Component({
    selector: 'constructor',
    templateUrl: './constructor.component.html',
    styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent{
    constructor(public planService: PlanService) {
    }
}
