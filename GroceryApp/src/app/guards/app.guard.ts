import {
  Injectable
} from "@angular/core";
import {
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {
  Observable
} from "rxjs";
import {
  map,
  take
} from "rxjs/operators";
import {
  AuthService
} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AppGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable < boolean | UrlTree > | Promise < boolean | UrlTree > {
    return this.authService.checkAuthStatus().pipe(take(1), map(
      (user: {
        auth: boolean,
        status: number
      }) => {
        if (user.auth) {
          return true;
        }

        return this.router.createUrlTree(['/', 'auth']);
      }
    ))
  }

}
