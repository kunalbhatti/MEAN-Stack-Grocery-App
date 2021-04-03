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
  take
} from "rxjs/operators";
import {
  ProductModel
} from "../models/product.model";
import {
  SettingsModel
} from "../models/settings.model";

import * as config from './config.json';
import errorHandler from './error.handler';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private _settings: SettingsModel;

  get settings() {
    return this._settings;
  }

  set settings(settings: SettingsModel) {
    this._settings = settings;
  }

  constructor(private http: HttpClient) {}

  getSettings(): Observable < any > {
    return this.http.get(`${config.url}/settings/get-settings`).pipe(take(1), catchError(errorHandler));
  }

  updateCurrentGroup(gid: string): Observable < any > {
    return this.http.patch(`${config.url}/settings/update-current-group`, {
      gid
    }).pipe(take(1), catchError(errorHandler));
  }

  updateGroup(
    groups: {
      [id: string]: string
    } []
  ): Observable < any > {
    return this.http.patch(`${config.url}/settings/update-group`, {
      groups
    }).pipe(take(1), catchError(errorHandler));
  }

  updateCategories(
    categories: {
      [id: string]: string
    } [], deletedId ? : string
  ): Observable < any > {
    return this.http.patch(`${config.url}/settings/update-category`, {
      categories,
      deletedId
    }).pipe(take(1), catchError(errorHandler));
  }

  updateExpenses(
    expenses: {
      [id: string]: string
    } [], deletedId ? : string
  ): Observable < any > {
    return this.http.patch(`${config.url}/settings/update-expense`, {
      expenses,
      deletedId
    }).pipe(take(1), catchError(errorHandler));
  }

  getProducts(cid: string) {
    return this.http.get(`${config.url}/settings/get-products/${cid}`).pipe(take(1), catchError(errorHandler));
  }

  addProduct(product: ProductModel): Observable < any > {
    return this.http.post(`${config.url}/settings/add-product`, {
      product
    }).pipe(take(1), catchError(errorHandler));
  }

  editProduct(product: ProductModel): Observable < any > {
    return this.http.patch(`${config.url}/settings/edit-product`, {
      product
    }).pipe(take(1), catchError(errorHandler));
  }

  deleteProduct(productId: string): Observable < any > {
    return this.http.delete(`${config.url}/settings/delete-product/${productId}`)
  }

  getCurrentGroup(): string {
    return localStorage.getItem('currentGroup');
  }
}
