import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CollectPoint } from '../../models/collect-point';
import { CollectPointActionDeleteComponent } from '../collect-point-action-delete/collect-point-action-delete.component';
import { CollectPointFormComponent } from '../collect-point-form/collect-point-form.component';

@Component({
  selector: 'app-collect-point-action-cell',
  templateUrl: './collect-point-action-cell.component.html',
  styleUrls: ['./collect-point-action-cell.component.scss']
})
export class CollectPointActionCellComponent {

  @Input() rowData: CollectPoint
  @Output() isToSearch = new EventEmitter<boolean>()
  dialogRef: NbDialogRef<CollectPointFormComponent | CollectPointActionDeleteComponent>

  constructor(private dialogService: NbDialogService) { }

  showDialogEdit() {
    this.dialogRef = this.dialogService.open(CollectPointFormComponent, {
      context: {
        collectionPoint: this.rowData,
        edit: true
      },
      closeOnEsc: false,
      closeOnBackdropClick: false
    })
    this.dialogRef.onClose.subscribe(
      isToSearch => this.isToSearch.emit(isToSearch)
    )
  }

  showDialogDelete() {
    this.dialogRef = this.dialogService.open(CollectPointActionDeleteComponent, {
      context: {
        idCollectPoint: this.rowData.id
      },
      closeOnEsc: false,
      closeOnBackdropClick: false
    })
    this.dialogRef.onClose.subscribe(
      isToSearch => this.isToSearch.emit(isToSearch)
    )
  }

}
