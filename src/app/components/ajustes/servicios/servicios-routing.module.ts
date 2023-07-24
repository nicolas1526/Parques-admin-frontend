import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiciosComponent } from './servicios.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ServiciosComponent }]),
    ],
    exports: [RouterModule],
})
export class ServiciosRoutingModule {}
