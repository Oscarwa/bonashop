import { Component, OnInit } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  item: Product = <Product>{ };

  constructor(private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.item.cat_all = this.item.cat_child = this.item.cat_men = this.item.cat_women = false;
    var now = new Date();
    this.item.date_available = now.getFullYear() + '-0' + (now.getMonth() + 1) + '-' + now.getDate();
  }

  clearItem() {
    
  }

  ref: any;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  upload(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
  }

  saveItem() {
    //console.log(this.item);
    this.item.date_created = new Date().toISOString()
    this.productService.add(this.item);
  }

}
