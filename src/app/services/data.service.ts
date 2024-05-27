import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private variableSource = new BehaviorSubject<any>(null);
  currentVariable = this.variableSource.asObservable();


  constructor() { }

  changeVariable(variable: any) {
    this.variableSource.next(variable);
  }
}
