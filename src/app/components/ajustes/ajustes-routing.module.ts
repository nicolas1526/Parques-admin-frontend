import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'departamentos', data: { breadcrumb: 'Departamentos' }, loadChildren: () => import('./departamentos/departamentos.module').then(m => m.DepartamentosModule) },
        { path: 'municipios', data: { breadcrumb: 'Municipios' }, loadChildren: () => import('./municipios/municipios.module').then(m => m.MunicipiosModule) },
        { path: 'servicios', data: { breadcrumb: 'Servicios' }, loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule) },
        { path: 'servicios-parque', data: { breadcrumb: 'Servicios del parques' }, loadChildren: () => import('./servicios-parque/servicios-parque.module').then(m => m.ServiciosParqueModule) },
        { path: 'parques', data: { breadcrumb: 'Parques' }, loadChildren: () => import('./parques/parques.module').then(m => m.ParquesModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AjustesRoutingModule { }
