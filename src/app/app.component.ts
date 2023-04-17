
import { Component, OnInit } from '@angular/core';
import { QuoteModel } from './models/quote-model.interface';
import { HttpServiceService } from './services/http-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  footerUrl = 'https://www.ganatan.com';
  footerLink = 'www.ganatan.com';
  now = new Date().getFullYear();
  items: QuoteModel | undefined

  constructor(private readonly router: Router, private activatedRoute: ActivatedRoute, private http: HttpServiceService, private readonly titleService: Title) {

  }
  ngOnInit(): void {
    let params: any;
    let dataResponse: any
    this.http.get<QuoteModel>('api/qutoes', params, true).then(data => {
      dataResponse = data;
      this.items = dataResponse.body;
      console.log(dataResponse?.resultMessage);

    })
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(data + ' - Website Name');
      }
    });
  }

}