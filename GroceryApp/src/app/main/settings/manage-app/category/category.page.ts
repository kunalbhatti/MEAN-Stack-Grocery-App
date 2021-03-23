import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  ActionSheetController,
  ModalController,
  PopoverController
} from '@ionic/angular';

import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  CreateProductComponent
} from './../modals/create-product/create-product.component';
import {
  ConfirmDeleteComponent
} from './../modals/confirm-delete/confirm-delete.component';

import {
  ToasterService
} from '../../../../services/toaster.service';
import {
  SettingsService
} from '../../../../services/settings.service';

import {
  ProductModel
} from '../../../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit {

  category: string;
  cid: string;

  addProductForm: boolean;

  products: ProductModel[];

  productError: string;

  constructor(private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private toasterService: ToasterService,
    private settingsService: SettingsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.addProductForm = false;
    this.productError = '';


    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.category = params.get('category')
        this.cid = params.get('cid');
        this.settingsService.getProducts(this.cid).subscribe(
          (productsData: [
            products: ProductModel
          ]) => {
            if (productsData) {
              this.products = productsData;
            } else {
              this.products = [];
            }
          }, (error: string) => {
            this.productError = error;
          }
        );
      }
    );

  }

  onDismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }


  presentProductActionSheet(product: ProductModel): void {
    this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Close',
        icon: 'close-outline',
        role: 'destructive'
      }, {
        text: 'Edit',
        icon: 'create-outline',
        handler: () => {
          this.presentProductModal(product);
        }
      }, {
        text: 'Delete',
        icon: 'trash-outline',
        handler: () => {
          this.popoverController.create({
            component: ConfirmDeleteComponent,
            componentProps: {
              type: 'product'
            }
          }).then((popoverEl: HTMLIonPopoverElement) => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then(
            popoverResult => {
              if (popoverResult.role === 'delete') {
                this.settingsService.deleteProduct(product._id).subscribe(
                  () => {
                    this.toasterService.presentToast('Success!!', 'Product was deleted successfully', 2000);
                    this.products = this.products.filter(
                      prod => {
                        if (prod._id !== product._id) {
                          return true;
                        }
                      }
                    );
                  }, error => {
                    this.productError = error;
                  }
                );
              }
            }
          )
        }
      }]
    }).then((actionEl: HTMLIonActionSheetElement) => {
      actionEl.present();
    })
  }

  presentProductModal(product ? : ProductModel): void {
    this.modalController.create({
      component: CreateProductComponent,
      componentProps: {
        product,
        cid: this.cid
      }
    }).then(
      (modalEl: HTMLIonModalElement) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      }
    ).then(modalResult => {

      if (modalResult.role === 'create') {
        this.toasterService.presentToast('Success!!', 'Product was added successfully', 2000);
        this.products.push(modalResult.data);
      }

      if (modalResult.role === 'edit') {
        this.toasterService.presentToast('Success!!', 'Product was editted successfully', 2000);
        const index: number = this.products.findIndex((prod: ProductModel) => {
          if (prod._id === product._id) {
            return true;
          }
        });
        this.products[index] = modalResult.data;
      }
    });
  }
}
