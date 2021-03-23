import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  ModalController
} from '@ionic/angular';
import {
  ToasterService
} from './../../../../../services/toaster.service';
import {
  ProductModel
} from './../../../../../models/product.model';
import {
  SettingsService
} from './../../../../../services/settings.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {

  @Input() product: ProductModel;
  @Input() cid: string;

  constructor(private modalController: ModalController, private settingsService: SettingsService, private toasterService: ToasterService) {}

  ngOnInit() {}

  onDismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  addProduct(form: NgForm): void {
    this.settingsService.addProduct(form.value).subscribe(
      (result: {
        product: ProductModel
      }) => {
        this.modalController.dismiss(result.product, 'create');
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
      }
    )
  }

  editProduct(form: NgForm): void {
    this.settingsService.editProduct(form.value).subscribe((result: {
      product: ProductModel
    }) => {
      this.modalController.dismiss(result.product, 'edit');
    }, (error: string) => {
      this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
    })
  }
}
