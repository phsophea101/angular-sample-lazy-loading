import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../../models/response-model.interface';
import CaseUtils from '../../utils/caseutils';
import { ConfigService } from '../config-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceImpl implements ConfigService {
  readonly baseUrl = environment.BASE_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  info(msg: any): void { if (!environment.PRODUCTION) console.info('%c' + JSON.stringify(msg), 'color: #6495ED'); };
  error(msg: any): void { if (!environment.PRODUCTION) console.error('%c' + msg, 'color: #DC143C'); }
  warn(msg: any): void { if (!environment.PRODUCTION) console.warn('%c' + msg, 'color: #FF8C00'); }

  get<T>(path: String, params?: HttpParams, loading?: boolean) {
    if (loading) {

    }
    return new Promise<T>((resolve, reject) => {
      this.http.get<ResponseModel<T>>(`${this.baseUrl}/${path}`, { params }).subscribe({
        next: (res: any) => {
          this.info('next');
          resolve(CaseUtils.keysToCamel(res as ResponseModel<T>));
        },
        error: (error: any) => {                              //Error callback
          this.error('error caught in component')
          if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
              this.error("Error Event");
            } else {
              this.error(`error status : ${error.status} ${error.statusText}`);
              switch (error.status) {
                case 401:      //consolein
                  break;
                case 403:     //forbidden
                  break;
                case 404:     //not found
                  break;
              }
            }
          } else {
            this.error("some thing else happened");
          }
          reject(error);
        },
        complete: () => {
          this.info('complete');
        },
      });
    });
  }
}
