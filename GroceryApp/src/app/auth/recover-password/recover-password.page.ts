import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AlertController
} from '@ionic/angular';
import {
  AuthService
} from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  constructor(private authService: AuthService,
    private alertController: AlertController,
    private router: Router) {}

  ngOnInit() {}

  recoverPassword(form: NgForm) {
    this.authService.recoverPassword(form.value.email).subscribe(
      (result) => {
        this.alertController.create({
          header: 'Success',
          message: 'Password reset link has been mailed to the email. Please follow the link to reset your password.',
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
      }
    );
  }

}
