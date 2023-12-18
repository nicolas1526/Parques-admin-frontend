import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private router: Router) {}

    public login(token: string): void {
        localStorage.setItem('token', token);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if(token && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }
        return false;
    }

    public hasAnyRequiredRole(requiredRoles: string[]): boolean {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const userRoles = (decodedToken?.roles as string[]) || [];
            return userRoles.some((role) => requiredRoles.includes(role));
        }
        return false;
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
