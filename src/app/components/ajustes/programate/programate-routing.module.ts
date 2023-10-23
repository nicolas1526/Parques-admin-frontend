import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgramateComponent } from './programate.component';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([{ path: '', component: ProgramateComponent }]),
    ],
})
export class ProgramateRoutingModule {}
