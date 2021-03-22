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

  constructor(private modalController: ModalController, private settingsService: SettingsService) {}

  ngOnInit() {}

  onDismiss() {
    this.modalController.dismiss(null, 'cancel');
  }

  addProduct(form: NgForm) {
    this.settingsService.addProduct(form.value).subscribe(
      (result: {
        product: ProductModel
      }) => {
        this.modalController.dismiss(result.product, 'create');
      }, error => {
        console.log(error)
      }
    )
  }

  editProduct(form: NgForm) {
    this.settingsService.editProduct(form.value).subscribe((result: {
      product: ProductModel
    }) => {
      this.modalController.dismiss(result.product, 'edit');
    }, error => {
      console.log(error)
    })
  }

}
