import { Component, Input, OnInit } from '@angular/core';
import { DiagnosesListService } from '../diagnoses/diagnoses-list.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'patient-info',
  templateUrl: 'patient-info.component.html',
  styleUrls: ['patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  @Input() nameOfPatient: string = ' ';
  @Input() birthday: string = ' ';
  @Input() id: number;
  @Input() fullAddress: string = ' ';
  constructor(private diagnosesListService: DiagnosesListService, private router: Router) {}
  ngOnInit(): void {
    this.diagnosesListService.patientIsChanged.subscribe(
        data => {
          this.nameOfPatient = data.name;
          this.birthday = data.birthday;
          this.fullAddress = data.fullAddress;
        }
    )
  }
  handle(id : number) {
      this.diagnosesListService.editPatient(id).subscribe(
          data =>  this.router.navigate([`patients/${id}/add`],  data)
      );
  };
}
