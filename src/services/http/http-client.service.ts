import { inject, Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OptionsHttpModel } from '../../app/models/options-http.model';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private configService = inject(ConfigService);
  private apiUrl = this.configService.apiUrl;
  private httpService = inject(HttpClient);

  public get<T>(url: string, options?: OptionsHttpModel<T>): Observable<T> {
    if (options?.params) {
      url += this.setUrlParams(options.params);
    }
    return this.httpService.get<T>(`${this.apiUrl}/${url}`);
  }

  public post<T>(url: string, options?: OptionsHttpModel<T>): Observable<T> {
    if (options?.params) {
      url += this.setUrlParams(options.params);
    }
    return this.httpService.post<T>(`${this.apiUrl}/${url}`, options?.body);
  }

  public put<T>(url: string, options?: OptionsHttpModel<T>): Observable<T> {
    if (options?.params) {
      url += this.setUrlParams(options.params);
    }
    return this.httpService.put<T>(`${this.apiUrl}/${url}`, options?.body);
  }

  // TODO: PENDING USE OPTIONS
  // eslint-disable-next-line no-unused-vars
  public delete<T>(url: string, options?: OptionsHttpModel<T>): Observable<T> {
    return this.httpService.delete<T>(`${this.apiUrl}/${url}`);
  }

  private setUrlParams<T>(params: T): string {
    let urlParams = '';
    if (typeof params === 'object' && params !== null) {
      Object.keys(params).forEach((key, index) => {
        const value = params[key as keyof T];
        urlParams += `${index === 0 ? '?' : '&'}${key}=${value}`;
      });
    }

    console.log(params);
    return urlParams;
  }
}
