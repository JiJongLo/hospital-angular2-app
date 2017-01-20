import { Component, OnInit } from '@angular/core';
import { DiagnosesListService } from './diagnoses/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  errorMessage: string;
  patients: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {DiagnosesListService} diagnosesListService - The injected DiagnosesListService.
   */
  constructor(public diagnosesListService: DiagnosesListService) {}

  /**
   * Get the patients OnInit
   */
  ngOnInit() {
    this.getPatients();
  }

  /**
   * Handle the diagnosesListService observable
   */
  getPatients() {
    this.diagnosesListService.get()
      .subscribe(
        data => this.patients = data.patients,
        error => this.errorMessage = <any>error
      );
  }
}
