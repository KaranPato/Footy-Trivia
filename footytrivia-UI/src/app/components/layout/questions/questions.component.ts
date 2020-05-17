import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../common/services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];
  username: string;
  singleQuestion: string;
  checkedItems: {
    id: '',
    option: ''
  };

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');

    this.questionsService.getQuestions().subscribe((response: any) => {
      if (response.length > 0) {
        this.questions = response;
        this.getSingleQuestion(0);
      }
    })
  }

  getSingleQuestion(index: number) {
    this.singleQuestion = this.questions[index];
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
      });
    }
  }

}
