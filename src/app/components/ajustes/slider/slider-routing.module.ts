import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider.component';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([{ path: '', component: SliderComponent }]),
    ],
    exports: [RouterModule],
})
export class SliderRoutingModule {}
