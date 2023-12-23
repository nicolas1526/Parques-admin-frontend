import { Injectable } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private authService: MsalService, private broadcastService: MsalBroadcastService) {}

  login() {
    this.authService.loginPopup();
  }

  logout() {
    this.authService.logout();
  }
}
