import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '', component: ContactComponent, children: [
      {
        path: '', data: {
          title: 'Mailing'
        },
        loadChildren: () => import(`./mailing/mailing.module`)
          .then(mod => mod.MailingModule)
      },

      {
        path: 'mailing', data: {
          title: 'Mailing'
        },
        loadChildren: () => import(`./mailing/mailing.module`)
          .then(mod => mod.MailingModule)
      },
      {
        path: 'mapping', data: {
          title: 'Mapping'
        },
        loadChildren: () => import(`./mapping/mapping.module`)
          .then(mod => mod.MappingModule)
      },
      {
        path: 'website', data: {
          title: 'Website'
        },
        loadChildren: () => import(`./website/website.module`)
          .then(mod => mod.WebsiteModule)
      },

      {
        path: '**', data: {
          title: 'Mailing'
        },
        loadChildren: () => import(`./mailing/mailing.module`)
          .then(mod => mod.MailingModule)
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }