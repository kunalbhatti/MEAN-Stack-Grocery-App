import {
  Injectable
} from "@angular/core";
import {
  ToastController
} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})

export class ToasterService {
  constructor(private toastController: ToastController) {}

  presentToast(header: string, message: string, duration: number, color ? : string): void {
    this.toastController.create({
      header,
      message,
      duration,
      color
    }).then((toastEl: HTMLIonToastElement) => {
      toastEl.present();
    });
  }

}
