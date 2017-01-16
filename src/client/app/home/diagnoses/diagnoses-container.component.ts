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
  patient: any = {};
  constructor(
    private diagnosesListService: DiagnosesListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.diagnosesListService.getPatient(+params['id']))
      .subscribe(data =>  this.patient = data);
  }
  goToBack() {
    this.router.navigate(['../patients']);
  }
}

