import { Injectable } from '@angular/core';
import { RegModel } from '../models/reg.model';
import { AuthData } from '../models/auth.model';

@Injectable()
export class UserService {
    private _users: AuthData[] = [];
    public registerUser(data: RegModel): void {
        this._users.push({ login: data.login, password: data.password });
        console.log(this._users);
    }

    public authoriseUser(data: AuthData): boolean {
        return this._users.map((u: AuthData) => JSON.stringify(u)).includes(JSON.stringify(data));
    }
}
