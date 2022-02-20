import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CollectPoint } from '../../models/collection-points';
import { CollectionPointsFormComponent } from '../collection-points-form/collection-points-form.component';

@Component({
  selector: 'app-collect-point-action-cell',
  templateUrl: './collect-point-action-cell.component.html',
  styleUrls: ['./collect-point-action-cell.component.scss']
})
export class CollectPointActionCellComponent implements OnInit {

  @Input() rowData: CollectPoint
  @Output() edit = new EventEmitter()

  dialogRef: NbDialogRef<CollectionPointsFormComponent>

  constructor(private dialogService: NbDialogService,) { }

  ngOnInit(): void {
    console.log(this.rowData)
  }

  onEdit(){
    this.edit.emit(this.rowData)
    this.showDialog()
  }

  showDialog() {
    this.dialogRef = this.dialogService.open(CollectionPointsFormComponent, {
      context: {
        collectionPoint: this.rowData,
        edit: true
      },
      hasScroll: true,
      closeOnEsc: false,
      closeOnBackdropClick: false,
    })
    //this.dialogRef.onClose.subscribe(() => this.doSearchCollectionPoints())
  }

}
