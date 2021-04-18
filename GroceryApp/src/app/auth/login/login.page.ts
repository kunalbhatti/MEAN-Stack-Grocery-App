import {
  Component,
  OnInit
} from "@angular/core";
import {
  FormControl,
  FormGroup
} from "@angular/forms";
import {
  Router
} from "@angular/router";
import {
  AlertController,
} from "@ionic/angular";
import {
  take
} from "rxjs/operators";
import {
  AuthService
} from "src/app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.css']
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {}

  ngOnInit() {}

  onSubmit() {
    const body = this.loginForm.value;

    this.authService.login(body).pipe(take(1)).subscribe(
      (user: {
        auth: boolean,
        activated: boolean,
        token: string
      }) => {
        if (user.auth && user.activated) {
          localStorage.setItem('groceryApp-token', user.token);
          this.router.navigate(['/', 'app']);
        } else if (!user.activated) {
          this.alertController.create({
            header: 'Account Inactive',
            message: 'Please activate your account to continue.',
            buttons: [{
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Ok',
              handler: () => {
                this.router.navigate(['/', 'auth', 'activate-account', body.email])
              }
            }]
          }).then((alertEl: HTMLIonAlertElement) => {
            alertEl.present();
          });
        }
      }, (error: string) => {
        this.errorMessage = error;
      }
    );
  }
}
