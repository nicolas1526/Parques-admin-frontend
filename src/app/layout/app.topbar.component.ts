import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AccountInfo, EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { error } from 'console';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    isUserLoggetIn: boolean = false;
    user: AccountInfo[] = [];
    private readonly _destroy = new Subject<void>();

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private msalBroadCastService: MsalBroadcastService,
        private authService: MsalService,
        public layoutService: LayoutService
    ) { }

    ngOnDestroy(): void {
        this._destroy.next(undefined);
        this._destroy.complete();
    }

    ngOnInit(): void {

        this.msalBroadCastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
                takeUntil(this._destroy)
            )
            .subscribe((result) => {
                this.user = this.authService.instance.getAllAccounts()
                this.isUserLoggetIn = this.user.length > 0;
            });

        this.msalBroadCastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => { console.log(status); return true }),
                takeUntil(this._destroy)
            )
            .subscribe(() => {
                this.user = this.authService.instance.getAllAccounts()
                this.isUserLoggetIn = this.user.length > 0;
            });
    }



    logout() {
        this.authService.logoutRedirect({ postLogoutRedirectUri: "http://localhost:4200/#/login" });
        localStorage.removeItem("token")
    }
}
