import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CollectPoint } from '../models/collect-point';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointsService {

  private readonly API = environment.API

  constructor(private http: HttpClient) { }

  getCollectionPoints(): Observable<CollectPoint[]> {
    return this.http
      .get<CollectPoint[]>(`${this.API}/collection-points`)
  }

  addCollectionPoint(collectionPoint: CollectPoint): Observable<CollectPoint>{
    return this.http
      .post<CollectPoint>(`${this.API}/collection-points`, collectionPoint);
  }

  editCollectionPoint(collectionPoint: CollectPoint): Observable<CollectPoint>{
    return this.http
      .put<CollectPoint>(`${this.API}/collection-points/${collectionPoint.id}`, collectionPoint);
  }

  deleteCollectionPoint(idCollectionPoint: string): Observable<CollectPoint>{
    return this.http
      .delete<CollectPoint>(`${this.API}/collection-points/${idCollectionPoint}`);
  }
}
