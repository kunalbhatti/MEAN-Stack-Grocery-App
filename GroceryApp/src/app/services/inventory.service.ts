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
  catchError,
  map,
  take
} from "rxjs/operators";
import {
  ProductModel
} from "../models/product.model";

import * as config from './config.json';
import errorHandler from './error.handler';
import {
  SettingsService
} from "./settings.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  currentGroup: string;
  constructor(private http: HttpClient, private settingsService: SettingsService) {
    this.currentGroup = this.settingsService.settings.currentGroup;
  }

  getInventoryByProducts(gid: string): Observable < any > {
    return this.http.get(`${config.url}/products/inventory-by-products/${gid}`).pipe(take(1), map(
      (products: ProductModel[]) => {

        for (let product of products) {
          if (!product.stockCount) {
            product['stockCount'] = {
              [this.currentGroup]: 0
            };

          }
          if (!product.stockStatus) {
            product['stockStatus'] = {
              [this.currentGroup]: ''
            };
          }
        }
        return products;
      }
    ), catchError(errorHandler))
  }

  updateStockCount(productId: string, count: number, gid: string) {
    return this.http.patch(`${config.url}/products/update-stock-count/${productId}`, {
      count,
      gid
    });
  }

  updateStockStatus(productId: string, status: string, gid: string) {
    return this.http.patch(`${config.url}/products/update-stock-status/${productId}`, {
      status,
      gid
    });
  }
}
