import { inject, Injectable } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { DashboardData } from '../app/models/dashboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClientService);

  public getDashboardData(params?: {
    [param: string]: string | string[];
  }): Observable<DashboardData> {
    return this.http.get('dashboard/summary', { params });
  }
}
