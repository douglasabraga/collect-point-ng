import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { InformationalMessages } from 'src/app/modules/shared/enums/informational-messages.enum';
import { CollectionPointsService } from '../../services/collect-point.service';

@Component({
  selector: 'app-collect-point-action-delete',
  templateUrl: './collect-point-action-delete.component.html',
  styleUrls: ['./collect-point-action-delete.component.scss']
})
export class CollectPointActionDeleteComponent implements OnInit {

  idCollectPoint: string

  constructor(
    private collectionPointDialogRef: NbDialogRef<CollectPointActionDeleteComponent>,
    private collectionPointsService: CollectionPointsService,
    private toasterService: NbToastrService
    ) { }

  ngOnInit(): void { }

  deleteCollectionPoint():void {
    this.collectionPointsService.deleteCollectionPoint(this.idCollectPoint).subscribe({
      next: () => {
        this.toasterService.success(InformationalMessages.SUCCESSFUL_DELETING, 'Sucesso')
        this.closeDialog(true)
      },
      error: error => {
        console.error(error);
        this.toasterService.warning(InformationalMessages.GENERIC_ERROR, 'Atenção')
      }
    })
  }

  closeDialog(action: boolean): void {
    this.collectionPointDialogRef.close(action)
  }

}
