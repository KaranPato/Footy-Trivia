import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {QuestionsComponent} from '../../components/layout/questions/questions.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ThankYouComponent } from 'src/app/components/layout/thank-you/thank-you.component';

@NgModule({
  declarations: [
    LayoutComponent,
    QuestionsComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
