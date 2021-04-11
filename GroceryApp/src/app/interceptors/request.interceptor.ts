import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  AuthService
} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    const request = req.clone({
      setHeaders: {
        'content-type': 'application/json',
        'x-access-token': this.authService.getAccessToken()
      }
    })
    return next.handle(request);
  }

}
