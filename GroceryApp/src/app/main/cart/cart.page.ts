import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  PopoverController
} from '@ionic/angular';
import {
  take
} from 'rxjs/operators';

// components
import {
  ConfirmDeleteComponent
} from '../settings/manage-app/modals/confirm-delete/confirm-delete.component';
import {
  AddToInventoryComponent
} from './modals/add-to-inventory/add-to-inventory.component';
import {
  FilterProductsComponent
} from './modals/filter-products/filter-products.component';
import {
  SortProductsComponent
} from './modals/sort-products/sort-products.component';

// services
import {
  CartService
} from './../../services/cart.service';
import {
  InventoryService
} from './../../services/inventory.service';
import {
  ExpenseService
} from './../../services/expense.service';
import {
  ToasterService
} from './../../services/toaster.service';
import {
  SettingsService
} from './../../services/settings.service';
import {
  SearchBarService
} from './../../services/searchbar.service';

// models
import {
  ProductModel
} from './../../models/product.model';
import {
  ExpenseModel
} from './../../models/expense.model';
import {
  SettingsModel
} from './../../models/settings.model';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.css']
})
export class CartPage {

  allProducts: ProductModel[] = [];

  // products array is used for rendering products with cart count greater than zero
  products: ProductModel[];

  // filtered array is used for rendering products filtered from searchbar
  filtered: ProductModel[];

  currentGroup: {
    id: string,
    name: string
  } = {
    id: '',
    name: ''
  };

  // stores filtered value for categories
  // default is all products
  selectedCategory: {
    id: string
    name: string,
  } = {
    id: '',
    name: 'all products'
  };

  // sort filter
  // sort by price or cart units
  sortBy: string = 'none';


  productError: string = '';
  searchString: string = '';
  searchStatus: string;
  filterStatus: string;

  cartCost: number = 0;
  filteredCost: number = 0;

  // all buttons are disabled when the update lock is true
  updateLock: boolean = false;

  constructor(private settingsService: SettingsService,
    private toasterService: ToasterService,
    private cartService: CartService,
    private inventoryService: InventoryService,
    private searchBarService: SearchBarService,
    private expenseService: ExpenseService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private router: Router) {}

  ionViewDidEnter() {
    this.searchStatus = 'Loading Inventory';

    // extracting the currentGroup name from the settings
    try {
      this.currentGroup.id = this.settingsService.settings.currentGroup;
    } catch (error) {
      this.currentGroup.id = '';
    }

    if (this.currentGroup.id) {


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
        // maintainig original copy of the data
        // used to render products the searchbar is cleared
        this.allProducts = [...products];

        this.products = products;

        if (this.products.length === 0) {
          this.searchStatus = 'No Items Found';
        } else {
          this.cartCost = 0;
          this.cartCost = this.calculateCartCost(this.products);
        }
      }, (error: string) => {
        this.productError = error;
      });
    }
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

  getProductList(searchStr: string): void {

    // regex will remove special characters from the search string
    searchStr = searchStr.replace(/[^a-zA-Z]/g, '');

    this.searchString = searchStr;

    if (searchStr !== '') {
      this.filterStatus = 'Searching Products'
      this.filtered = [];

      this.searchBarService.getProductList(searchStr, this.selectedCategory.id).pipe(take(1)).subscribe((data: ProductModel[]) => {
        this.filtered = data;
        if (this.filtered.length === 0) {
          this.filterStatus = 'No Items Found';
        } else {
          this.filteredCost = 0;
          this.filteredCost = this.calculateCartCost(this.filtered);
        }
      }, (error: string) => {
        this.productError = error;
      });
    }
  }


  updateProductCartCount(product: ProductModel, count: number): void {
    if (this.currentGroup.id.length > 0) {
      this.updateLock = true;
      this.cartService.updateCartCount(product._id, count, this.currentGroup.id).pipe(take(1)).subscribe(
        () => {
          product.cart[this.currentGroup.id] += count;
          this.updateProducts(product);
          // neutralize sort filter
          this.sortBy = 'none';
          this.updateLock = false;
          this.toasterService.presentToast('', 'Cart Updated', 500);
        }, (error: string) => {
          this.productError = error;
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
            this.router.navigate(['/', 'app', 'settings', 'manage-app']);
          }
        }]
      }).then((alertEl: HTMLIonAlertElement) => {
        alertEl.present();
      });
    }
  }

  // popover and alert functions

  presentFilterPopover(): void {
    let categories: SettingsModel['categories'] = [{
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

  presentSortPopover(): void {
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

  presentCartActionSheet(product: ProductModel): void {
    this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Cancel',
        icon: 'close-outline',
        role: 'destructive'
      }, {
        text: 'Manage Product',
        icon: 'create-outline',
        handler: () => {
          this.getProductList(product.name);
          this.searchString = product.name;
        }
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
              // only add to inventory when the units and cost is greater that zero
              if (popoverResult.data.units > 0 && popoverResult.data.cost > 0) {
                // first update the products cart count to zero by subracting  product.cart[this.currentGroup.id]
                this.cartService.updateCartCount(product._id, -product.cart[this.currentGroup.id], this.currentGroup.id).subscribe(
                  () => {
                    /// update the products cart count locally
                    product.cart[this.currentGroup.id] -= product.cart[this.currentGroup.id];
                    this.updateProducts(product);
                    this.sortBy = 'none';
                    this.updateLock = false;

                    // update the inventory
                    this.inventoryService.updateStockCount(product._id, popoverResult.data.units, this.currentGroup.id).subscribe(
                      () => {
                        // if the products was previously empty, update the stok status to full
                        if (product.stockCount[this.currentGroup.id] === 0) {
                          this.inventoryService.updateStockStatus(product._id, 'full', this.currentGroup.id).subscribe(
                            () => {}, (error: string) => {
                              this.productError = error;
                            }
                          );
                        }

                        const expense: ExpenseModel = {
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

                        // adding expense
                        this.expenseService.addExpense(expense).subscribe(
                          () => {

                          }, (error: string) => {
                            this.productError = error;
                          }
                        );
                        this.toasterService.presentToast('', 'Inventory Updated', 500);
                      }
                    );
                  }, (error: string) => {
                    this.productError = error;
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

  // utility functions

  updateProducts(product: ProductModel): void {
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

    this.products = this.products.filter((prod: ProductModel) => {
      if (prod.cart[this.currentGroup.id] !== 0) {
        return true;
      }
    });

    this.allProducts = [...this.products];
  }

  applyProductCategoryFilter(cid: string): void {
    if (cid === '') {
      this.cartCost = 0;
      this.cartCost = this.calculateCartCost(this.products);
      return;
    }

    const tempProducts: ProductModel[] = [...this.allProducts];

    this.products = tempProducts.filter((prod: ProductModel) => {
      if (prod.cid === cid) {
        return true;
      }
    });

    this.cartCost = 0;
    this.cartCost = this.calculateCartCost(this.products);

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

  calculateCartCost(products: ProductModel[]): number {
    let cost = 0
    products.forEach((prod: ProductModel) => {
      cost += +prod.cart[this.currentGroup.id] * +prod.price;
    });
    return cost;
  }

}
