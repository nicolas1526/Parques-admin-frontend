import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartamentosComponent } from './departamentos.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:DepartamentosComponent}])
  ]
})
export class DepartamentosRoutingModule { }
