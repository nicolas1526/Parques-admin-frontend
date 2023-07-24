import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MunicipiosComponent } from './municipios.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:MunicipiosComponent}])
  ]
})
export class MunicipiosRoutingModule { }
