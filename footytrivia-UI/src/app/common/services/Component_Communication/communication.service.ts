import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private countSource = new BehaviorSubject(0);
  currentCount$ = this.countSource.asObservable();

  constructor() { }

  sendCorrectAnswers(count: any) {
    this.countSource.next(count);
  }

  clearCount() {
    // this.countSource.next();
  }

  // getCount(): Observable<any> {
  //   return this.subject.asObservable();
  // }
}
