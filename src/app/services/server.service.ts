import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';


@Injectable()
export class ServerService {
    private static hash(message: string, key: string): string {
        return message.replace('.', key.replace('.', ''));
    }

    private _users: AuthData[] = [
        {
            login: 'test',
            password: 'test'
        }
    ];
    private _secretKey: string = 'SECRET_KEY';


    public postUser(data: AuthData): void {
        this._users.push(data);
    }

    public getToken(data: AuthData): string | null {
        if (this._users.map((u: AuthData) => JSON.stringify(u)).includes(JSON.stringify(data))) {
            const header: string = btoa(JSON.stringify({ 'alg': 'MY', 'typ': 'JWT' }));
            const payload: string = btoa(JSON.stringify(data));
            const signature: string = ServerService.hash(`${header}.${payload}`, this._secretKey);

            return `${header}.${payload}.${signature}`;
        } else {
            return null;
        }
    }

    public checkToken(token: string): boolean {
        const [header, payload, signature]: string[] = token.split('.');
        const check: string = ServerService.hash(`${header}.${payload}`, this._secretKey);

        return signature === check;
    }
}
