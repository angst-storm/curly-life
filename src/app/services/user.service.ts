import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';
import { ServerService } from './server.service';
import { map, Observable, Subscriber } from 'rxjs';


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

    public checkToken(): Observable<boolean> {
        if (this._token !== null) {
            return this._server.checkToken(this._token);
        }

        return new Observable<boolean>((subscriber: Subscriber<boolean>) => subscriber.next(false));
    }

    public deleteToken(): void {
        this._token = null;
        localStorage.removeItem('token');
    }

    public registerUser(data: AuthData): Observable<boolean> {
        return this._server.postUser(data).pipe(map(() => {
            return true;
        }));
    }

    public authoriseUser(data: AuthData): Observable<boolean> {
        return this._server.getToken(data).pipe(map((token: string | null) => {
            if (token !== null) {
                this.updateToken(token);

                return true;
            }

            return false;
        }));
    }
}
