import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from 'src/app/common/services/Component_Communication/communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit, OnDestroy {
  username: string;
  correctAnswers: any;
  subscription: Subscription;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');

    this.subscription = this.communicationService.currentCount$
      .subscribe(count => {
        this.correctAnswers = count;
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
