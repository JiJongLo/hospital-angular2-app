import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DiagnosesContainerComponent, DiagnosisEditComponent, DiagnosesListComponent } from './diagnoses/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'patients', component: HomeComponent },
      {
        path: 'patients/:id',
        component: DiagnosesContainerComponent,
        children: [
          {
            path: 'list',
            pathMatch: 'full',
            component: DiagnosesListComponent
          },
          {
            path: 'edit',
            pathMatch: 'full',
            component: DiagnosisEditComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
