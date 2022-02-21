import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/collectionPoints/list', pathMatch: 'full' },
  {
    path: 'collectionPoints',
    loadChildren: () => import('./modules/collect-point/collect-point.module')
      .then(m => m.CollectPointModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
