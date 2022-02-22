import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectPointRoutingModule } from './collect-point-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbAlertModule, NbButtonModule, NbCardModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CollectPointActionCellComponent } from './components/collect-point-action-cell/collect-point-action-cell.component';
import { CollectPointActionDeleteComponent } from './components/collect-point-action-delete/collect-point-action-delete.component';
import { FieldControlErrorComponent } from './components/field-control-error/field-control-error.component';
import { CollectPointFormComponent } from './components/collect-point-form/collect-point-form.component';
import { CollectPointListComponent } from './components/collect-point-list/collect-point-list.component';

@NgModule({
    declarations: [
        CollectPointListComponent,
        CollectPointFormComponent,
        CollectPointActionCellComponent,
        CollectPointActionDeleteComponent,
        FieldControlErrorComponent
    ],
    imports: [
        CommonModule,
        CollectPointRoutingModule,
        NbCardModule,
        NbInputModule,
        Ng2SmartTableModule,
        NbButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forChild(),
        NbAlertModule,
        NbSpinnerModule
    ],
})
export class CollectPointModule { }
