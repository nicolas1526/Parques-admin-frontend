import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'mantenimiento',
            data: { breadcrumb: 'Mantenimiento', requiredRoles: ['admin', 'taquilla'] },
            loadChildren: () =>
                import('./mantenimiento/mantenimiento.module').then(
                    (m) => m.MantenimientoModule
                ),
            canActivate: [AuthGuard],

        },
        {
            path: 'reserva',
            data: { breadcrumb: 'Reserva' },
            loadChildren: () =>
                import('./reserva/reserva.module').then(
                    (m) => m.ReservaModule
                ),
        },
        {
            path: 'listado-reservas',
            data: { breadcrumb: 'Listado de reservas' },
            loadChildren: () =>
                import('./listado-reservas/listado-reservas.module').then(
                    (m) => m.ListadoReservasModule
                ),
        },
        {
            path: 'detalle-reservas/:id',
            data: { breadcrumb: 'Detalle de reservas' },
            loadChildren: () =>
                import('./detalle-reservas/detalle-reservas.module').then(
                    (m) => m.DetalleReservasModule
                ),
        },
        { path: '**', redirectTo: '/notfound' },
    ])
  ],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
