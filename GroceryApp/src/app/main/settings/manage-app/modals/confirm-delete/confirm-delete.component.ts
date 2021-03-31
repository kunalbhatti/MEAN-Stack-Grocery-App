import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PopoverController
} from '@ionic/angular';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {

  @Input() type: string;
  @Input() message: string;

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  onDismiss(): void {
    this.popoverController.dismiss(null, 'cancel');
  }

  onDelete(): void {
    this.popoverController.dismiss(null, 'delete');
  }
}
