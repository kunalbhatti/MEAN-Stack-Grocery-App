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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.showPasswordHint = false;
  }

  onSubmit() {
    this.authService.register(this.registrationForm.value).subscribe(
      user=>{
        console.log(user);
      }
    );
  }

}
