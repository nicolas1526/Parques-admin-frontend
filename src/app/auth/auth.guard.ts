import { Injectable } from '@angular/core';
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
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const requiredRoles = (route.data as { requiredRoles: string[] })
            .requiredRoles;
        if (
            this.authService.isAuthenticated() &&
            this.authService.hasAnyRequiredRole(requiredRoles)
        ) {
            return true; // Permite la navegación
        } else {
            this.router.navigate(['/notfound']);
            return false; // Impide la navegación
        }
    }
}
