import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import {
  Injectable
} from "@angular/core";
import {
  Observable,
  of
} from "rxjs";

import {
  catchError,
  map,
  take
} from "rxjs/operators";

import * as config from './config.json';
import errorHandler from './error.handler';


interface User {
  email: string;
  password: string;
  name: string;
  locations: string[],
    selectedLocation: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  login(body: {
    email: string,
    password: string
  }): Observable < any > {
    return this.http.post(`${config.url}/auth/login`, body).pipe(take(1), catchError(errorHandler));
  }

  register(body: User): Observable < any > {
    return this.http.post(`${config.url}/auth/register`, body).pipe(take(1), catchError(errorHandler));
  }

  getUserDetails(): Observable < any > {
    return this.http.get(`${config.url}/auth/get-user-details`).pipe(take(1), catchError(errorHandler));
  }

  updateUserName(name: string): Observable < any > {
    return this.http.patch(`${config.url}/auth/update-user-name`, {
      name
    }).pipe(take(1), catchError(errorHandler));
  }

  updateUserPassword(newPassword: string, oldPassword: string): Observable < any > {
    return this.http.patch(`${config.url}/auth/update-user-password`, {
      newPassword,
      oldPassword
    }).pipe(take(1), catchError(errorHandler));
  }

  checkAuthStatus(): Observable < any > {
    return this.http.get(`${config.url}/auth/check-auth-status`).pipe(take(1), map(
      (result: {
        auth: boolean,
        message: string
      }) => {
        return {
          auth: result.auth,
          status: 200
        }
      }
    ), catchError((errorRes: HttpErrorResponse) => {
      return of({
        auth: false,
        status: errorRes.status
      })
    }));
  }

  getAccessToken(): string {
    let token = localStorage.getItem('groceryApp-token');

    if (!token) {
      token = '';
    }
    return token;
  }

  logout(): boolean {
    localStorage.removeItem('groceryApp-token');
    return true;
  }
}
