import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';
import { ServerService } from './server.service';


@Injectable()
export class UserService {
    private _token: string | null = null;

    constructor(private _server: ServerService) {
        this._token = localStorage.getItem('token');
    }

    public get token(): string | null {
        return this._token;
    }

    public updateToken(value: string): void {
        this._token = value;
        localStorage.setItem('token', value);
    }

    public checkToken(): boolean {
        if (this._token !== null) {
            return this._server.checkToken(this._token);
        }

        return false;
    }

    public deleteToken(): void {
        this._token = null;
        localStorage.removeItem('token');
    }

    public registerUser(data: AuthData): void {
        this._server.postUser(data);
    }

    public authoriseUser(data: AuthData): boolean {
        const token: string | null = this._server.getToken(data);
        if (token !== null) {
            this.updateToken(token);

            return true;
        }

        return false;
    }
}
