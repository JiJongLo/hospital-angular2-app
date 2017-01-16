import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Diagnosis } from '../../home/diagnoses/Diagnosis';
import 'rxjs/add/operator/do';  // for debugging
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/filter';
/**
 * This class provides the List service with methods to read diagnoses and history.
 */
@Injectable()
export class DiagnosesListService {
  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<any> {
    if (localStorage && localStorage.getItem('info')) {
      return Observable.create((observer:any) => observer.next(JSON.parse(localStorage.getItem('info'))));
    }
    return this.http.get('/assets/data.json')
                    .map((res: Response) => res.json())
                    .do(data => {
                      if (localStorage) {
                        localStorage.setItem('info', JSON.stringify(data));
                      }
                    })
                    .catch(this.handleError);
  }
  getPatient(id: number): Promise<any> {
    return new Promise (resolve => {
      this.get().subscribe(
        data => {
          return resolve(data.patients.find((patient:any) => patient.id === id));
        }
      );
    });
  }
  getDiagnoses(id: number): Promise<any> {
    return new Promise (resolve => {
      this.get().subscribe(
        data => resolve(data.diagnoses.filter((diagnosis:Diagnosis)  => diagnosis.patientId === id))
      );
    });
  }
  getCurrentDiagnosis(id: number): Promise<any> {
    return new Promise (resolve => {
      this.get().subscribe(
        data => {
          const filteredDiagnoses = data.diagnoses.filter((diagnosis:Diagnosis)  => diagnosis.patientId === id);
          const currentPatient = data.patients.find((patient:any) => patient.id === id);
          return resolve({diagnoses : filteredDiagnoses, patient : currentPatient});
        }
      );
    });
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a r
    // eal world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

