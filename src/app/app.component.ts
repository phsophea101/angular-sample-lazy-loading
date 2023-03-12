import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuoteModel } from './models/quote-model.interface';
import { HttpServiceService } from './services/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sophea PHOS';
  footerUrl = 'https://www.ganatan.com';
  footerLink = 'www.ganatan.com';
  now = new Date().getFullYear();
  http: HttpServiceService;
  data: any;

  constructor(http: HttpServiceService) {
    this.http = http;
  }
  ngOnInit(): void {
    let params: any;
    this.http.gets<QuoteModel>('api/qutoes', params, true).then(data => {
      this.data = data;
      console.info(this.data);
    })
  }
}