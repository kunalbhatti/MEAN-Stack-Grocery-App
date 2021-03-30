import {
  Component,
  OnInit
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
  SearchBarService,
} from "./../../services/searchbar.service";
import {
  take
} from "rxjs/operators";
import {
  ToasterService
} from "src/app/services/toaster.service";

import {
  TitleCasePipe
} from '@angular/common';
import {
  Router
} from "@angular/router";

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.css']
})
export class InventoryPage implements OnInit {

  allProducts: ProductModel[] = [];
  products: ProductModel[];
  filtered: ProductModel[];

  searchString: string = '';

  currentGroup: string;
  groupName: string;

  selectedCategory: {
    id: string
    name: string,
  } = {
    id: '',
    name: 'all products'
  };

  sortBy: string = 'none';

  updateLock: boolean = false;

  constructor(private searchBarService: SearchBarService,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private settingsService: SettingsService,
    private cartService: CartService,
    private toasterService: ToasterService,
    private titleCasePipe: TitleCasePipe,
    private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.currentGroup = this.settingsService.settings.currentGroup;

    const groups = this.settingsService.settings.groups;

    if (groups) {
      groups.forEach(group => {
        if (group[this.currentGroup]) {
          this.groupName = group[this.currentGroup];
          return;
        }
      });
    } if(!groups) {
      this.groupName = '';
    }

    this.inventoryService.getInventory(this.selectedCategory.id).pipe(take(1)).subscribe((products: ProductModel[]) => {
      this.allProducts = products;
      this.products = products;
    });
  }

  ionViewDidLeave() {
    this.filtered = [];
    this.products = [];
    this.selectedCategory = {
      id: '',
      name: 'All Products'
    }
    this.sortBy = 'none';
    this.searchString = '';
  }

  getProductList(searchStr: string) {
    this.searchString = searchStr;
    this.filtered = [];

    this.searchBarService.getProductList(searchStr, this.selectedCategory.id).pipe(take(1)).subscribe((data: ProductModel[]) => {
      this.filtered = data;
    }, error => {
      console.log(error.message)
    });
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
      this.products = [product].concat(this.products);
    }

    this.products = this.products.filter(prod => {
      if (prod.stockStatus[this.currentGroup] !== 'empty') {
        return true;
      }
    });

    this.allProducts = this.products;
  }

  updateProductStockCount(product: ProductModel, count: number) {
    if (this.currentGroup.length > 0) {
      this.updateLock = true;
      this.inventoryService.updateStockCount(product._id, count, this.currentGroup).pipe(take(1)).subscribe(
        () => {
          product.stockCount[this.currentGroup] += count;
          this.updateProducts(product);
          this.sortBy = 'none';
          this.updateLock = false;
          this.toasterService.presentToast('', 'Inventoy Updated', 500);
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
    } else {
      this.alertController.create({
        header: 'No Group Selected',
        message: 'Please go to settings and select a group.',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/', 'app', 'settings', 'manage-app'])
          }
        }]
      }).then((alertEl: HTMLIonAlertElement) => {
        alertEl.present();
      })
    }
  }

  updateProductStockStatus(product: ProductModel, status: string) {
    if (this.currentGroup.length > 0) {
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
                  this.toasterService.presentToast('', 'Cart Updated', 500);
                  this.inventoryService.updateStockStatus(product._id, status, this.currentGroup).pipe(take(1)).subscribe(
                    () => {
                      product.stockStatus[this.currentGroup] = status;
                      if (product.stockStatus[this.currentGroup] !== 'empty') {
                        this.updateProducts(product);
                      }
                    }
                  );
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
              this.toasterService.presentToast('', 'Inventoy Updated', 500);
            }

            if (product.stockCount[this.currentGroup] === 0) {
              this.inventoryService.updateStockCount(product._id, 1, this.currentGroup).pipe(take(1)).subscribe(
                () => {
                  product.stockCount[this.currentGroup] = 1;
                  this.updateProducts(product);
                  this.sortBy = 'none';
                  this.toasterService.presentToast('', 'Inventoy Updated', 500);
                }
              )
            }
          }
        )
      }
    } else {
      this.alertController.create({
        header: 'No Group Selected',
        message: 'Please go to settings and select a group.',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/', 'app', 'settings', 'manage-app'])
          }
        }]
      }).then((alertEl: HTMLIonAlertElement) => {
        alertEl.present();
      })
    }
  }

  presentFilterAlert() {
    let filter: any[] = [{
      name: 'all products',
      type: 'radio',
      label: 'All Products',
      value: {
        id: '',
        name: 'All Products'
      },
      checked: this.selectedCategory.id === '' ? true : false
    }];

    let categoryKeys: string[] = []

    const categories = this.settingsService.settings.categories;
    categories.forEach(category => {
      categoryKeys.push(Object.keys(category).toString());
    })

    for (let [i, category] of categories.entries()) {
      filter.push({
        name: category[categoryKeys[i]],
        type: 'radio',
        label: this.titleCasePipe.transform(category[categoryKeys[i]]),
        value: {
          id: categoryKeys[i],
          name: category[categoryKeys[i]]
        },
        checked: this.selectedCategory.id === categoryKeys[i] ? true : false
      });
    }

    this.alertController.create({
      header: 'Filter By:',
      inputs: filter,
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: (data) => {
          this.selectedCategory = data;
          this.applyProductCategoryFilter(this.selectedCategory.id);
        }
      }]
    }).then((actionEl: HTMLIonAlertElement) => {
      actionEl.present();
    });
  }

  presentSortAlert() {
    let filter: any[] = [{
      name: 'none',
      type: 'radio',
      label: 'None',
      value: 'none',
      checked: this.sortBy === 'none' ? true : false
    }, {
      name: 'stockAsc',
      type: 'radio',
      label: 'Ascending',
      value: 'stockAsc',
      checked: this.sortBy === 'stockAsc' ? true : false
    }, {
      name: 'stockDesc',
      type: 'radio',
      label: 'Descending',
      value: 'stockDesc',
      checked: this.sortBy === 'stockDesc' ? true : false
    }];

    this.alertController.create({
      header: 'Sort By:',
      inputs: filter,
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: (data) => {
          this.sortBy = data;
          this.products = this.applyProductSortFilter(data)
        }
      }]
    }).then((actionEl: HTMLIonAlertElement) => {
      actionEl.present();
    })
  }


  applyProductCategoryFilter(cid: string): void {
    if (cid === '') {
      this.products = this.allProducts;
      return;
    }

    const tempProducts: ProductModel[] = [...this.allProducts];

    this.products = tempProducts.filter(prod => {
      if (prod.cid === cid) {
        return true;
      }
    });
  }

  applyProductSortFilter(sortBy: string): ProductModel[] {

    const tempProducts: ProductModel[] = [...this.allProducts];
    let products: ProductModel[];

    if (sortBy === 'none') {
      products = this.allProducts;
      return;
    }

    if (sortBy === 'stockAsc') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {

        return prod1.stockCount[this.currentGroup] - prod2.stockCount[this.currentGroup];
      })
    }


    if (sortBy === 'stockDesc') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {

        return prod2.stockCount[this.currentGroup] - prod1.stockCount[this.currentGroup];
      })
    }

    if (sortBy === 'name') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {
        if (prod1.name < prod2.name) {
          return -1;
        }
        if (prod1.name > prod2.name) {
          return 1;
        }
        return 0;
      });
    }

    return products;

  }
}
