import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipiosComponent } from './municipios.component';
import { MunicipiosRoutingModule } from './municipios-routing.module';



@NgModule({
  declarations: [
    MunicipiosComponent
  ],
  imports: [
    CommonModule,
    MunicipiosRoutingModule
  ]
})
export class MunicipiosModule { }
