import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionsService } from '../../../common/services/questions.service';
import { Router } from '@angular/router';
import { Questions } from 'src/app/common/models/questions';
import { CommunicationService } from 'src/app/common/services/Component_Communication/communication.service';

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
  count: number = 0;
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

    this.questionsService.getQuestions().subscribe((response: Questions[]) => {
      if (response.length > 0) {
        this.questions = response;
        this.getSingleQuestion();
      }
    })
  }

  getSingleQuestion() {
    if (this.questions.length > 0) {
      this.singleQuestion = this.questions[0];
    } else {
      this.communicationService.sendCorrectAnswers(this.count);
      this.checkedItems = null;
      this.router.navigate(['/thank-you']);
    }
  }

  onSelect(questionId: any, option: any, elementId: any) {
    if (questionId > 0 && option != '') {
      if (this.previousElement) {
        this.element.style.color = '#007BFF';
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
      }
    }
  }

  checkAnswer() {
    if (this.checkedItems) {
      this.isFade = true;
      if (this.checkedItems.id && this.checkedItems.option != '') {
        this.questionsService.saveAnswer(this.checkedItems.id, this.checkedItems.option).subscribe((response: any) => {
          if (response.length > 0) {
            if (response[0] === 'true') {
              this.count++;
            }
            this.checkAnswerClass(response[0]);
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
    this.element.removeAttribute("style");
    const index = this.questions.findIndex(x => x.id === this.checkedItems.id);
    this.questions.splice(index, 1);
    this.getSingleQuestion();
  }

  checkAnswerClass(status: string) {
    this.element = document.getElementById(this.checkedItems.elementId);
    if (this.element) {
      this.element.style.backgroundColor = "";
      this.element.style.color = "white";
    }
    this.isChecked = true;
    if (status === 'true')
      this.element.style.backgroundColor = "green";
    else
      this.element.style.backgroundColor = "red";
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/alarm.wav";
    audio.load();
    audio.play();
  }

}
