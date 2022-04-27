import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { CostsControlComponent } from './costs-сontrol/costs-control.component';
import { BlockComponent } from './costs-сontrol/block/block.component';

import { PlanService } from './services/planElements.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CostsControlComponent,
        BlockComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule
    ],
    bootstrap: [CostsControlComponent],
    providers: [PlanService]
})
export class AppModule {
}
