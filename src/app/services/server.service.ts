import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subscriber } from 'rxjs';


@Injectable()
export class ServerService {
    private static hash(message: string, key: string): string {
        return message.replace('.', key.replace('.', ''));
    }

    private _secretKey: string = 'SECRET_KEY';

    constructor(private _httpClient: HttpClient) {
    }

    public postUser(data: AuthData): void {
        this._httpClient.post('http://localhost:3000/authorise',
            {
                'login': data.login,
                'password': data.password,
                'jwt': this.createToken(data)
            },
            {
                headers: { 'ContentType': 'application/json' }
            }).subscribe((response: any) => console.log(response));
    }

    public getToken(data: AuthData): Observable<string | null> {
        return this._httpClient
            .get<Array<{ [p: string]: string }>>(`http://localhost:3000/authorise?login=${data.login}&password=${data.password}`)
            .pipe(map((d: Array<{ [p: string]: string }>) => d.length > 0 ? d[0]['jwt'] : null));
    }

    public checkToken(token: string): Observable<boolean> {
        const [header, payload, signature]: string[] = token.split('.');
        const check: string = ServerService.hash(`${header}.${payload}`, this._secretKey);

        return new Observable<boolean>((subscriber: Subscriber<boolean>) => subscriber.next(signature === check));
    }

    private createToken(data: AuthData): string {
        const header: string = btoa(JSON.stringify({ 'alg': 'MY', 'typ': 'JWT' }));
        const payload: string = btoa(JSON.stringify(data));
        const signature: string = ServerService.hash(`${header}.${payload}`, this._secretKey);

        return `${header}.${payload}.${signature}`;
    }
}
