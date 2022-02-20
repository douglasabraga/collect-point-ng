import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CollectPoint } from '../models/collection-points';

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
    console.log(collectionPoint);
    return this.http
      .post<CollectPoint>(`${this.API}/collection-points`, collectionPoint);
  }

  deleteCollectionPoint(idCollectionPoint: number): Observable<CollectPoint>{
    console.log(idCollectionPoint);
    return this.http
      .delete<CollectPoint>(`${this.API}/collection-points/${idCollectionPoint}`);
  }
}
