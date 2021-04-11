import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  PopoverController
} from '@ionic/angular';
import {
  ProductModel
} from './../../../../models/product.model';

@Component({
  selector: 'app-add-to-inventory',
  templateUrl: './add-to-inventory.component.html',
  styleUrls: ['./add-to-inventory.component.scss'],
})
export class AddToInventoryComponent implements OnInit {

  @Input() product: ProductModel;

  // gid is added as a hidden field in the form
  @Input() gid: string;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  onDismiss() {
    this.popoverController.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm) {
    this.popoverController.dismiss(form.value, 'create');
  }

}
