import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { apiUrl } from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  getTotalProducts() {
    return this.http.get<any>(`${apiUrl}/total_products/`)
      .pipe(map(data => {
        return data;
      }));
  }

  getLastUpdated() {
    return this.http.get<any>(`${apiUrl}/last_updated/`)
      .pipe(map(data => {
        return data;
      }));
  }

  getTrends() {
    return this.http.get<any>(`${apiUrl}/trends/`)
      .pipe(map(data => {
        return data;
      }));
  }

  /* Call this endpoint to receive the debug count for last 30 days. */
  getDebugCount() {
    return this.http.get<any>(`${apiUrl}/debug_count/`)
      .pipe(map(data => {
        return data;
      }));
  }

  getActiveProducts() {
    return this.http.get<any>(`${apiUrl}/active_products/`)
      .pipe(map(data => {
        return data;
      }));
  }

}
