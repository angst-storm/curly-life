import { NgModule } from '@angular/core';
import { RepeatPipe } from '../pipes/repeat.pipe';
import { BlockComponent } from './block/block.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BlockComponent
    ],
    declarations: [
        RepeatPipe,
        BlockComponent
    ],
})
export class SharedModule {
}
