import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser'

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
  displayPhoto: string = "/assets/no-photo.png";
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private titleService: Title
    ) { }

  ngOnInit() {
    var editId = this.route.snapshot.paramMap.get('id');
    if(!!editId) {
      this.productService.getSingle(editId).subscribe((i) => {
        let finalPrice = i.price;
        this.infoURL = "https://api.whatsapp.com/send?phone=528115251019&text=Quisiera mas informacion de: " + i.title + ". " + encodeURI(window.location.href);
        this.displayPhoto = i.photos.length > 0 ? i.photos[0].url : "";
        i.description = i.description.replace(new RegExp('\n', 'g'), "<br />")
        if(i.percentageDiscount > 0) {
          this.hasDiscount = true;
          this.discountPercentagePrice = i.price - (i.price * (i.percentageDiscount / 100))
          finalPrice = this.discountPercentagePrice;
        } else if (i.amountDiscount > 0) {
          this.hasDiscount = true;          
          this.discountAmountPrice = i.price - i.amountDiscount;
          finalPrice = this.discountAmountPrice;
        }
        this.item = i
        this.titleService.setTitle(i.title + " @ $" + finalPrice + " - En Alaska");
      });
    }
  }
  
  swapPhoto(index) {
    this.displayPhoto = this.item.photos[index].url;
  }

}
