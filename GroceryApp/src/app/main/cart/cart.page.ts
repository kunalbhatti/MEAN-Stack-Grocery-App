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
import {
  ExpensesService
} from "src/app/services/expenses.service";
import {
  ExpensesModel
} from "src/app/models/expense.model";
import {
  AddToInventoryComponent
} from "./modals/add-to-inventory/add-to-inventory.component";
import {
  FilterProductsComponent
} from "./modals/filter-products/filter-products.component";
import {
  SortProductsComponent
} from "./modals/sort-products/sort-products.component";

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
    private expensesService: ExpensesService,
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

    searchStr = searchStr.replace(/[^a-zA-Z]/g, "");

    this.searchString = searchStr;
    if (searchStr !== '') {
      this.filterStatus = 'Searching Products'
      this.filtered = [];

      this.searchBarService.getProductList(searchStr, this.selectedCategory.id).pipe(take(1)).subscribe((data: ProductModel[]) => {
        this.filtered = data;
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

    let categories: {
      [id: string]: string
    } [] = [{
      '': 'All Products'
    }, ];

    categories = categories.concat(this.settingsService.settings.categories);

    this.popoverController.create({
      component: FilterProductsComponent,
      componentProps: {
        categories,
        selectedCategory: this.selectedCategory.id
      }
    }).then((popoverEl: HTMLIonPopoverElement) => {
      popoverEl.present();
      return popoverEl.onDidDismiss();
    }).then((popoverResult: {
      data: string,
      role: string
    }) => {
      if (popoverResult.role === 'filter') {
        this.selectedCategory.id = popoverResult.data;
        this.applyProductCategoryFilter(this.selectedCategory.id);

      }
    });
  }

  presentSortAlert() {
    this.popoverController.create({
      component: SortProductsComponent,
      componentProps: {
        sortBy: this.sortBy
      },
    }).then((popoverEl: HTMLIonPopoverElement) => {
      popoverEl.present();
      return popoverEl.onDidDismiss();
    }).then((popoverResult: {
      data: string,
      role: string
    }) => {
      if (popoverResult.role === 'filter') {
        this.sortBy = popoverResult.data;
        this.products = this.applyProductSortFilter(popoverResult.data)
      }
    });
  }


  applyProductCategoryFilter(cid: string): void {
    if (cid === '') {
      this.products = this.allProducts;
      return;
    }

    const tempProducts: ProductModel[] = [...this.allProducts];

    this.products = tempProducts.filter((prod: ProductModel) => {
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
      return products;
    }

    if (sortBy === 'price') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {
        return +prod1.price - +prod2.price;
      });
    }


    if (sortBy === 'units') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {
        return prod1.cart[this.currentGroup.id] - prod2.cart[this.currentGroup.id];
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
          this.popoverController.create({
            component: AddToInventoryComponent,
            componentProps: {
              product,
              gid: this.currentGroup.id
            }
          }).then((popoverEl: HTMLIonPopoverElement) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then((popoverResult: {
            data: {
              units: number,
              cost: number
            },
            role: string
          }) => {
            if (popoverResult.role == 'create') {
              if (popoverResult.data.units > 0 && popoverResult.data.cost > 0) {
                this.cartService.updateCartCount(product._id, -product.cart[this.currentGroup.id], this.currentGroup.id).subscribe(
                  () => {
                    product.cart[this.currentGroup.id] -= product.cart[this.currentGroup.id];
                    this.updateProducts(product);
                    this.sortBy = 'none';
                    this.updateLock = false;
                    this.inventoryService.updateStockCount(product._id, popoverResult.data.units, this.currentGroup.id).subscribe(
                      () => {
                        if (product.stockCount[this.currentGroup.id] === 0) {
                          this.inventoryService.updateStockStatus(product._id, 'full', this.currentGroup.id).subscribe(
                            () => {}
                          );
                        }
                        const expense: ExpensesModel = {
                          pid: product._id,
                          cid: product.cid,
                          gid: this.currentGroup.id,
                          cost: popoverResult.data.cost,
                          units: popoverResult.data.units,
                          name: product.name,
                          brand: product.brand,
                          date: {
                            date: new Date().getDate(),
                            month: new Date().getMonth() + 1,
                            year: new Date().getFullYear()
                          }
                        }

                        this.expensesService.addExpense(expense).subscribe(
                          () => {

                          }
                        )
                        this.toasterService.presentToast('', 'Inventory Updated', 500);
                      }
                    );
                  }
                );
              }
            }
          });
        }
      }, {
        text: 'Remove From Cart',
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
          });
        }
      }]
    }).then((actionEl: HTMLIonActionSheetElement) => {
      actionEl.present();
    })
  }


}
