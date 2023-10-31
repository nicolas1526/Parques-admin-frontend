import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservaComponent } from './reserva.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:ReservaComponent}])
  ]
})
export class ReservaRoutingModule { }
