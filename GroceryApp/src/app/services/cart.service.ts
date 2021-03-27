import {
  HttpClient
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
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

  updateCartCount(productId: string, count: number, gid: string) {
    return this.http.patch(`${config.url}/products/update-cart-count/${productId}`, {
      count,
      gid
    }).pipe(catchError(errorHandler));
  }
}
