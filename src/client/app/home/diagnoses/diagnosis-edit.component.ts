import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { NgForm }      from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DiagnosesListService } from '../../shared/index';
@Component({
    moduleId: module.id,
    selector: 'diagnoses-edit',
    templateUrl: 'diagnosis-edit.component.html',
    styleUrls: ['diagnosis-edit.component.css'],
})
export class DiagnosisEditComponent implements OnInit {
   diagnosis: any = {
     info : '',
     code : ''
   };
    constructor(
        private diagnosesListService: DiagnosesListService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.diagnosesListService.editDiagnoses(params['id']))
            .subscribe(data => {
              if (data) this.diagnosis = data;
            });
    }
    onSubmit(form:NgForm) {
        if (this.diagnosis) {
         console.log(form.value);
        } else {
           form.reset();
        }

    }
}
