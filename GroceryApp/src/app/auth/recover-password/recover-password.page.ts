import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  recoverPassword(form: NgForm) {
    this.authService.recoverPassword(form.value.email).subscribe(
      (result) => {
        console.log(result)
      }
    );
  }

}
