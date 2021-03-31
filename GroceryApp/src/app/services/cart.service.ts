import {
  HttpClient
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import {
  Observable
} from "rxjs";
import {
  catchError
} from "rxjs/operators";

import * as config from './config.json';
import errorHandler from './error.handler';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}


  getCart(gid: string, cid ? : string): Observable < any > {
    return this.http.get(`${config.url}/products/get-cart/?gid=${gid}&cid=${cid}`).pipe(catchError(errorHandler));
  }

  updateCartCount(productId: string, count: number, gid: string) {
    return this.http.patch(`${config.url}/products/update-cart-count/${productId}`, {
      count,
      gid
    }).pipe(catchError(errorHandler));
  }
}
