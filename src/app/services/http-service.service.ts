import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response-model.interface';

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
  gets<T>(path: String, params?: HttpParams, loading?: boolean) {
    const promise = new Promise<void>((resolve, reject) => {
      this.http.get<T>(`${this.baseUrl}/${path}`, { params }).subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }
  async get<T>(path: String, params: HttpParams, loading: boolean) {
    let responseData: T;
    if (loading) {

    }
    this.http.get<ResponseModel<any>>(`${this.baseUrl}/${path}`, { params }).subscribe(
      (response: ResponseModel<any>) => {
        console.info(`response received` + JSON.stringify(response))
        return response.body;
      },
      error => {                              //Error callback
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
            }
          }
        } else {
          console.error("some thing else happened");
        }
      }
    );
    // return responseData;
  }
  post(path: String, body: any, params: HttpParams, loading: boolean) {
    if (loading) {

    }
    return this.http.post(`${this.baseUrl}/${path}`, body, { params });
  }
}
