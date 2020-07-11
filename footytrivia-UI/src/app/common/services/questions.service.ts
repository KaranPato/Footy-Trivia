import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get(apiUrl + 'getQuestions');
  }

  saveAnswer(id: any, option: any) {
    return this.http.get(apiUrl + `checkAnswer/?id=${id}&answer=${option}`);
  }
}
