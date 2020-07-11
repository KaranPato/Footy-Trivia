import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionsService } from '../../../common/services/questions.service';
import { Router } from '@angular/router';
import { Questions, QuestionsResponse } from '../../../common/models/questions';
import { CommunicationService } from '../../../common/services/Component_Communication/communication.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Questions[] = [];
  username: string;
  singleQuestion: Questions;
  checkedItems: {
    id: '',
    option: '',
    elementId: ''
  };
  count = 0;
  isFade = false;
  isChecked = false;
  element: any;
  previousElement: any;

  constructor(
    private questionsService: QuestionsService,
    private router: Router,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');

    this.questionsService.getQuestions().subscribe((response: QuestionsResponse) => {
      if (response.status === 200) {
        this.questions = response.response;
        this.getSingleQuestion();
      }
    });
  }

  getSingleQuestion() {
    if (this.questions.length > 0) {
      this.singleQuestion = this.questions[0];
      this.previousElement = null;
    } else {
      this.communicationService.sendCorrectAnswers(this.count);
      this.checkedItems = null;
      this.router.navigate(['/layout/thank-you']);
    }
  }

  onSelect(questionId: any, option: any, elementId: any) {
    if (questionId > 0 && option !== '') {
      if (this.previousElement) {
        this.previousElement.style.color = 'white';
        this.previousElement.style.backgroundColor = '';
      }
      this.element = document.getElementById(elementId);
      if (this.element) {
        this.previousElement = this.element;
        this.element.style.color = 'white';
        this.element.style.backgroundColor = 'skyblue';
      }
      this.isFade = false;
      this.checkedItems = {
        id: questionId,
        option: option,
        elementId: elementId
      };
    }
  }

  checkAnswer() {
    if (this.checkedItems) {
      this.isFade = true;
      if (this.checkedItems.id && this.checkedItems.option !== '') {
        this.questionsService.saveAnswer(this.checkedItems.id, this.checkedItems.option).subscribe((response: any) => {
          if (response.status === 200) {
            if (response.response[0] === 'true') {
              this.count++;
            }
            this.checkAnswerClass(response.response[0]);
          }
        });
      }
    } else {
      alert('Score at least one goal!!!');
      return;
    }
  }

  nextQues() {
    this.isFade = true;
    this.isChecked = false;
    this.element.removeAttribute('style');
    const index = this.questions.findIndex(x => x.id === this.checkedItems.id);
    this.questions.splice(index, 1);
    this.getSingleQuestion();
  }

  checkAnswerClass(status: string) {
    this.element = document.getElementById(this.checkedItems.elementId);
    if (this.element) {
      this.element.style.backgroundColor = '';
      this.element.style.color = 'white';
    }
    this.isChecked = true;
    if (status === 'true') {
      this.element.style.backgroundColor = 'green';
    } else {
      this.element.style.backgroundColor = '#C72333';
    }

  }

  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/audio/alarm.wav';
    audio.load();
    audio.play();
  }

}
