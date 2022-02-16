import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { CollectionPoints } from '../../models/collection-points';
import { CollectionPointsService } from '../../services/collection-points.service';

@Component({
  selector: 'app-collection-points-list',
  templateUrl: './collection-points-list.component.html',
  styleUrls: ['./collection-points-list.component.scss']
})
export class CollectionPointsListComponent implements OnInit {
  
  collectionPointsList: CollectionPoints[] = []
  tableCollectionPointsConfig: Object = {}

  constructor(
    private collectionPointsService: CollectionPointsService,
    private dialogService: NbDialogService,
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
      error: error => { console.log(error) }
    })
  }

  onAddCollectionPoint(event: any) {
    console.log(event)
    this.collectionPointsService.addCollectionPoint(event.newData).subscribe({
      next: next => {
        console.log(next)
      },
      error: error => {
        console.log(error)
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
          this.doSearchCollectionPoints()
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  setConfigTableCollectionPoints(){
    this.tableCollectionPointsConfig = {
      actions: { columnTitle: "Ação", add: false, position: 'right' },
      add: {
        addButtonContent: 'ADICIONAR',
        confirmCreate: true
      },
      edit: {
        editButtonContent: 'EDITAR',
      },
      delete: {
        deleteButtonContent: 'EXCLUIR',
        confirmDelete: true,
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
          title: 'Data Cadastro'
        }
      }
    };
  }
}
