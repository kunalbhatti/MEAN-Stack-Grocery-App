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
  catchError
} from 'rxjs/operators';
import {
  ExpenseModel
} from '../models/expense.model';

import * as config from './config.json';
import errorHandler from './error.handler';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  constructor(private http: HttpClient) {}

  getExpense(month: number, year: number, gid: string, selectedView: string) {
    return this.http.get(
      `${config.url}/expenses/get-expense/?month=${month}&year=${year}&gid=${gid}&view=${selectedView}`
    ).pipe(catchError(errorHandler));
  }

  addExpense(expense: ExpenseModel): Observable < any > {

    return this.http.post(
      `${config.url}/expenses/add-expense`,
      expense
    ).pipe(catchError(errorHandler));;
  }

  updateExpense(eid: string, update: {
    date: ExpenseModel['date'],
    cost: number
  }) {
    return this.http.patch(
      `${config.url}/expenses/update-expense/`, {
        eid,
        update
      }
    ).pipe(catchError(errorHandler));;
  }

  deleteExpense(eid: string) {
    return this.http.delete(
      `${config.url}/expenses/delete-expense/${eid}`
    ).pipe(catchError(errorHandler));;
  }
}
