import { NgModule } from '@angular/core';
import { RepeatPipe } from '../pipes/repeat.pipe';
import { BlockComponent } from './block/block.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { RedDirective } from '../directives/red.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BlockComponent,
        ModalComponent,
        RepeatPipe,
        RedDirective
    ],
    declarations: [
        BlockComponent,
        ModalComponent,
        RepeatPipe,
        RedDirective,
    ]
})
export class SharedModule {
}
