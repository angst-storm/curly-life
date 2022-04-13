import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app/app.component';
import { AuthComponent } from './auth/auth.component';
import { ControlComponent } from './control/control.component';
import { ConstructorComponent } from './constructor/constructor.component';
import { BlockComponent } from './block/block.component';

import { BlockService } from './services/block.service';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        ControlComponent,
        ConstructorComponent,
        BlockComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    bootstrap: [AppComponent],
    providers: [
        BlockService
    ]
})
export class AppModule {
}
