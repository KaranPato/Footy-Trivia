import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from 'src/app/components/layout/main/main.component';
import { LineUpsComponent } from 'src/app/components/layout/line-ups/line-ups.component';
import { QuestionsComponent } from 'src/app/components/layout/questions/questions.component';
import { ThankYouComponent } from 'src/app/components/layout/thank-you/thank-you.component';
import { UserProfileComponent } from 'src/app/components/layout/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'line-ups', component: LineUpsComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'thank-you', component: ThankYouComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
