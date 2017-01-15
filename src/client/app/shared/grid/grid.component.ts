import { Component, Input } from '@angular/core';
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
}
