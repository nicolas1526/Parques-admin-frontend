import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HorarioComponent } from './horario.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:HorarioComponent}])
    
  ]
})
export class HorarioRoutingModule { }
