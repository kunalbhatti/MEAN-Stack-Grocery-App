import {
  Component,
  OnInit,
} from "@angular/core";
import {
  ProductModel
} from "src/app/models/product.model";
import {
  InventoryService
} from "src/app/services/inventory.service";
import {
  SearchBarService
} from "./../../services/searchbar.service";

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.css']
})
export class InventoryPage implements OnInit {

  products: ProductModel[];
  filtered: ProductModel[];

  constructor(private searchBarService: SearchBarService, private inventoryService: InventoryService) {}

  ngOnInit() {
    // this.inventoryService.getInventoryByProducts().subscribe((products: ProductModel[]) => {
    //   this.products = products;
    // });
  }

  getProductList(searchStr: string) {

    this.searchBarService.getProductList(searchStr).subscribe((data: ProductModel[]) => {
      this.products = data;
    });
  }
}
