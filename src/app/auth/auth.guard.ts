import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { AuthApiService } from './auth.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: MsalService, private authApiService: AuthApiService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.checkPermissions(next.data['roles'] as number[]))
      .pipe(
        switchMap(hasPermission => {
          if (hasPermission) {
            return [true];
          } else {
            this.router.navigate(['/notfound']);
            return [false];
          }
        })
      );
  }

  private async checkPermissions(roles: number[]): Promise<boolean> {
    if (this.authService.instance.getAllAccounts().length > 0) {
      const account = this.authService.instance.getAllAccounts()[0];
      const accessTokenRequest = {
        scopes: ["user.read"],
        account: account,
      };
      if(roles.includes(0)){
        return true;
      }
      try {
        const item = localStorage.getItem("token");
        if(item){
          const token = JSON.parse(item);
          const data = await this.authApiService.getUsuario(token).toPromise();
          const rolesId = data!.map((element) => element.id);
          const hasPermission = roles.some((element) => rolesId.includes(element));
          return hasPermission;
        }
        this.router.navigate(['/login']);
        return false;
      } catch (error) {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
