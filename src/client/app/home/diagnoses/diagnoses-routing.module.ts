import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  DiagnosisEditComponent, DiagnosesListComponent } from './index';

@NgModule({
  imports: [
    RouterModule.forChild([
      // { path: 'patients/:id/list', component: DiagnosesListComponent },
      // { path: 'patients/:id/edit', component: DiagnosisEditComponent }
    ])
  ],
  exports: [RouterModule]
})
export class DiagnosesRouterModule { }
