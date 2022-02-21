import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectPointListComponent } from './components/collect-point-list/collect-point-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: CollectPointListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectPointRoutingModule { }
