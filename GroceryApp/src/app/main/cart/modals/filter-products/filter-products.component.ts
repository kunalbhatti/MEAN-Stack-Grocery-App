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
  SettingsModel
} from './../../../../models/settings.model';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss'],
})
export class FilterProductsComponent implements OnInit {

  @Input() categories: SettingsModel['categories'] = [];

  @Input() selectedCategory: string;

  categoryKeys: string[] = [];

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    this.categories.forEach(category => {
      this.categoryKeys.push(Object.keys(category).toString());
    });
  }

  onDismiss() {
    this.popoverController.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm) {
    this.popoverController.dismiss(form.value.category, 'filter');
  }
}
