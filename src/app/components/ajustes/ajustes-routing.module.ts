import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'departamentos',
                data: { breadcrumb: 'Departamentos' },
                loadChildren: () =>
                    import('./departamentos/departamentos.module').then(
                        (m) => m.DepartamentosModule
                    ),
            },
            {
                path: 'municipios',
                data: { breadcrumb: 'Municipios' },
                loadChildren: () =>
                    import('./municipios/municipios.module').then(
                        (m) => m.MunicipiosModule
                    ),
            },
            {
                path: 'tipo-servicios',
                data: { breadcrumb: 'Tipo de servicio' },
                loadChildren: () =>
                    import('./tipo-servicio/tipo-servicio.module').then(
                        (m) => m.TipoServicioModule
                    ),
            },
            {
                path: 'servicios',
                data: { breadcrumb: 'Servicios' },
                loadChildren: () =>
                    import('./servicios/servicios.module').then(
                        (m) => m.ServiciosModule
                    ),
            },
            {
                path: 'servicios-parque',
                data: { breadcrumb: 'Servicios del parques' },
                loadChildren: () =>
                    import('./servicios-parque/servicios-parque.module').then(
                        (m) => m.ServiciosParqueModule
                    ),
            },
            {
                path: 'parques',
                data: { breadcrumb: 'Parques' },
                loadChildren: () =>
                    import('./parques/parques.module').then(
                        (m) => m.ParquesModule
                    ),
            },
            {
                path: 'horarios',
                data: { breadcrumb: 'Horarios' },
                loadChildren: () =>
                    import('./horario/horario.module').then(
                        (m) => m.HorarioModule
                    ),
            },
            {
                path: 'galeria-parques',
                data: { breadcrumb: 'Galerias' },
                loadChildren: () =>
                    import('./galeria-parque/galeria-parque.module').then(
                        (m) => m.GaleriaParqueModule
                    ),
            },
            {
                path: 'informate',
                data: { breadcrumb: 'Informate' },
                loadChildren: () =>
                    import('./informate/informate.module').then(
                        (m) => m.InformateModule
                    ),
            },
            {
                path: 'slider',
                data: { breadcrumb: 'Slider' },
                loadChildren: () =>
                    import('./slider/slider.module').then(
                        (m) => m.SliderModule
                    ),
            },
            {
                path: 'programate',
                data: { breadcrumb: 'Programate' },
                loadChildren: () =>
                    import('./programate/programate.module').then(
                        (m) => m.ProgramateModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class AjustesRoutingModule {}
