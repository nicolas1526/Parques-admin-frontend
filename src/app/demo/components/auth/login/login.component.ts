import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit,OnDestroy{

    valCheck: string[] = ['remember'];
    isUserLoggetIn:boolean = false;
    private readonly _destroy = new Subject<void>();
    password!: string;

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig:MsalGuardConfiguration,
        private msalBroadCastService:MsalBroadcastService,
        private authService:MsalService
    ) { }
    ngOnDestroy(): void {
        this._destroy.next(undefined);
        this._destroy.complete();
    }

    ngOnInit(): void {
        this.msalBroadCastService.inProgress$.pipe(
            filter((interactionStatus:InteractionStatus) => 
                interactionStatus == InteractionStatus.None
            ),
            takeUntil(this._destroy)
        ).subscribe(x => {
            this.isUserLoggetIn = this.authService.instance.getAllAccounts().length>0
        })
    }

    

    login(){
        if(this.msalGuardConfig.authRequest){
            this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
        }else{
            this.authService.loginRedirect();
        }
    }

    logout(){
        this.authService.loginRedirect();
    }
   
}
