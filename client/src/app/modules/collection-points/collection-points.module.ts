import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPointsListComponent } from './components/collection-points-list/collection-points-list.component';
import { CollectionPointsRoutingModule } from './collection-points-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbAlertModule, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { CollectionPointsFormComponent } from './components/collection-points-form/collection-points-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CollectPointActionCellComponent } from './components/collect-point-action-cell/collect-point-action-cell.component';
import { CollectPointActionDeleteComponent } from './components/collect-point-action-delete/collect-point-action-delete.component';
import { FieldControlErrorComponent } from './components/field-control-error/field-control-error.component';

@NgModule({
  declarations: [
    CollectionPointsListComponent,
    CollectionPointsFormComponent,
    CollectPointActionCellComponent,
    CollectPointActionDeleteComponent,
    FieldControlErrorComponent
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
