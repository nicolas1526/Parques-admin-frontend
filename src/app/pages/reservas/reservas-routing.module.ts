import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'mantenimiento',
            data: { breadcrumb: 'Mantenimiento' },
            loadChildren: () =>
                import('./mantenimiento/mantenimiento.module').then(
                    (m) => m.MantenimientoModule
                ),
        },
        { path: '**', redirectTo: '/notfound' },
    ])
  ],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
