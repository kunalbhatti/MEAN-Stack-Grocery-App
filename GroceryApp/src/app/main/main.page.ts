import {
  Component,
  OnInit
} from "@angular/core";
import {
  ActivatedRoute
} from "@angular/router";

import {
  SettingsService
} from "../services/settings.service";

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.css']
})

export class MainPage implements OnInit {

  constructor(private route: ActivatedRoute, private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.settings = this.route.snapshot.data['data']['settings'];
  }
}
