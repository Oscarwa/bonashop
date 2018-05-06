import { Component, OnInit } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  editMode: boolean = false;
  editId: string;

  constructor(private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.editId = this.route.snapshot.paramMap.get('id');
    if(!!this.editId) {
      this.productService.getSingle(this.editId).subscribe(i => this.item = i);
      this.editMode = true;
    } else {
      this.item.cat_all = this.item.cat_child = this.item.cat_men = this.item.cat_women = false;
      var now = new Date();
      this.item.date_available = now.getFullYear() + '-' + this.zeroFill(now.getMonth() + 1) + '-' + this.zeroFill(now.getDate());
      console.info(this.item.date_available)
    }
  }

  zeroFill( num )
  {
    return ('00' + num).slice(-2);
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
    console.info(randomId)
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
    this.task.then((snapshot) => {
      console.log(snapshot);
      this.item.photos = this.item.photos || [];
      this.item.photos.push({
        name: snapshot.metadata.name,
        url: snapshot.metadata.downloadURLs[0]
      })
    },(error) => {
      console.log(error)
    })
  }

  deleteImage(ref) {
    debugger;
    console.log(ref);
    this.afStorage.ref(ref).delete();
    this.item.photos = this.item.photos.filter(x => x.name != ref);
    
  }

  saveItem() {
    //console.log(this.item);
    if(this.editMode) {
      this.productService.update(this.editId, this.item)
    }
    else {
      this.item.date_created = new Date().toISOString()
      this.productService.add(this.item);
    }
    this.router.navigate(['admin']);
  }

}
