import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PatientInfoComponent } from './right-panel/index';
import { DiagnosesListComponent, DiagnosisEditComponent, DiagnosesContainerComponent } from './diagnoses/index';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DiagnosesListService } from '../shared/diagnoses-list/index';
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, MaterialModule.forRoot()],
  declarations: [HomeComponent,
    PatientInfoComponent,
    DiagnosesListComponent,
    DiagnosesContainerComponent,
    DiagnosisEditComponent
  ],
  exports: [HomeComponent],
  providers: [DiagnosesListService]
})
export class HomeModule { }
