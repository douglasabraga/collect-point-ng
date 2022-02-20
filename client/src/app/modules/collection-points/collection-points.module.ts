import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPointsListComponent } from './components/collection-points-list/collection-points-list.component';
import { CollectionPointsRoutingModule } from './collection-points-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbAlertModule, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { CollectionPointsFormComponent } from './components/collection-points-form/collection-points-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CollectPointActionCellComponent } from './components/collect-point-action-col/collect-point-action-cell.component';

@NgModule({
  declarations: [
    CollectionPointsListComponent,
    CollectionPointsFormComponent,
    CollectPointActionCellComponent
  ],
  imports: [
    CommonModule,
    CollectionPointsRoutingModule,
    NbCardModule,
    NbInputModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NbAlertModule
  ],
})
export class CollectionPointsModule { }
