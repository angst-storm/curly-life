import { Injectable } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private _modals: ModalComponent[] = [];

    public add(modal: ModalComponent): void {
        this._modals.push(modal);
    }

    public remove(id: string): void {
        this._modals = this._modals.filter((x: ModalComponent) => x.id !== id);
    }

    public open(id: string): void {
        const modal: ModalComponent | undefined = this._modals.find((x: ModalComponent) => x.id === id);
        modal?.open();
    }

    public close(id: string): void {
        const modal: ModalComponent | undefined = this._modals.find((x: ModalComponent) => x.id === id);
        modal?.close();
    }
}
