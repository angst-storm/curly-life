import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subscriber } from 'rxjs';
import { PlanOnServer } from './server.service.model/planOnServer.model';
import { AuthDataOnServer } from './server.service.model/authOnServer.model';
import { DataOnServer } from './server.service.model/dataOnServer.model';


@Injectable()
export class ServerService {
    private static decodeTokenOnServer(token: string): AuthDataOnServer {
        return JSON.parse(atob(token.split('.')[1]));
    }

    private _secretKey: string = 'SECRET_KEY';

    constructor(private _httpClient: HttpClient) {
    }

    public checkLogin(login: string): Observable<boolean> {
        return this._httpClient
            .get<AuthDataOnServer[]>(`http://localhost:3000/users?login=${login}`)
            .pipe(map((d: AuthDataOnServer[]) => d.length === 0));
    }

    public postUser(data: AuthData): Observable<AuthDataOnServer> {
        return this._httpClient.post<AuthDataOnServer>('http://localhost:3000/users',
            {
                'login': data.login,
                'password': data.password
            },
            {
                headers: { 'ContentType': 'application/json' }
            }).pipe(map((d: AuthDataOnServer): AuthDataOnServer => {
            this._httpClient.post('http://localhost:3000/plans',
                {
                    data: new PlanOnServer(0, [], []),
                    id: d.id
                },
                {
                    headers: { 'ContentType': 'application/json' }
                }).subscribe((res: object) => console.log(res));

            return d;
        }));
    }

    public getToken(data: AuthData): Observable<string | null> {
        return this._httpClient
            .get<AuthDataOnServer[]>(`http://localhost:3000/users?login=${data.login}&password=${data.password}`)
            .pipe(map((d: AuthDataOnServer[]) => d.length === 1 ? this.encodeTokenOnServer(d[0]) : null));
    }

    public checkToken(token: string): Observable<boolean> {
        return new Observable<boolean>((subscriber: Subscriber<boolean>) => subscriber.next(this.checkTokenOnServer(token)));
    }

    public getPlan(token: string): Observable<PlanOnServer | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null));
        }

        return this._httpClient
            .get<DataOnServer>(`http://localhost:3000/plans/${ServerService.decodeTokenOnServer(token).id}`)
            .pipe(map((p: DataOnServer) => p.data));
    }

    public putPlan(token: string, plan: PlanOnServer): Observable<PlanOnServer | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null));
        }

        return this._httpClient
            .put<DataOnServer>(`http://localhost:3000/plans/${ServerService.decodeTokenOnServer(token).id}`,
                {
                    data: plan,
                },
                {
                    headers: { 'ContentType': 'application/json' }
                })
            .pipe(map((p: DataOnServer) => p.data));
    }

    private encodeTokenOnServer(data: AuthDataOnServer): string {
        const header: string = btoa(JSON.stringify({ 'alg': 'MY', 'typ': 'JWT' }));
        const payload: string = btoa(JSON.stringify(data));
        const signature: string = this.hashOnServer(`${header}.${payload}`);

        return `${header}.${payload}.${signature}`;
    }

    private checkTokenOnServer(token: string): boolean {
        const [header, payload, signature]: string[] = token.split('.');
        const check: string = this.hashOnServer(`${header}.${payload}`);

        return signature === check;
    }

    private hashOnServer(message: string): string {
        return message.replace('.', this._secretKey.replace('.', ''));
    }
}
