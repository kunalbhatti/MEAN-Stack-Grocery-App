import {
  Injectable
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import {
  Observable
} from 'rxjs';

import {
  SettingsService
} from '../services/settings.service';
import {
  SettingsModel
} from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})

export class SettingsResolveGuard implements Resolve < SettingsModel > {

  constructor(private settingsService: SettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SettingsModel | Observable < SettingsModel > | Promise < SettingsModel > {
    return this.settingsService.getSettings();
  }

}
