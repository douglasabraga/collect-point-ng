import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ZipCode } from '../models/zip-code';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  private readonly API = environment.API_ZIP_CODE

  constructor(private http: HttpClient) { }

  getStatusZipCode(zipCode: string): Observable<ZipCode> {
    return this.http
      .get<ZipCode>(`${this.API}/${zipCode}`)
  }
}