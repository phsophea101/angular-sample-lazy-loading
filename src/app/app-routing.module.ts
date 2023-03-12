import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'index', redirectTo: '' },
  { path: 'home', redirectTo: '' },
  {
    path: 'contact',
    loadChildren: () => import('./modules/contact/contact.module')
      .then(mod => mod.ContactModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./modules/about/about.module')
      .then(mod => mod.AboutModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module')
      .then(mod => mod.SignupModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }