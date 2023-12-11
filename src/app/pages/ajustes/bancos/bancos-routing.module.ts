import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BancosComponent } from './bancos.component';


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{ path: '', component: BancosComponent }])],
})
export class BancosRoutingModule { }
