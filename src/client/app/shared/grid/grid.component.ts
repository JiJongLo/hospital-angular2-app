import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DiagnosesListService } from '../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'grid-data',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
})
export class GridComponent {
    @Input() records: Array<any> = [];
    @Input() columns: any = {};
    @Input() additionElements:  Array<any> = [];
    @Output() click = new EventEmitter<string>();

    constructor(
      private diagnosesListService: DiagnosesListService
    ) {}
    handle (data: any){
       this.diagnosesListService.handleEvent(data).then(
          data => {
            console.log(data)
          }
       );
    }
}
