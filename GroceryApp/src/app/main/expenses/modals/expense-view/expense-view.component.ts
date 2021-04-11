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
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.scss'],
})
export class ExpenseViewComponent implements OnInit {

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
