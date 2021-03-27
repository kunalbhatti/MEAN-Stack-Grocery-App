import {
  Component,
  OnInit,
} from "@angular/core";
import {
  AlertController
} from "@ionic/angular";
import {
  ProductModel
} from "./../../models/product.model";
import {
  CartService
} from "./../../services/cart.service";
import {
  InventoryService
} from "./../../services/inventory.service";
import {
  SettingsService
} from "./../../services/settings.service";
import {
  SearchBarService
} from "./../../services/searchbar.service";
import {
  take
} from "rxjs/operators";
import {
  ActivatedRoute
} from "@angular/router";

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

  updateLock: boolean = false;

  constructor(private searchBarService: SearchBarService,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private settingsService: SettingsService,
    private cartService: CartService) {}

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.currentGroup = this.settingsService.settings.currentGroup;
    this.inventoryService.getInventoryByProducts(this.currentGroup).pipe(take(1)).subscribe((products: ProductModel[]) => {
      this.products = products;
    });
  }

  getProductList(searchStr: string) {

    this.searchString = searchStr;

    this.searchBarService.getProductList(searchStr).pipe(take(1)).subscribe((data: ProductModel[]) => {
      this.filtered = data;
    }, error => {
      console.log(error.message)
    });
  }

  updateProductStockCount(product: ProductModel, count: number) {
    this.updateLock = true;
    this.inventoryService.updateStockCount(product._id, count, this.currentGroup).pipe(take(1)).subscribe(
      () => {
        product.stockCount[this.currentGroup] += count;
        this.updateProducts(product);
      }
    )

    if (product.stockCount[this.currentGroup] + count > 0 && product.stockStatus[this.currentGroup] === 'empty' ||
      product.stockCount[this.currentGroup] + count > 0 && !product.stockStatus[this.currentGroup]) {
      this.inventoryService.updateStockStatus(product._id, 'full', this.currentGroup).pipe(take(1)).subscribe(
        () => {
          product.stockStatus[this.currentGroup] = 'full';
          this.updateProducts(product);
        }
      )
    }

    if (product.stockCount[this.currentGroup] + count === 0) {
      this.inventoryService.updateStockStatus(product._id, 'empty', this.currentGroup).pipe(take(1)).subscribe(
        () => {
          product.stockStatus[this.currentGroup] = 'empty';
          this.updateProducts(product);
        }
      )

    }

    setTimeout(() => {
      this.updateLock = false;
    }, 200)

  }

  updateProductStockStatus(product: ProductModel, status: string) {
    if (status === 'empty') {

      this.alertController.create({
        header: 'Out of stock?',
        message: 'Do you want to add this product to cart?',
        inputs: [{
          type: 'number',
          name: 'count',
          placeholder: 'Number of products'
        }],
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.products = this.products.filter(prod => {
              if (prod._id !== product._id) {
                return true;
              }
            })
          }
        }, {
          text: 'Okay',
          handler: (data: {
            count: string
          }) => {
            this.cartService.updateCartCount(product._id, +data.count, this.currentGroup).pipe(take(1)).subscribe(
              () => {
                this.inventoryService.updateStockStatus(product._id, status, this.currentGroup).pipe(take(1)).subscribe(
                  () => {
                    product.stockStatus[this.currentGroup] = status;
                    if (product.stockStatus[this.currentGroup] !== 'empty') {
                      this.updateProducts(product);
                    }
                  }
                )
              }
            )
          }
        }]
      }).then(actionEl => {
        actionEl.present();
      });

    } else {
      this.inventoryService.updateStockStatus(product._id, status, this.currentGroup).pipe(take(1)).subscribe(
        () => {
          product.stockStatus[this.currentGroup] = status;
          if (product.stockStatus[this.currentGroup] !== '') {
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

    this.products = this.products.filter(prod => {
      if (prod.stockStatus[this.currentGroup] !== 'empty') {
        return true;
      }
    });

  }
}
