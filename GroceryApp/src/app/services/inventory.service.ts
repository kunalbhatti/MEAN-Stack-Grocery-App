import {
  HttpClient
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import { Observable } from "rxjs";

import * as config from './config.json';
import errorHandler from './error.handler';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getInventoryByProducts(): Observable < any > {
    return this.http.get(`${config.url}/products/inventory-by-products`);
  }
}
