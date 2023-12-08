import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetalleReservasComponent } from './detalle-reservas.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:DetalleReservasComponent}])
  ]
})
export class DetalleReservasRoutingModule { }
