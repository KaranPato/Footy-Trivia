import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ThankYouComponent } from '../../components/layout/thank-you/thank-you.component';
import { MainComponent } from '../../components/layout/main/main.component';
import { LineUpsComponent } from '../../components/layout/line-ups/line-ups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { QuestionsComponent } from '../../components/layout/questions/questions.component';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { FooterComponent } from 'src/app/common/components/footer/footer.component';
import { UserProfileComponent } from 'src/app/components/layout/user-profile/user-profile.component';

@NgModule({
  declarations: [
    LayoutComponent,
    QuestionsComponent,
    ThankYouComponent,
    MainComponent,
    LineUpsComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
