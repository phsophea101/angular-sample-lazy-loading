import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      title: 'Home'
    }
  },
  { path: 'index', redirectTo: '' },
  { path: 'home', redirectTo: '' },
  {
    path: 'contact', data: {
      title: 'Contact'
    },
    loadChildren: () => import('./modules/contact/contact.module')
      .then(mod => mod.ContactModule)
  },
  {
    path: 'about-me', data: {
      title: 'About Me'
    },
    loadChildren: () => import('./modules/about/about.module')
      .then(mod => mod.AboutModule)
  },
  {
    path: 'login', data: {
      title: 'Login'
    },
    loadChildren: () => import('./modules/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'sign-up', data: {
      title: 'Sign Up'
    },
    loadChildren: () => import('./modules/signup/signup.module')
      .then(mod => mod.SignupModule)
  },
  {
    path: '**', data: {
      title: 'Not Found'
    }, component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }