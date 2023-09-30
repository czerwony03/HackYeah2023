import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestionnairesRoutingModule } from './questionnaires-routing.module';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    QuestionnairesRoutingModule,
  ]
})
export class QuestionnairesModule { }
