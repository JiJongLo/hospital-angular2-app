import { Component, OnInit }      from '@angular/core';
import { NgForm }      from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DiagnosesListService } from '../diagnoses/diagnoses-list.service';
@Component({
    moduleId: module.id,
    selector: 'diagnoses-edit',
    templateUrl: 'patient-edit.component.html',
    styleUrls: ['patient-edit.component.css'],
})
export class PatientEditComponent implements OnInit {
    patient: any = {};
    constructor(
        private diagnosesListService: DiagnosesListService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void { }
    onSubmit(form:NgForm) {
        if (this.patient) {
            this.diagnosesListService.updateDiagnoses(form.value);
        } else {
            form.reset();
        }

    }
}

