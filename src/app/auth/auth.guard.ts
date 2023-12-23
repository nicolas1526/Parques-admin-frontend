import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: MsalService) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.instance.getActiveAccount() != null) {
        // El usuario está autenticado
        // Puedes realizar verificaciones adicionales aquí, como los roles del usuario
        return true;
      } else {
        // El usuario no está autenticado
        // Redirigir al inicio de sesión u otra página de acceso no autorizado
        return false;
      }
    }
}
