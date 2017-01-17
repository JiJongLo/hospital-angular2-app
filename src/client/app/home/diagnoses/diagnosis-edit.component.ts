import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Diagnosis } from './Diagnosis';
import { DiagnosesListService } from '../../shared/index';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'diagnoses-edit',
    templateUrl: 'diagnosis-edit.component.html',
    styleUrls: ['diagnosis-edit.component.css'],
})
export class DiagnosisEditComponent implements OnInit {
    currentDiagnosis: Diagnosis;
    constructor(
        private diagnosesListService: DiagnosesListService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    ngOnInit(): void {
      const id = +this.location.path().split('/')[2];
      this.diagnosesListService.getCurrentDiagnosis(id)
            .then(data => console.log(data));
    }
}
