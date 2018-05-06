import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  email: string;
  password: string;
  products: Observable<Product[]>

  constructor(
    public  authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.email = this.password = '';  
    this.products = this.productService.getAllPlus();
    this.products.subscribe(i => console.table(i))
  }

  loginSubmit() {
    this.authService.login(this.email, this.password);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  edit(id: string) {
    console.log(id);
  }

  delete(id: string) {
    this.productService.delete(id);
  }
}
