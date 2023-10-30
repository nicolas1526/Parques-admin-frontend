import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TipoServicioComponent } from './tipo-servicio.component';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forChild([{ path: '', component: TipoServicioComponent }]),
    ],
})
export class TipoServicioRoutingModule {}
