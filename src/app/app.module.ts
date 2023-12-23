import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AzureAdDemoService } from './azure-ad-demo.service';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string): void {
    console.log(message);
  }
  
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        MsalModule.forRoot(new PublicClientApplication({ // MSAL Configuration
            auth: {
                clientId: "a76c3213-ad5c-4899-b597-c7a9b14fd02d",
                authority: "https://login.microsoftonline.com/b89ff380-d78e-44f3-a717-167f8aec1955",
                redirectUri: "http://localhost:4200",
            },
            cache: {
                cacheLocation: BrowserCacheLocation.SessionStorage,
                storeAuthStateInCookie: isIE, // set to true for IE 11
            },
            system: {
                loggerOptions: {
                  loggerCallback,
                  logLevel: LogLevel.Info,
                  piiLoggingEnabled: false
                }
              }
        }), {
            interactionType: InteractionType.Redirect,
            authRequest: {
                scopes: ['user.read']
            }
        }, {
            interactionType: InteractionType.Redirect,
            protectedResourceMap: new Map([
                ['https://graph.microsoft.com/v1.0/me', ['user.read']],
            ]),
        })
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }, 
        { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi:true},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        MsalGuard,AzureAdDemoService
    ],
    bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
