import { Component,  Input }      from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'diagnoses-list',
    templateUrl: 'diagnoses-list.component.html',
    styleUrls: ['diagnoses-list.component.css'],
})
export class DiagnosesListComponent {
  @Input() dataDiagnoses: any = {};
  @Input() dataHistory: any = {};
}

