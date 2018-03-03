import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product'
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('messages').valueChanges();
  }

}
