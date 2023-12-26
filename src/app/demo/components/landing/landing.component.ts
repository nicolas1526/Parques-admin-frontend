import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { EventType, AccountInfo, EventMessage, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit{

    isUserLoggetIn: boolean = false;
    user: AccountInfo[] = [];
    private readonly _destroy = new Subject<void>();

    constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, public layoutService: LayoutService, private msalBroadCastService: MsalBroadcastService,
        private authService: MsalService, public router: Router) { }


    ngOnInit(): void {

        this.msalBroadCastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
                takeUntil(this._destroy)
            )
            .subscribe((result) => {
                this.user = this.authService.instance.getAllAccounts()
                if(this.user.length > 0){
                    this.router.navigate(['/']);
                }
            });

        this.msalBroadCastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => { console.log(status); return true }),
                takeUntil(this._destroy)
            )
            .subscribe(() => {
                this.user = this.authService.instance.getAllAccounts()
                if(this.user.length > 0){
                    this.router.navigate(['/']);
                }
            });
    }

    login() {
        console.log("Holas")
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest).subscribe((data) => console.log(data));
        } else {
            this.authService.loginRedirect().subscribe((data) => console.log(data));
        }
    }

}
