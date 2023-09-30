import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { LayoutComponent } from '../components/layout/layout.component';

const routes: Routes = [
  {
    path: 'questionnaires',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class QuestionnairesRoutingModule { }
