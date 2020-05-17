import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { QuestionsComponent } from '../../components/layout/questions/questions.component';
import { ThankYouComponent } from 'src/app/components/layout/thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'questions', component: QuestionsComponent },
      { path: 'thank-you', component: ThankYouComponent },
      { path: '', redirectTo: 'questions', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
