import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response-model.interface';
import { Observable } from 'rxjs';
import CaseUtils from '../utils/caseutils';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  readonly baseUrl = environment.BASE_URL;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }
  get<T>(path: String, params?: HttpParams, loading?: boolean) {
    if (loading) {

    }
    return new Promise<void>((resolve, reject) => {
      this.http.get<ResponseModel<T>>(`${this.baseUrl}/${path}`, { params }).subscribe({
        next: (res: any) => {
          console.log('next');      
          resolve(CaseUtils.keysToCamel(res as ResponseModel<T>));
        },
        error: (error: any) => {                              //Error callback
          console.error('error caught in component')
          if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
              console.error("Error Event");
            } else {
              console.error(`error status : ${error.status} ${error.statusText}`);
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
            console.error("some thing else happened");
          }
          reject(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
  }

  gets<T>(path: String, params?: HttpParams, loading?: boolean) {
    if (loading) {

    }
    let response: ResponseModel<T>;
    this.getObservable(path, params).subscribe({
      next: (res: any) => {
        console.log('next');
        response = res;
        return response;
      },
      error: (error: any) => {                              //Error callback
        console.error('error caught in component')
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.error(`error status : ${error.status} ${error.statusText}`);
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
          console.error("some thing else happened");
        }
        response = error;
      },
      complete: () => {
        console.log('complete');
        return response;
      },
    });
  }
  getObservable(path: String, params?: HttpParams): Observable<any> {
    return this.http.get(`${this.baseUrl}/${path}`, { params })
  }
}
