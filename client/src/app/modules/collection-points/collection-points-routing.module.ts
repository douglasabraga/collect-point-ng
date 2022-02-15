import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionPointsListComponent } from './components/collection-points-list/collection-points-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: CollectionPointsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionPointsRoutingModule { }
