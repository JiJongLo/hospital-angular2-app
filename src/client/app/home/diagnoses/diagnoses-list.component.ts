import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { DiagnosesListService } from '../../shared/index';
import { Diagnosis } from './Diagnosis';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'diagnoses-list',
    templateUrl: 'diagnoses-list.component.html',
    styleUrls: ['diagnoses-list.component.css'],
})

export class DiagnosesListComponent implements OnInit{
  diagnoses: Diagnosis[] = [];
  dataCurrentDiagnoses : any = {
    title : 'Current Diagnoses',
    records : [],
    buttons: [{name : 'edit', className : 'edit', link : 'edit'}, {name : 'delete', className : 'delete', link : 'delete'}]
  };
  dataHistoryDiagnoses : any = {
    title : 'Diagnoses History',
    records : []
  };

  constructor(
    private diagnosesListService: DiagnosesListService,
    private location: Location
  ) {}
  ngOnInit(): void {
    const id = +this.location.path().split('/')[2];
    this.diagnosesListService.getDiagnoses(id)
      .then(data => {
        this.diagnoses = data;
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
}

