import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:MantenimientoComponent}])
  ]
})
export class MantenimientoRoutingModule { }
