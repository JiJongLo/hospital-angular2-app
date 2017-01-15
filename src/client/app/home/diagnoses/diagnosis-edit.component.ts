import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Diagnosis } from './Diagnosis';
import { DiagnosesListService } from '../../shared/index';
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
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.diagnosesListService.getCurrentDiagnosis(+params['id']))
            .subscribe(data => console.log(data));
    }
}
