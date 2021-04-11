import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  catchError,
} from 'rxjs/operators';
import {
  ExpenseModel
} from '../models/expense.model';


import * as config from './config.json';
import errorHandler from './error.handler';
import {
  SettingsService
} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  currentGroup: string;

  constructor(private http: HttpClient, private settingsService: SettingsService) {}

  getProductList(searchStr: string, cid ? : string): Observable < any > {
    this.currentGroup = this.settingsService.settings.currentGroup;
    return this.http.get(`${config.url}/products/filter-products/?searchStr=${searchStr}&cid=${cid}&gid=${this.currentGroup}`).pipe(catchError(errorHandler));
  }

  getProductExpense(searchStr: string, date: ExpenseModel['date'], cid: string, selectedView: string): Observable < any > {
    this.currentGroup = this.settingsService.settings.currentGroup;
    return this.http.get(`${config.url}/expenses/get-product-expense/?searchStr=${searchStr}&date=${JSON.stringify(date)}&cid=${cid}&gid=${this.currentGroup}&view=${selectedView}`).pipe(catchError(errorHandler));
  }

}
