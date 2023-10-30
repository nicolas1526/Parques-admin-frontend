import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiciosParqueComponent } from './servicios-parque.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:ServiciosParqueComponent}])
  ]
})
export class ServiciosParqueRoutingModule { }
