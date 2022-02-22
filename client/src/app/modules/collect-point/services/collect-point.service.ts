import { HttpClient, HttpParams } from '@angular/common/http';
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

  addCollectPoint(collectionPoint: CollectPoint): Observable<CollectPoint>{
    return this.http
      .post<CollectPoint>(`${this.API}/collection-points`, collectionPoint);
  }

  editCollectPoint(collectionPoint: CollectPoint): Observable<CollectPoint>{
    return this.http
      .put<CollectPoint>(`${this.API}/collection-points/${collectionPoint.id}`, collectionPoint);
  }

  deleteCollectPoint(idCollectionPoint: string): Observable<CollectPoint>{
    return this.http
      .delete<CollectPoint>(`${this.API}/collection-points/${idCollectionPoint}`);
  }

  getCollectPointsByFilter(cnpj: string, companyName: string, tradingName: string): Observable<CollectPoint[]> {
    let params = new HttpParams();

    if (companyName) params = params.append("companyName", companyName);
    if (tradingName) params = params.append("tradingName", tradingName);
    if (cnpj) params = params.append("cnpj", cnpj);

    return this.http.get<CollectPoint[]>(`${this.API}/collection-points`, {params: params})
  }
}