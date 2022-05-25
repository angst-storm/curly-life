import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _userService: UserService, private _router: Router) {
    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this._userService.checkToken().pipe(map((check: boolean) => {
            if (!check) {
                this._router.navigate(['/user/auth']);
            }

            return check;
        }));
    }
}
