import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() public id: string = '';
    private readonly _element: HTMLElement;

    constructor(private _modalService: ModalService, private _el: ElementRef) {
        this._element = _el.nativeElement;
    }

    public ngOnInit(): void {
        if (!this.id) {
            console.error('У модального окна нет ID');

            return;
        }

        document.body.appendChild(this._element);

        this._modalService.add(this);
    }

    public ngOnDestroy(): void {
        this._modalService.remove(this.id);
        this._element.remove();
    }

    public open(): void {
        this._element.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    public close(): void {
        this._element.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}
