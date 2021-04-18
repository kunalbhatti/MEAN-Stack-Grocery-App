import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormBuilder
} from '@angular/forms';
import {
  Router
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

const comparePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  let same = false;

  if (password.value.length >= 6 && password.value.length <= 12) {
    same = password.value === confirmPassword.value;
  }

  if (same && control.get('confirmPassword').dirty) {
    return null;
  } else {
    return {
      invalidPassword: true
    }
  }

}

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.css']
})
export class RegisterPage implements OnInit {

  showPasswordHint: boolean;

  registrationForm = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  }, {
    validators: [comparePassword]
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private toasterService: ToasterService) {}

  ngOnInit() {
    this.showPasswordHint = false;
  }

  onSubmit() {
    this.authService.register(this.registrationForm.value).subscribe(
      () => {
        this.authService.getActivationLink(this.registrationForm.value.email).subscribe(
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
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
      }
    )
  }

}
