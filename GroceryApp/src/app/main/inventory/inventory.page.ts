import {
  Component, OnInit
} from "@angular/core";

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.css']
})
export class InventoryPage implements OnInit{
  ngOnInit(){
    console.log('Inventory Page onInit called');
  }
}
