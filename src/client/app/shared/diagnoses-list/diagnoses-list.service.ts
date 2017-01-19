import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router }       from '@angular/router';
import { Location } from '@angular/common';
import { Diagnosis } from '../../home/diagnoses/Diagnosis';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/mergeMap';
/**
 * This class provides the List service with methods to read diagnoses and history.
 */
@Injectable()
export class DiagnosesListService {
  diagnosisIsDelete = new EventEmitter<boolean>();
  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http, private router: Router, private location: Location) {}

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
        data => resolve(data.patients.find((patient:any) => patient.id === id))
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
  deleteDiagnosis(id: string): Promise<any> {
    return new Promise (resolve => {
        const info = JSON.parse(localStorage.getItem('info'));
        info.diagnoses.forEach(rec => {
            if(rec.code === id) {
                rec.removed = true;
                const year = new Date().getFullYear();
                const month = new Date().getMonth() + 1;
                const date  = new Date().getDate();
                rec.removedDate = `${date}/${month}/${year}`;
            }
        });
        localStorage.setItem('info', JSON.stringify(info));
        resolve(this.diagnosisIsDelete.emit(true));
    });
  }

  handleEvent(data:any): Promise<any> {
      return new Promise (resolve => {
      if(data.type === 'edit') {
          const path = this.location.path();
          resolve(this.router.navigate([`${path}/${data.id}`]));
      }
      if(data.type === 'delete') {
         return resolve(this.deleteDiagnosis(data.id));
      }
    });
  }

  editDiagnoses(id: number): Observable<any> {
    return this.get()
        .flatMap(data => data.diagnoses)
        .find((diagnosis:Diagnosis)  => +diagnosis.code === id);
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

