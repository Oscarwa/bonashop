import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Observable<Product[]>

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.products = this.productService.getAllPlus();
  }

  goTo(id) {
    this.router.navigate(["/detail/" + id]);
  }

}
