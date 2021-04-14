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
  FilterProductsComponent
} from '../cart/modals/filter-products/filter-products.component';
import {
  SortProductsComponent
} from '../cart/modals/sort-products/sort-products.component';

// services
import {
  CartService
} from './../../services/cart.service';
import {
  InventoryService
} from './../../services/inventory.service';
import {
  SettingsService
} from './../../services/settings.service';
import {
  SearchBarService,
} from './../../services/searchbar.service';
import {
  ToasterService
} from './../../services/toaster.service';

// models
import {
  ProductModel
} from './../../models/product.model';
import {
  SettingsModel
} from './../../models/settings.model';

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.css']
})
export class InventoryPage {

  allProducts: ProductModel[] = [];

  // products array is used for rendering products with stockCount greater than zero
  products: ProductModel[];

  // filtered array is used for rendering products filtered from searchbar
  filtered: ProductModel[] = [];

  currentGroup: string;
  groupName: string;

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
  filterError: string = '';
  searchString: string = '';
  searchStatus: string = 'No Items Found';
  filterStatus: string;
  getProductsView: string;
  showDoneButton: boolean = false;

  // all buttons are disabled when the update lock is true
  updateLock: boolean = false;

  constructor(private searchBarService: SearchBarService,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private settingsService: SettingsService,
    private cartService: CartService,
    private toasterService: ToasterService,
    private router: Router) {}

  ionViewDidEnter() {

    this.searchStatus = 'Loading Inventory';

    this.getProductsView = this.settingsService.settings.getProductsView;

    // extracting the currentGroup name from the settings
    try {
      this.currentGroup = this.settingsService.settings.currentGroup;
    } catch (error) {
      this.currentGroup = '';
    }

    if (!this.currentGroup) {
      this.presentAddGroupAlert();
    }

    let groups = [];

    try {
      groups = this.settingsService.settings.groups;
    } catch (error) {
      groups = [];
    }

    if (groups) {
      groups.forEach(group => {
        if (group[this.currentGroup]) {
          this.groupName = group[this.currentGroup];
          return;
        }
      });
    }
    if (!groups) {
      this.groupName = '';
    }

    if (this.currentGroup) {
      this.inventoryService.getInventory(this.getProductsView, this.selectedCategory.id).pipe(take(1)).subscribe((products: ProductModel[]) => {
        // maintainig original copy of the data
        // used to render products the searchbar is cleared
        this.allProducts = products;
        this.products = products;
        if (this.products.length === 0) {
          this.searchStatus = 'No Items Found';
        }
      }, (error: any) => {
        this.productError = error;
        this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
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
    if (this.getProductsView === 'all') {
      this.filterProducts(searchStr);
    } else {
      this.filtered = [];
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
          }
        }, (error: string) => {
          this.filterError = error;
          this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        });
      }

      if (searchStr !== '') {
        this.showDoneButton = false;
      }
    }
  }


  updateProductStockCount(product: ProductModel, count: number): void {
    if (this.currentGroup.length > 0) {
      this.updateLock = true;
      this.inventoryService.updateStockCount(product._id, count, this.currentGroup).pipe(take(1)).subscribe(
        () => {
          product.stockCount[this.currentGroup] += count;
          this.updateProducts(product);
          // neutralize sort filter
          this.sortBy = 'none';
          this.updateLock = false;
          this.toasterService.presentToast('', 'Inventoy Updated', 500);
        }, (error: string) => {
          this.updateLock = false;
          this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
        }
      );

      if (product.stockCount[this.currentGroup] + count > 0 && product.stockStatus[this.currentGroup] === 'empty' ||
        product.stockCount[this.currentGroup] + count > 0 && !product.stockStatus[this.currentGroup]) {
        this.inventoryService.updateStockStatus(product._id, 'full', this.currentGroup).pipe(take(1)).subscribe(
          () => {
            product.stockStatus[this.currentGroup] = 'full';
            this.updateProducts(product);
          }, (error: string) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
          }
        );
      }

      if (product.stockCount[this.currentGroup] + count === 0) {
        this.inventoryService.updateStockStatus(product._id, 'empty', this.currentGroup).pipe(take(1)).subscribe(
          () => {
            product.stockStatus[this.currentGroup] = 'empty';
            this.updateProducts(product);
          }, (error: string) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
          }
        );
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
      });
    }
  }

  updateProductStockStatus(product: ProductModel, status: string): void {
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
              if (this.getProductsView === 'partial') {
                this.products = this.products.filter(prod => {
                  if (prod._id !== product._id) {
                    return true;
                  }
                });
              }
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
                }, (error: string) => {
                  this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                }
              );
            }
          }]
        }).then((alertEl: HTMLIonAlertElement) => {
          alertEl.present();
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
                }, (error: string) => {
                  this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
                }
              );
            }
          }, (error: string) => {
            this.toasterService.presentToast('Failure!!', error, 2000, 'danger');
          }
        );
      }
    } else {
      this.presentAddGroupAlert();
    }
  }

  // popover and alert functions
  presentCategoryFilterAlert(): void {
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
      data: {
        id: string,
        name: string
      },
      role: string
    }) => {
      if (popoverResult.role === 'filter') {
        this.selectedCategory.id = popoverResult.data.id;
        this.selectedCategory.name = popoverResult.data.name;
        this.applyProductCategoryFilter(this.selectedCategory.id);
      }
    });
  }

  presentSortAlert(): void {
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

  presentInventoryActionSheet(product: ProductModel) {
    this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Cancel',
        icon: 'close-outline',
        role: 'desctructive'
      }, {
        text: 'Manage Product',
        icon: 'create-outline',
        handler: () => {
          this.filtered = [];
          this.filtered.push(product);
          this.showDoneButton = true;
          this.searchString = product.name;
        }
      }]
    }).then((actionEl: HTMLIonActionSheetElement) => {
      actionEl.present();
    })
  }

  presentAddGroupAlert() {
    this.alertController.create({
      header: 'No Group Selected',
      message: 'Please go to settings and select a group.',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['/', 'app', 'settings', 'manage-app'])
        }
      }]
    }).then((alertEl: HTMLIonAlertElement) => {
      alertEl.present();
    });

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

    if (this.getProductsView === 'partial') {
      this.products = this.products.filter((prod: ProductModel) => {
        if (prod.stockStatus[this.currentGroup] !== 'empty') {
          return true;
        }
      });
    }

    this.allProducts = this.products;
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
      return products;
    }

    if (sortBy === 'price') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {
        return +prod1.price - +prod2.price;
      });
    }


    if (sortBy === 'units') {
      products = tempProducts.sort((prod1: ProductModel, prod2: ProductModel) => {
        return prod1.stockCount[this.currentGroup] - prod2.stockCount[this.currentGroup];
      });
    }

    return products;

  }


  filterProducts(searchStr: string): void {
    // regex will remove special characters from the search string
    searchStr = searchStr.replace(/[^a-zA-Z]/g, '');

    if (searchStr !== '') {
      this.searchString = searchStr;
      let tempArr = [];

      let regExp: RegExp = new RegExp(`^.*${searchStr}.*$`, 'i');

      for (let product of this.allProducts) {
        if (regExp.test(product.name)) {
          tempArr.push(product);
        }
      }

      this.filtered = tempArr;
    }

    if (searchStr === '') {
      this.filtered = [];
    }
  }

}
