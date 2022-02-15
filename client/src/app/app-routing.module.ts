import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/collectionPoints/list', pathMatch: 'full' },
  {
    path: 'collectionPoints',
    loadChildren: () => import('./modules/collection-points/collection-points.module')
      .then(m => m.CollectionPointsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
