import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CollectionPointsService } from '../../services/collection-points.service';

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
      next: next => {
        console.log(next)
        this.toasterService.success('Ponto de coleta excluído com sucesso!', 'Sucesso')
        this.closeDialog(true)
      },
      error: error => {
        console.error(error);
        this.toasterService.warning('Ocorreu um erro inesperado!', 'Atenção')
      }
    })
  }

  closeDialog(action: boolean): void {
    this.collectionPointDialogRef.close(action);
  }

}
