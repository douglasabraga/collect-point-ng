import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPointsListComponent } from './components/collection-points-list/collection-points-list.component';
import { CollectionPointsRoutingModule } from './collection-points-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';



@NgModule({
  declarations: [
    CollectionPointsListComponent
  ],
  imports: [
    CommonModule,
    CollectionPointsRoutingModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    Ng2SmartTableModule,
  ]
})
export class CollectionPointsModule { }
