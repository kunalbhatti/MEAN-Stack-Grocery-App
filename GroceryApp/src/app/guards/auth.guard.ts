import {
  Injectable
} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {
  Router
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

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
    return this.authService.checkAuthStatus().pipe(take(1), map(
      (user: {
        auth: boolean,
        status: number
      }) => {
        if (!user.auth) {
          return true;
        }

        return this.router.createUrlTree(['/', 'app']);
      }
    ));
  }
}
