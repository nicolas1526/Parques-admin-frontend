import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParquesComponent } from './parques.component';

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([{ path: '', component: ParquesComponent }])],
})
export class ParquesRoutingModule {}
