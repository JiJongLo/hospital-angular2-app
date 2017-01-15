import { Component, OnInit, Input } from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'patient-info',
  templateUrl: 'patient-info.component.html',
  styleUrls: ['patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  @Input() nameOfPatient: string = ' ';
  @Input() birthday: string = ' ';
  @Input() fullAddress: string = ' ';
  ngOnInit() {
    // ...
  }
}
