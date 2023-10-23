import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InformateComponent } from './informate.component';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{path:'',component:InformateComponent}])
  ]
})
export class InformateRoutingModule { }
