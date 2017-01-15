import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Diagnosis } from './Diagnosis';
import { DiagnosesListService } from '../../shared/index';
@Component({
  moduleId: module.id,
  selector: 'diagnoses-container',
  templateUrl: 'diagnoses-container.component.html',
  styleUrls: ['diagnoses-container.component.css'],
})
export class DiagnosesContainerComponent implements OnInit {
  diagnoses:Diagnosis[] = [];
  dataCurrentDiagnoses : any = {
    title : 'Current Diagnoses',
    records : [],
    buttons: [{name : 'edit', color : 'white'}, {name : 'delete', color: 'red'}]
  };
  dataHistoryDiagnoses : any = {
    title : 'Diagnoses History',
    records : []
  };
  patient: any = {};
  constructor(
    private diagnosesListService: DiagnosesListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.diagnosesListService.getDiagnoses(+params['id']))
      .subscribe(data => {
        this.diagnoses = data.diagnoses;
        this.patient = data.patient;
        this.dataCurrentDiagnoses.records = this.diagnoses.filter(diagnosis => diagnosis.removed === false);
        this.dataCurrentDiagnoses.columns = [
          {title : 'Code', name : 'code'},
          {title : 'Diagnosis', name : 'info'},
          {title : 'Addition Date', name : 'addedDate'}
        ];
        this.dataHistoryDiagnoses.records = this.diagnoses.filter(diagnosis => diagnosis.removed === true);
        this.dataHistoryDiagnoses.columns = [
          {title : 'Code', name : 'code'},
          {title : 'Diagnosis', name : 'info'},
          {title : 'Addition Date', name : 'addedDate'},
          {title : 'Removal Date', name : 'removedDate'}
        ];
      });
  }
  goToBack() {
    this.router.navigate(['../patients']);
  }
}

