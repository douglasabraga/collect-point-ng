import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CollectionPoints } from '../models/collection-points';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointsService {

  private readonly API = environment.API

  constructor(private http: HttpClient) { }

  getCollectionPoints(): Observable<CollectionPoints[]> {
    return this.http
      .get<CollectionPoints[]>(`${this.API}/collection-points`)
  }

  addCollectionPoint(collectionPoint: CollectionPoints): Observable<CollectionPoints>{
    console.log(collectionPoint);
    return this.http
      .post<CollectionPoints>(`${this.API}/collection-points`, collectionPoint);
  }

  deleteCollectionPoint(idCollectionPoint: number): Observable<CollectionPoints>{
    console.log(idCollectionPoint);
    return this.http
      .delete<CollectionPoints>(`${this.API}/collection-points/${idCollectionPoint}`);
  }
}
