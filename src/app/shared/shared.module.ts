import { NgModule } from '@angular/core';
import { RepeatPipe } from '../pipes/repeat.pipe';
import { BlockComponent } from './block/block.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BlockComponent,
        ModalComponent
    ],
    declarations: [
        RepeatPipe,
        BlockComponent,
        ModalComponent
    ]
})
export class SharedModule {
}
