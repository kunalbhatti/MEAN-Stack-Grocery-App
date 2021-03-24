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
export class SearchBarService {

  constructor(private http: HttpClient) {}

  getProductList(searchStr: string): Observable < any > {
    return this.http.get(`${config.url}/products/filter-products/${searchStr}`).pipe(catchError(errorHandler))
  }
}
