import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './popup.component';



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{ path: '', component: PopupComponent }])],
})
export class PopupRoutingModule { }
