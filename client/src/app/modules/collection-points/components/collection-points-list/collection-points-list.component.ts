import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { CollectPoint } from '../../models/collection-points';
import { CollectionPointsService } from '../../services/collection-points.service';
import { CollectPointActionCellComponent } from '../collect-point-action-col/collect-point-action-cell.component';
import { CollectionPointsFormComponent } from '../collection-points-form/collection-points-form.component';

@Component({
  selector: 'app-collection-points-list',
  templateUrl: './collection-points-list.component.html',
  styleUrls: ['./collection-points-list.component.scss']
})
export class CollectionPointsListComponent implements OnInit {
  
  collectionPointsList: CollectPoint[] = []
  tableCollectionPointsConfig: Object = {}

  dialogRef: NbDialogRef<CollectionPointsFormComponent>

  constructor(
    private collectionPointsService: CollectionPointsService,
    private dialogService: NbDialogService,
    private toasterService: NbToastrService 
    ) { }

  ngOnInit(): void {
    this.setConfigTableCollectionPoints()
    this.doSearchCollectionPoints()
  }

  doSearchCollectionPoints() {
    this.collectionPointsService.getCollectionPoints().subscribe({
      next: next => {
        this.collectionPointsList = next
        console.log(this.collectionPointsList)
      },
      error: error => {
        console.error(error);
        this.toasterService.warning('Ocorreu um erro inesperado!', 'Atenção')
      }
    })
  }

  onDeleteCollectionPoint(event: any) {
    if(window.confirm('Deseja Excluir?')) {
      
      event.confirm.resolve();
      console.log(event)
      this.collectionPointsService.deleteCollectionPoint(event.data.id).subscribe({
        next: next => {
          console.log(next)
          this.toasterService.success('Sucesso na exclusão do ponto de coleta!', 'Sucesso!')
          this.doSearchCollectionPoints()
        },
        error: error => {
          console.error(error);
          this.toasterService.warning('Ocorreu um erro inesperado!', 'Atenção')
        }
      })
    }
  }

  showDialog() {
    this.dialogRef = this.dialogService.open(CollectionPointsFormComponent, {
      context: {
        collectionPoint: Object.assign({}),
        edit: false
      },
      hasScroll: true,
      closeOnEsc: false,
      closeOnBackdropClick: false,
    })
    this.dialogRef.onClose.subscribe(() => this.doSearchCollectionPoints())
  }

  setConfigTableCollectionPoints() {
    this.tableCollectionPointsConfig = {
      actions: {
        columnTitle: "Ação",
        add: false,
        edit: false,
        delete: false,
        position: 'right'
      },
      noDataMessage: 'Nenhum usuário Cadastrado',
      columns: {
        description: {
          title: 'Descrição'
        },
        cnpj: {
          title: 'CNPJ'
        },
        zipCode: {
          title: 'CEP'
        },
        contryState: {
          title: 'Cidade/Estado'
        },
        registrationDate: {
          title: 'Ação',
          filter: false,
          type: 'custom',
          renderComponent: CollectPointActionCellComponent,
          onComponentInitFunction: this.onComponentInitFunction
        }
      },
      attr: {
        class: 'table table-bordered'
      },
    }
  }

  onComponentInitFunction(instance: CollectPointActionCellComponent) {
    instance.edit.subscribe({
      next: (next:any) => console.log(next)
    })
  }
}