import { NgModule } from '@angular/core';
import { RepeatPipe } from '../pipes/repeat.pipe';
import { BlockComponent } from './block/block.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { RedDirective } from '../directives/red.directive';
import { HeaderComponent } from './header/header.component';
import { DictEnumPipe } from '../pipes/dictEnum.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BlockComponent,
        ModalComponent,
        HeaderComponent,
        RepeatPipe,
        RedDirective,
        DictEnumPipe
    ],
    declarations: [
        BlockComponent,
        ModalComponent,
        HeaderComponent,
        RepeatPipe,
        RedDirective,
        DictEnumPipe,
    ]
})
export class SharedModule {
}
