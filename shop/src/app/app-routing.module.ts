import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'search', component: SearchComponent },
  {path: 'admin', component: AdminComponent },
  {path: 'admin/new', component: NewProductComponent },  
  {path: 'admin/edit/:id', component: NewProductComponent },  

  {path: '', redirectTo: '/home', pathMatch: 'full'},  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
