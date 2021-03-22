import {
  Component,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  take
} from 'rxjs/operators';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  ToasterService
} from 'src/app/services/toaster.service';


const checkPasswordChanged: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const oldPassword = control.get('oldPassword');
  const newPassword = control.get('newPassword');

  if (oldPassword.value !== newPassword.value) {
    return null;
  } else {
    return {
      passwordNotChanged: true
    };
  }
}

const comparePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');
  let same = false;


  if (newPassword.value.length >= 6 && newPassword.value.length <= 12) {
    same = newPassword.value === confirmPassword.value;
  }

  if (same && control.get('confirmPassword').dirty) {
    return null;
  } else {
    return {
      invalidPassword: true,
    }
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  updateNameForm: boolean = false;
  updatePasswordForm: boolean = false;
  profileError: string;

  userName: string;

  passwordResetForm = this.fb.group({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  }, {
    validators: [comparePassword, checkPasswordChanged]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private toasterService: ToasterService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.authService.getUserDetails().pipe(take(1)).subscribe(
      (user: {
        name: string
      }) => {
        this.userName = user.name;
      }, (error: string) => {
        this.profileError = error;
      }
    )
  }

  updateName(form: NgForm) {
    const name = form.value.name;

    this.authService.updateUserName(name).subscribe(
      (user: {
        name: string,
        message: string
      }) => {
        this.userName = user.name;
        this.updateNameForm = false;
        form.reset();
        this.toasterService.presentToast("Success", user.message, 2000);
      }
    )
  }

  updatePassword(form: NgForm) {
    const password = form.value.newPassword;

    console.log(password)

    this.authService.updateUserPassword(password).subscribe(
      (result: {
        message: string
      }) => {
        this.updatePasswordForm = false;
        form.reset();
        this.toasterService.presentToast("Success", result.message, 2000);
      }
    )
  }

}
