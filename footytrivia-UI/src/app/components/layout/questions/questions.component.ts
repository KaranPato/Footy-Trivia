import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../common/services/questions.service';
import { Router } from '@angular/router';
import { Questions } from 'src/app/common/models/questions';

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
    option: ''
  };

  constructor(
    private questionsService: QuestionsService,
    private router: Router
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
      this.router.navigate(['/layout/thank-you']);
    }
  }

  onSelect(event, id, option) {
    if (event.target.checked) {
      this.checkedItems = {
        id: id,
        option: option
      }
    }
  }

  saveAnswer() {
    if (this.checkedItems.id && this.checkedItems.option != '') {
      this.questionsService.saveAnswer(this.checkedItems.id, this.checkedItems.option).subscribe((response: any) => {
        console.log(response);
        if (response.length > 0) {
          if (response[0] === 'true') {
            // alert("AGUEROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO !!!");
            const index = this.questions.findIndex(x => x.id === this.checkedItems.id);
            this.questions.splice(index, 1);
            this.getSingleQuestion();
          } else {
            // alert("So close, hit the post !!!!!!!!!!!!!");
            const index = this.questions.findIndex(x => x.id === this.checkedItems.id);
            this.questions.splice(index, 1);
            this.getSingleQuestion();
          }
        }
      });
    }
  }

}
