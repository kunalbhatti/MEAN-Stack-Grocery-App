import {
  HttpErrorResponse
} from "@angular/common/http";
import {
  Observable,
  throwError
} from "rxjs";

const errorHandler = (errorRes: HttpErrorResponse): Observable < any > => {
  let errorMessage: string = 'An unknown error occured. Please try again later';

  if (errorRes.message) {
    errorMessage = errorRes.error.message;
  }

  return throwError(errorMessage);
}

export default errorHandler;
