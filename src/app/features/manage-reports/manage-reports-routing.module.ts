import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from "@enums";
import { SurveyResolver } from "@services";
import { ReportsListComponent } from "./components/reports-list/reports-list.component";

const routes: Routes = [
  {
    path: ':' + RoutesEnum.SURVEY_ID_PARAM,
    component: ReportsListComponent,
    resolve: { surveyResolverData: SurveyResolver}
  },
  {
    path: ':' + RoutesEnum.SURVEY_ID_PARAM + '/details/:' + RoutesEnum.QUESTION_ID_PARAM,
    loadChildren: () => import('./features/survey-details/survey-details.module').then(m => m.SurveyDetailsModule),
    resolve: { surveyResolverData: SurveyResolver}
  },
  {
    path: ':' + RoutesEnum.SURVEY_ID_PARAM + '/preview',
    loadChildren: () => import('../results/results.module').then(r => r.ResultsModule),
    resolve: { surveyResolverData: SurveyResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }