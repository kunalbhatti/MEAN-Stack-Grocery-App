import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  AlertController
} from '@ionic/angular';
import {
  ToasterService
} from 'src/app/services/toaster.service';
import {
  AuthService
} from './../../services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.page.html',
  styleUrls: ['./activate-account.page.scss'],
})
export class ActivateAccountPage implements OnInit {

  email: string;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toasterService: ToasterService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.route.params.subscribe(
      params => {
        this.email = params.email;
        if (this.email === 'null') {
          this.email = ''
        }
      }
    )
  }

  getActvationLink(form: NgForm) {
    this.authService.getActivationLink(form.value.email).subscribe(
      () => {
        this.alertController.create({
          header: 'Success',
          message: 'Activation link mailed to the email address. Please click on the link to activate the account',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.router.navigate(['/', 'auth', 'login']);
            }
          }]
        }).then(
          (alertEl: HTMLIonAlertElement) => {
            alertEl.present();
          }
        );
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
      }
    );
  }
}
