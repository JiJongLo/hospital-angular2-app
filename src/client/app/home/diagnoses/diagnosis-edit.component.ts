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
   diagnosis: Diagnosis;
    constructor(
        private diagnosesListService: DiagnosesListService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.diagnosesListService.editDiagnoses(+params['id']))
            .subscribe(data => {
                this.diagnosis = data;
                console.log(this.diagnosis);
            });
    }
}
