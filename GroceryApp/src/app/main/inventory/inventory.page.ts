import {
  Component,
  OnInit,
} from "@angular/core";
import {
  AlertController
} from "@ionic/angular";
import {
  ProductModel
} from "src/app/models/product.model";
import {
  InventoryService
} from "src/app/services/inventory.service";
import {
  SettingsService
} from "src/app/services/settings.service";
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

  searchString: string = '';

  currentGroup: string;

  constructor(private searchBarService: SearchBarService,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private settingsService: SettingsService) {}

  ngOnInit() {
    this.currentGroup = this.settingsService.getCurrentGroup();
    this.inventoryService.getInventoryByProducts().subscribe((products: ProductModel[]) => {
      this.products = products;
    });
  }

  getProductList(searchStr: string) {

    this.searchString = searchStr;

    this.searchBarService.getProductList(searchStr).subscribe((data: ProductModel[]) => {
      this.filtered = data;
    }, error => {
      console.log(error.message)
    });
  }

  updateProductStockCount(product: ProductModel, count: number) {
    if (product.stockCount[this.currentGroup] + count === 0) {

      this.alertController.create({
        header: 'Out of stock?',
        message: 'Do you want to add this product to cart?',
        inputs: [{
          type: 'text',
          name: 'count',
          placeholder: 'Number of products'
        }],
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: (data: {
            count: string
          }) => {
            console.log(data.count);

          }
        }]
      }).then(actionEl => {
        actionEl.present();
      });

    } else {
      const stockCount = product.stockCount[this.currentGroup];
      this.inventoryService.updateStockCount(product._id, count, this.currentGroup).subscribe(
        () => {
          product.stockCount[this.currentGroup] += count;
          if (stockCount !== product.stockCount[this.currentGroup]) {
            this.updateProducts(product);
          }
        }
      )
    }

  }

  updateProductStockStatus(product: ProductModel, status: string) {
    if (status === 'empty') {

      this.alertController.create({
        header: 'Out of stock?',
        message: 'Do you want to add this product to cart?',
        inputs: [{
          type: 'text',
          name: 'count',
          placeholder: 'Number of products'
        }],
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: (data: {
            count: string
          }) => {
            console.log(data.count);
          }
        }]
      }).then(actionEl => {
        actionEl.present();
      });

    } else {
      this.inventoryService.updateStockStatus(product._id, status, this.currentGroup).subscribe(
        () => {
          product.stockStatus[this.currentGroup] = status;
          if (product.stockStatus[this.currentGroup] !== 'empty') {
            this.updateProducts(product);
          }
        }
      )
    }
  }


  updateProducts(product: ProductModel) {
    const index: number = this.products.findIndex((prod: ProductModel) => {
      if (prod._id === product._id) {
        return true;
      }
    });

    if (index !== -1) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }
  }
}
