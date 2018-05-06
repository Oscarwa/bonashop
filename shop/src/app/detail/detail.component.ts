import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  item: Product = <Product>{ };
  infoURL: string;
  discountPercentagePrice: number = 0;
  discountAmountPrice: number = 0;
  hasDiscount: boolean = false;
  
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var editId = this.route.snapshot.paramMap.get('id');
    if(!!editId) {
      this.productService.getSingle(editId).subscribe((i) => {
        this.infoURL = "https://api.whatsapp.com/send?phone=528115251019&text=Quisiera mas informacion de: " + i.title + ". " + encodeURI(window.location.href);
        if(i.percentageDiscount > 0) {
          this.hasDiscount = true;
          this.discountPercentagePrice = i.price - (i.price * (i.percentageDiscount / 100))
        } else if (i.amountDiscount > 0) {
          this.hasDiscount = true;          
          this.discountAmountPrice = i.price - i.amountDiscount;
        }
        this.item = i
      });
    }
  }

}
