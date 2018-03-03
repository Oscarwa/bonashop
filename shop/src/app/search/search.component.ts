import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Observable<Product[]>

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.products = this.productService.getAll();
  }

}
