import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, MonoTypeOperatorFunction, Observable, Subscriber, tap } from 'rxjs';
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
            .pipe(ServerService.log<AuthDataOnServer>('На сервере создан новый пользователь:'));
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

    public getPlansIDs(token: string): Observable<number[]> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<[]>((subscriber: Subscriber<[]>) => subscriber.next([]))
                .pipe(ServerService.log<[]>(`Запрошены id планов с сервера. Токен ${token} не действителен:`));
        }

        return this._httpClient
            .get<DataOnServer[]>(`http://localhost:3000/plans?user=${ServerService.decodeTokenOnServer(token).id}`)
            .pipe(map((res: DataOnServer[]) => {
                return res.map((d: DataOnServer) => d.id);
            }))
            .pipe(ServerService.log<number[]>('Запрошены и приняты id планов с сервера:'));
    }

    public getPlan(token: string, id: number): Observable<PlanOnServer | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                .pipe(ServerService.log<null>(`Запрошен план с сервера. Токен ${token} не действителен:`));
        }

        return this.getPlansIDs(token)
            .pipe(mergeMap((res: number[]) => {
                if (res.includes(+id)) {
                    return this._httpClient
                        .get<DataOnServer>(`http://localhost:3000/plans/${id}`)
                        .pipe(ServerService.log<DataOnServer>(`Для токена ${token} запрошен план c id = ${id} с сервера:`))
                        .pipe(map((p: DataOnServer) => p.data));
                } else {
                    return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                        .pipe(ServerService.log<null>(`План с ID ${id} не принадлежит токену ${token}:`));
                }
            }));
    }

    public createPlan(token: string): Observable<number | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                .pipe(ServerService.log<null>(`Попытка создать план на сервере. Токен ${token} не действителен:`));
        }

        return this._httpClient.post<DataOnServer>('http://localhost:3000/plans',
            {
                data: new PlanOnServer(0, [], []),
                user: ServerService.decodeTokenOnServer(token).id
            },
            {
                headers: {
                    'ContentType': 'application/json'
                }
            })
            .pipe(ServerService.log<DataOnServer>(`На сервере создан новый план:`))
            .pipe(map((res: DataOnServer) => res.id));
    }

    public putPlan(token: string, id: number, plan: PlanOnServer): Observable<PlanOnServer | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                .pipe(ServerService.log<null>(`Попытка обновить план на сервере. Токен ${token} не действителен:`));
        }

        return this.getPlansIDs(token)
            .pipe(mergeMap((res: number[]) => {
                if (res.includes(+id)) {
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
                } else {
                    return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                        .pipe(ServerService.log<null>(`План с ID ${id} не принадлежит токену ${token}:`));
                }
            }));
    }

    public deletePlan(token: string, id: number): Observable<PlanOnServer | null> {
        if (!this.checkTokenOnServer(token)) {
            return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                .pipe(ServerService.log<null>(`Попытка удалить план с сервера. Токен ${token} не действителен:`));
        }

        return this.getPlansIDs(token)
            .pipe(mergeMap((res: number[]) => {
                if (res.includes(+id)) {
                    return this._httpClient
                        .delete<DataOnServer>(`http://localhost:3000/plans/${id}`)
                        .pipe(ServerService.log<DataOnServer>('С сервера удален план:'))
                        .pipe(map((p: DataOnServer) => p.data));
                } else {
                    return new Observable<null>((subscriber: Subscriber<null>) => subscriber.next(null))
                        .pipe(ServerService.log<null>(`План с ID ${id} не принадлежит токену ${token}:`));
                }
            }));
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
