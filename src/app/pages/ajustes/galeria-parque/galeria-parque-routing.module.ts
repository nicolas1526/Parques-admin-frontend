import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GaleriaParqueComponent } from './galeria-parque.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:GaleriaParqueComponent}])
    
  ]
})
export class GaleriaParqueRoutingModule { }
