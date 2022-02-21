import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CollectPoint } from '../../models/collection-points';
import { CollectPointActionDeleteComponent } from '../collect-point-action-delete/collect-point-action-delete.component';
import { CollectionPointsFormComponent } from '../collection-points-form/collection-points-form.component';

@Component({
  selector: 'app-collect-point-action-cell',
  templateUrl: './collect-point-action-cell.component.html',
  styleUrls: ['./collect-point-action-cell.component.scss']
})
export class CollectPointActionCellComponent implements OnInit {

  @Input() rowData: CollectPoint
  @Output() edit = new EventEmitter<boolean>()

  dialogRef: NbDialogRef<CollectionPointsFormComponent | CollectPointActionDeleteComponent>

  constructor(private dialogService: NbDialogService,) { }

  ngOnInit(): void {
    //console.log(this.rowData)
  }

  onEdit(){
    this.showDialogEdit()
  }

  showDialogEdit() {
    this.dialogRef = this.dialogService.open(CollectionPointsFormComponent, {
      context: {
        collectionPoint: this.rowData,
        edit: true
      },
      hasScroll: true,
      closeOnEsc: false,
      closeOnBackdropClick: false,
    })
    this.dialogRef.onClose.subscribe({next: next => this.edit.emit(next)})
  }

  showDialogDelete() {
    this.dialogRef = this.dialogService.open(CollectPointActionDeleteComponent, {
      context: {
        idCollectPoint: this.rowData.id,
      },
      hasScroll: true,
      closeOnEsc: false,
      closeOnBackdropClick: false,
    })
    this.dialogRef.onClose.subscribe({next: next => this.edit.emit(next)})
  }

}
