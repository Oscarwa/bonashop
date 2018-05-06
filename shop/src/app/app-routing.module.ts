import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { NewProductComponent } from './new-product/new-product.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  //{path: 'home', component: HomeComponent },
  {path: 'home', component: SearchComponent },
  {path: 'search', component: SearchComponent },
  {path: 'detail/:id', component: DetailComponent },
  {path: 'admin', component: AdminComponent },
  {path: 'admin/new', component: NewProductComponent },  
  {path: 'admin/edit/:id', component: NewProductComponent },  

  {path: '', redirectTo: '/search', pathMatch: 'full'},  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
