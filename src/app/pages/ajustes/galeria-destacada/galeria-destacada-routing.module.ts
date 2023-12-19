import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GaleriaDestacadaComponent } from './galeria-destacada.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{ path: '', component: GaleriaDestacadaComponent }])],
})
export class GaleriaDestacadaRoutingModule { }
