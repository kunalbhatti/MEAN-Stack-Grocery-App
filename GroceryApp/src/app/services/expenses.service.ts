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
  ExpensesModel
} from "../models/expense.model";

import * as config from './config.json';

@Injectable({
  providedIn: 'root'
})

export class ExpensesService {
  constructor(private http: HttpClient) {}

  getExpense(month: number, year: number, gid: string) {
    return this.http.get(
      `${config.url}/expenses/get-expense/?month=${month}&year=${year}&gid=${gid}`
    );
  }

  addExpense(expense: ExpensesModel): Observable < any > {

    return this.http.post(
      `${config.url}/expenses/add-expense`,
      expense
    );
  }

  updateExpense(eid: string, update: {
    date: {
      date: number,
      month: number,
      year: number
    },    cost: number

  }) {
    return this.http.patch(
      `${config.url}/expenses/update-expense/`, {
        eid,
        update
      }
    );
  }

  deleteExpense(eid: string) {
    return this.http.delete(
      `${config.url}/expenses/delete-expense/${eid}`
    );
  }
}
