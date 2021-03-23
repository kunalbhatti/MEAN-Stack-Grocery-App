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
} from './../../../services/auth.service';
import {
  ToasterService
} from './../../../services/toaster.service';


const checkPasswordChanged: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const oldPassword: AbstractControl = control.get('oldPassword');
  const newPassword: AbstractControl = control.get('newPassword');

  if (oldPassword.value !== newPassword.value) {
    return null;
  } else {
    return {
      passwordNotChanged: true
    };
  }
}

const comparePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const newPassword: AbstractControl = control.get('newPassword');
  const confirmPassword: AbstractControl = control.get('confirmPassword');
  let same: boolean = false;

  try {
    if (newPassword.value.length >= 6 && newPassword.value.length <= 12) {
      same = newPassword.value === confirmPassword.value;
    }
  } catch (error) {}

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
    const name: string = form.value.name;

    this.authService.updateUserName(name).subscribe(
      (user: {
        name: string,
        message: string
      }) => {
        this.userName = user.name;
        this.updateNameForm = false;
        form.reset();
        this.toasterService.presentToast("Success", user.message, 2000);
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
      }
    )
  }

  updatePassword(form: NgForm) {
    const newPassword: string = form.value.newPassword.trim();
    const oldPassword: string = form.value.oldPassword.trim();

    this.authService.updateUserPassword(newPassword, oldPassword).subscribe(
      (result: {
        message: string
      }) => {
        this.updatePasswordForm = false;
        form.reset();
        this.toasterService.presentToast("Success", result.message, 2000);
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
      }
    );
  }

}
