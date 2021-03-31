import {
  Component,
  OnInit
} from "@angular/core";
import {
  take
} from "rxjs/operators";
import {
  Router
} from '@angular/router';
import {
  ProductModel
} from "./../../models/product.model";
import {
  CartService
} from "./../../services/cart.service";

import {
  SettingsService
} from "./../../services/settings.service";
import {
  SearchBarService
} from './../../services/searchbar.service';
import {
  ActionSheetController,
  AlertController,
  PopoverController
} from "@ionic/angular";
import {
  TitleCasePipe
} from "@angular/common";
import {
  ToasterService
} from "src/app/services/toaster.service";
import {
  ConfirmDeleteComponent
} from "../settings/manage-app/modals/confirm-delete/confirm-delete.component";
import {
  InventoryService
} from "./../../services/inventory.service";

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.css']
})
export class CartPage implements OnInit {

  allProducts: ProductModel[] = [];
  products: ProductModel[];
  filtered: ProductModel[];

  productError: string = '';

  searchString: string = '';

  currentGroup: {
    id: string,
    name: string
  } = {
    id: '',
    name: ''
  };

  selectedCategory: {
    id: string
    name: string,
  } = {
    id: '',
    name: 'all products'
  };

  sortBy: string = 'none';

  searchStatus: string;
  filterStatus: string;

  updateLock: boolean = false;

  constructor(private settingsService: SettingsService,
    private cartService: CartService,
    private inventoryService: InventoryService,
    private searchBarService: SearchBarService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private toasterService: ToasterService,
    private titleCasePipe: TitleCasePipe,
    private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.searchStatus = 'Loading Inventory';
    this.currentGroup.id = this.settingsService.settings.currentGroup;

    const groups = this.settingsService.settings.groups;

    if (groups) {
      groups.forEach(group => {
        if (group[this.currentGroup.id]) {
          this.currentGroup.name = group[this.currentGroup.id];
          return;
        }
      });
    }
    if (!groups) {
      this.currentGroup = {
        id: '',
        name: ''
      };
    }

    this.cartService.getCart(this.currentGroup.id, this.selectedCategory.id).pipe(take(1)).subscribe((products: ProductModel[]) => {
      this.allProducts = products;
      this.products = products;
      if (this.products.length === 0) {
        this.searchStatus = 'No Items Found';
      }
    }, (error: string) => {
      this.productError = error;
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
    if (searchStr !== '') {
      this.filterStatus = 'Searching Products'
      this.filtered = [];

      this.searchBarService.getProductList(searchStr, this.selectedCategory.id).pipe(take(1)).subscribe((data: ProductModel[]) => {
        this.filtered = data;
        console.log(this.filtered)
        if (this.filtered.length === 0) {
          this.filterStatus = 'No Items Found';
        }
      }, (error: string) => {
        this.productError = error;
      });
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
      this.products = [product].concat(this.products);
    }

    this.products = this.products.filter(prod => {
      if (prod.cart[this.currentGroup.id] !== 0) {
        return true;
      }
    });

    this.allProducts = this.products;
  }

  updateProductCartCount(product: ProductModel, count: number) {
    if (this.currentGroup.id.length > 0) {
      this.updateLock = true;
      this.cartService.updateCartCount(product._id, count, this.currentGroup.id).pipe(take(1)).subscribe(
        () => {
          product.cart[this.currentGroup.id] += count;
          this.updateProducts(product);
          this.sortBy = 'none';
          this.updateLock = false;
          this.toasterService.presentToast('', 'Cart Updated', 500);
        }
      );
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

        return prod1.cart[this.currentGroup.id] - prod2.cart[this.currentGroup.id];
      })
    }


    if (sortBy === 'stockDesc') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {

        return prod2.cart[this.currentGroup.id] - prod1.cart[this.currentGroup.id];
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

  presentCartActionSheet(product: ProductModel) {
    this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Cancel',
        icon: 'close-outline',
        role: 'destructive'
      }, {
        text: 'Add To Inventory',
        icon: 'home-outline',
        handler: () => {
          this.alertController.create({
            header: 'Item Purchased?',
            message: 'Please specify the following details.',
            inputs: [{
              name: 'count',
              type: 'number',
              value: 'stock',
              min: 0,
              placeholder: 'Units Purchased'
            }, {
              name: 'price',
              type: 'number',
              value: 'price',
              min: 0,
              placeholder: 'Cost Per Unit'
            }],
            buttons: [{
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Ok',
              handler: (data: {
                count: number,
                price: number
              }) => {
                if (data.count > 0 && data.price > 0) {
                  this.cartService.updateCartCount(product._id, -product.cart[this.currentGroup.id], this.currentGroup.id).subscribe(
                    () => {
                      product.cart[this.currentGroup.id] -= product.cart[this.currentGroup.id];
                      this.updateProducts(product);
                      this.sortBy = 'none';
                      this.updateLock = false;
                      this.inventoryService.updateStockCount(product._id, data.count, this.currentGroup.id).subscribe(
                        () => {
                          if (product.stockCount[this.currentGroup.id] === 0) {
                            this.inventoryService.updateStockStatus(product._id, 'full', this.currentGroup.id).subscribe(
                              () => {
                                this.toasterService.presentToast('', 'Inventory Updated', 500);
                              }
                            )
                          }
                        }
                      )
                    }
                  );
                }
              }
            }]
          }).then((alertEl: HTMLIonAlertElement) => {
            alertEl.present();
          });
        }
      }, {
        text: 'Remove Product',
        icon: 'bag-remove-outline',
        handler: () => {
          this.popoverController.create({
            component: ConfirmDeleteComponent,
            componentProps: {
              type: 'Cart Item',
              message: 'Are you sure you want to remove this item from the cart?'
            }
          }).then((popoverEl: HTMLIonPopoverElement) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then(popoverResult => {
            if (popoverResult.role === 'delete') {
              this.cartService.updateCartCount(product._id, -product.cart[this.currentGroup.id], this.currentGroup.id).subscribe(
                () => {
                  product.cart[this.currentGroup.id] -= product.cart[this.currentGroup.id];
                  this.updateProducts(product);
                  this.sortBy = 'none';
                  this.updateLock = false;
                  this.toasterService.presentToast('', 'Cart Updated', 500);
                }
              );
            }
          })
        }
      }]
    }).then((actionEl: HTMLIonActionSheetElement) => {
      actionEl.present();
    })
  }


}
