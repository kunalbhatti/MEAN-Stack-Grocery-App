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

@Component({
  selector: 'app-sort-products',
  templateUrl: './sort-products.component.html',
  styleUrls: ['./sort-products.component.scss'],
})
export class SortProductsComponent implements OnInit {

  @Input() selectedView: string;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {

  }

  onDismiss() {
    this.popoverController.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm) {
    this.popoverController.dismiss(form.value.selectedView, 'filter');
  }

}
