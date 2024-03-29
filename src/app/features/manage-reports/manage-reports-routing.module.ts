import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from "@enums";
import { SurveyDetailsResolver } from "@services";
import { ReportsListComponent } from "./components/reports-list/reports-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/' + RoutesEnum.DASHBOARD
  },
  {
    path: ':' + RoutesEnum.SURVEY_ID_PARAM,
    component: ReportsListComponent,
    resolve: { surveyResolverData: SurveyDetailsResolver}
  },
  {
    path: ':' + RoutesEnum.SURVEY_ID_PARAM + '/details/:' + RoutesEnum.QUESTION_ID_PARAM,
    loadChildren: () => import('./features/survey-details/survey-details.module').then(m => m.SurveyDetailsModule),
    resolve: { surveyResolverData: SurveyDetailsResolver}
  },
  {
    path: ':' + RoutesEnum.SURVEY_ID_PARAM + '/preview',
    loadChildren: () => import('../results/results.module').then(r => r.ResultsModule),
    resolve: { surveyResolverData: SurveyDetailsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
