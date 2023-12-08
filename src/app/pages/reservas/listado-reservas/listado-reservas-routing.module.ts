import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListadoReservasComponent } from './listado-reservas.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:ListadoReservasComponent}])
  ]
})
export class ListadoReservasRoutingModule { }
