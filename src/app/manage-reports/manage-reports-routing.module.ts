import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsListComponent} from "./components/reports-list/reports-list.component";

const routes: Routes = [
  {path: ':id', component: ReportsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
