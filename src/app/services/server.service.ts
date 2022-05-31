import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { map, MonoTypeOperatorFunction, Observable, Subscriber, tap } from 'rxjs';
import { PlanOnServer } from './server.service.model/planOnServer.model';
import { AuthDataOnServer } from './server.service.model/authOnServer.model';
import { DataOnServer } from './server.service.model/dataOnServer.model';


@Injectable()
export class ServerService {
    private static decodeTokenOnServer(token: string): AuthDataOnServer {
        return JSON.parse(atob(token.split('.')[1]));
    }

    private static log<T>(msg: string): MonoTypeOperatorFunction<T> {
        return tap((res: T) => {
            console.log(msg, res);
        });
    }

    private _secretKey: string = 'SECRET_KEY';

    constructor(private _httpClient: HttpClient) {
    }

    public checkLogin(login: string): Observable<boolean> {
        return this._httpClient
            .get<AuthDataOnServer[]>(`http://localhost:3000/users?login=${login}`)
            .pipe(map((d: AuthDataOnServer[]) => d.length === 0))
            .pipe(ServerService.log<boolean>('Проверено наличие логина в базе. Логин уже в базе:'));
    }

    public postUser(data: AuthData): Observable<AuthDataOnServer> {
        return this._httpClient.post<AuthDataOnServer>('http://localhost:3000/users',
            {
                'login': data.login,
                'password': data.password
            },
            {
                headers: { 'ContentType': 'application/json' }
            })
            .pipe(ServerService.log<AuthDataOnServer>('На сервере создан новый пользователь:'))
            .pipe(tap((d: AuthDataOnServer) => {
                this._httpClient.post<DataOnServer>('http://localhost:3000/plans',
                    new DataOnServer(new PlanOnServer(0, [], []), d.id, d.id),
                    {
                        headers: { 'ContentType': 'application/json' }
                    })
                    .pipe(ServerService.log<DataOnServer>('На сервере создан новый план для пользователя:'))
                    .subscribe();
            }));
    }

    public getToken(data: AuthData): Observable<string | null> {
        return this._httpClient
            .get<AuthDataOnServer[]>(`http://localhost:3000/users?login=${data.login}&password=${data.password}`)
            .pipe(map((d: AuthDataOnServer[]) => d.length === 1 ? this.encodeTokenOnServer(d[0]) : null))
            .pipe(ServerService.log<string | null>(`Запрошен токен для пользователя ${data.login}. Токен:`));
    }

    public checkToken(token: string): Observable<boolean> {
        return new Observable<boolean>((subscriber: Subscriber<boolean>) => subscriber.next(this.checkTokenOnServer(token)))
            .pipe(ServerService.log<boolean>(`Проверен на подлинность токен ${token}. Токен подлинный:`));
    }

    public getPlans(token: string): Observable<{ [id: number]: PlanOnServer }> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<[]>((subscriber: Subscriber<[]>) => subscriber.next([]))
                .pipe(ServerService.log<[]>(`Запрошены планы с сервера. Токен ${token} не действителен:`));
        }

        return this._httpClient
            .get<DataOnServer[]>(`http://localhost:3000/plans?user=${ServerService.decodeTokenOnServer(token).id}`)
            .pipe(ServerService.log<DataOnServer[]>('Запрошены и приняты планы с сервера:'))
            .pipe(map((res: DataOnServer[]) => {
                const dict: { [id: number]: PlanOnServer } = {};
                res.forEach((d: DataOnServer) => dict[d.id] = d.data);

                return dict;
            }));
    }

    public getPlan(token: string, id: number): Observable<PlanOnServer | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                .pipe(ServerService.log<null>(`Запрошен план с сервера. Токен ${token} не действителен:`));
        }

        return this._httpClient
            .get<DataOnServer>(`http://localhost:3000/plans/${id}`)
            .pipe(ServerService.log<DataOnServer>('Запрошен и принят план с сервера:'))
            .pipe(map((p: DataOnServer) => p.data));
    }

    public putPlan(token: string, id: number, plan: PlanOnServer): Observable<PlanOnServer | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                .pipe(ServerService.log<null>(`Попытка обновить план на сервере. Токен ${token} не действителен:`));
        }

        return this._httpClient
            .put<DataOnServer>(`http://localhost:3000/plans/${id}`,
                {
                    data: plan,
                    user: ServerService.decodeTokenOnServer(token).id
                },
                {
                    headers: { 'ContentType': 'application/json' }
                })
            .pipe(ServerService.log<DataOnServer>('Обновлен план на сервере:'))
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
