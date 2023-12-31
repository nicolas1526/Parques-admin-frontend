import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthApiService } from '../auth/auth.service';
import { MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService: MsalService, private authApiService: AuthApiService) { }


    verificarRol(roles: number[], rolesId: number[]): boolean {
        return roles.some((num) => rolesId.includes(num));
    }

    async mostrarItems() {
        if (this.authService.instance.getAllAccounts().length > 0) {
            const account = this.authService.instance.getAllAccounts()[0];
            const accessTokenRequest = {
                scopes: ["user.read"],
                account: account,
            };

            try {
                const accessTokenResponse = await this.authService.instance.acquireTokenSilent(accessTokenRequest);
                const token = accessTokenResponse.idToken;
                const data = await this.authApiService.getUsuario(token).toPromise();
                if (data) {
                    const rolesId = data
                        .filter((element) => element.id !== undefined)
                        .map((element) => element.id) as number[];
                    localStorage.removeItem("token");
                    localStorage.setItem("token", JSON.stringify(token));
                    this.model = [
                        {
                            label: 'Home',
                            items: [
                                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                                {
                                    label: 'Ajustes',
                                    icon: 'pi pi-fw pi-wrench',
                                    items: [
                                        {
                                            label: 'General',
                                            items: [
                                                { label: 'PopUp', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/popup'] },
                                                { label: 'Slider', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/slider'] },
                                                { label: 'Bancos', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/bancos'] },
                                                { label: 'Informate', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/informate'] },
                                                { label: 'Programate', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/programate'] },
                                                { label: 'Galeria destacada', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/galeria-destacada'] },
                                            ]
                                        },
                                        {
                                            label: 'Parques',
                                            items: [
                                                { label: 'Parques', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/parques'] },
                                                { label: 'Galerias', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/galeria-parques'] },
                                                { label: 'Horarios', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/horarios'] },
                                            ]
                                        },
                                        {
                                            label: 'Servicios',
                                            items: [
                                                { label: 'Servicios', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/servicios'] },
                                                { label: 'Servicios del parque', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/servicios-parque'] },
                                                { label: 'Tipo de servicios', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/tipo-servicios'] },
                                            ]
                                        },
                                        {
                                            label: 'Departamentos y municipios',
                                            items: [
                                                { label: 'Departamentos', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/departamentos'] },
                                                { label: 'Municipios', icon: 'pi pi-fw pi-home', routerLink: ['/ajustes/municipios'] },
                                            ]
                                        },



                                    ]
                                },
                                {
                                    label: 'Reservas',
                                    icon: 'pi pi-fw pi-wrench',
                                    items: [
                                        {
                                            label: 'Mantenimiento',
                                            routerLink: ['/reservas/mantenimiento'],
                                            visible: this.verificarRol([1, 2], rolesId)
                                        },
                                        {
                                            label: 'Reserva',
                                            routerLink: ['/reservas/reserva']
                                        },
                                        {
                                            label: 'Listado de reservas',
                                            routerLink: ['/reservas/listado-reservas']
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }



            } catch (error) {
                console.log(error)
            }
        }
    }

    ngOnInit() {
        this.mostrarItems()

        /*
                    {
                        label: 'UI Components',
                        items: [
        
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                            { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                            { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                            { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                            { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                        ]
                    },
                    {
                        label: 'Prime Blocks',
                        items: [
                            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                            { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                        ]
                    },
                    {
                        label: 'Utilities',
                        items: [
                            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                            { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                        ]
                    },
                    {
                        label: 'Pages',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Landing',
                                icon: 'pi pi-fw pi-globe',
                                routerLink: ['/landing']
                            },
                            {
                                label: 'Auth',
                                icon: 'pi pi-fw pi-user',
                                items: [
                                    {
                                        label: 'Login',
                                        icon: 'pi pi-fw pi-sign-in',
                                        routerLink: ['/auth/login']
                                    },
                                    {
                                        label: 'Error',
                                        icon: 'pi pi-fw pi-times-circle',
                                        routerLink: ['/auth/error']
                                    },
                                    {
                                        label: 'Access Denied',
                                        icon: 'pi pi-fw pi-lock',
                                        routerLink: ['/auth/access']
                                    }
                                ]
                            },
                            {
                                label: 'Crud',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/pages/crud']
                            },
                            {
                                label: 'Timeline',
                                icon: 'pi pi-fw pi-calendar',
                                routerLink: ['/pages/timeline']
                            },
                            {
                                label: 'Not Found',
                                icon: 'pi pi-fw pi-exclamation-circle',
                                routerLink: ['/notfound']
                            },
                            {
                                label: 'Empty',
                                icon: 'pi pi-fw pi-circle-off',
                                routerLink: ['/pages/empty']
                            },
                        ]
                    },
                    {
                        label: 'Hierarchy',
                        items: [
                            {
                                label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                    {
                                        label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                        ]
                                    },
                                ]
                            },
                            {
                                label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                    {
                                        label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Get Started',
                        items: [
                            {
                                label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                            },
                            {
                                label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                            }
                        ]
                    }*/

    }
}
