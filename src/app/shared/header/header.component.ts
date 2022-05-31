import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'curly-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() public exitClick: EventEmitter<null> = new EventEmitter<null>();
}
