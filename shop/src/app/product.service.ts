import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product'
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('products').valueChanges();
  }

  getAllPlus(): Observable<Product[]> {
    return this.db.list<Product>('products').snapshotChanges()
    .map(actions => {
      return actions.map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    });
  }

  getSingle(id: string): Observable<Product> {
    return this.db.object<Product>('products/' + id).valueChanges();
  }

  delete(id: string): Promise<void> {
    return this.db.list('products').remove(id);
  }

  update(id: string, item: Product): Promise<void> {
    return this.db.object<Product>('products/' + id).update(item);
  }

  add(item): any {
    this.db.list<Product>('products').push(item).then(s => {
      console.log(s);
    })
  }

}
