import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  ActionSheetController,
  PopoverController
} from '@ionic/angular';
import {
  Router
} from '@angular/router';

import * as uuid from 'uuid';

// services
import {
  SettingsService
} from './../../../services/settings.service';
import {
  ToasterService
} from './../../../services/toaster.service';
import {
  ConfirmDeleteComponent
} from './modals/confirm-delete/confirm-delete.component';

//models
import {
  SettingsModel
} from './../../../models/settings.model';

@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.page.html',
  styleUrls: ['./manage-app.page.scss'],
})
export class ManageAppPage implements OnInit {

  settings: SettingsModel;

  groupError: string = '';
  addGroupForm: boolean;
  groups: SettingsModel['groups'];
  selectedGroup: {
    group: string,
    gid: string
  };

  currentGroup: string;

  categoryError: string = '';
  addCategoryForm: boolean;
  categories: SettingsModel['categories'];

  selectedCategory: {
    category: string,
    cid: string
  };

  expenseError: string = '';
  addExpenseForm: boolean;
  expenses: SettingsModel['expenses'];
  selectedExpense: {
    expense: string,
    eid: string
  };


  constructor(private settingsService: SettingsService,
    private toasterService: ToasterService,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private router: Router) {}

  ngOnInit() {
    this.addGroupForm = false;
    this.addCategoryForm = false;
    this.addExpenseForm = false;

    this.settings = this.settingsService.settings

    if (this.settings) {
      const userData: SettingsModel = this.settings;
      this.currentGroup = userData.currentGroup;
      if (userData.groups && userData.groups.length > 0) {
        this.groups = userData.groups;
      } else {
        this.groups = [];
      }
      if (userData.categories && userData.categories.length > 0) {
        this.categories = userData.categories;
      } else {
        this.categories = [];
      }
      if (userData.expenses && userData.expenses.length > 0) {
        this.expenses = userData.expenses;
      } else {
        this.expenses = [];
      }
    } else {
      this.groups = [];
      this.categories = [];
      this.expenses = [];
    }

  }

  addCategory(form: NgForm): void {

    const categoryName: string = form.value.category.toLowerCase().trim();

    const index: number = this.categories.findIndex((catg: {
      [cid: string]: string
    }) => {
      if (this.getKeyVal(catg).value.toLowerCase() === categoryName) {
        return true;
      }
    });

    if (index !== -1) {
      return;
    }

    const cid: string = uuid.v4();

    const category: {
      [cid: string]: string
    } = {
      [cid]: categoryName
    };

    this.categories.push(category);

    this.settingsService.updateCategories(this.categories).subscribe(
      () => {
        form.reset();
        this.updateSettings('categories', this.categories);
        this.toasterService.presentToast('Success!!', 'Category was added successfully', 500);
        this.addCategoryForm = false;
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    );
  }

  editCategory(form: NgForm): void {
    const category: string = form.value.category.trim().toLowerCase();

    if (this.selectedCategory.category === category) {
      form.reset();
      this.selectedCategory = null;
      this.addCategoryForm = false;
      return;
    }

    const index: number = this.categories.findIndex((catg: {
      [cid: string]: string
    }) => {
      if (catg[this.selectedCategory.cid] === this.selectedCategory.category) {
        return true;
      }
    });

    this.categories[index][this.selectedCategory.cid] = category;

    this.settingsService.updateCategories(this.categories).subscribe(
      () => {
        form.reset();
        this.updateSettings('categories', this.categories);
        this.toasterService.presentToast('Success!!', 'Category was editted successfully', 500);
        this.selectedCategory = null;
        this.addCategoryForm = false;
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    );
  }

  setCurrentGroup(groupId: string): void {
    this.settingsService.updateCurrentGroup(groupId).subscribe(
      () => {
        this.updateSettings('currentGroup', groupId);
        if (this.groups.length === 1) {
          this.currentGroup = groupId;
        }
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    )
  }

  addGroup(form: NgForm): void {

    const groupName: string = form.value.group.toLowerCase().trim();

    if (this.groups.length === 3) {
      return;
    }

    const index: number = this.groups.findIndex((grp: {
      [gid: string]: string
    }) => {
      if (this.getKeyVal(grp).value.toLowerCase() === groupName) {
        return true;
      }
    });

    if (index !== -1) {
      return;
    }

    const gid: string = uuid.v4();

    const group: {
      [gid: string]: string
    } = {
      [gid]: groupName
    };

    this.groups.push(group);
    this.settingsService.updateGroup(this.groups).subscribe(
      () => {
        form.reset();
        this.updateSettings('groups', this.groups);
        this.toasterService.presentToast('Success!!', 'Group was added successfully', 500);
        this.addGroupForm = false;

        if (this.groups.length === 1) {
          const cgid = Object.keys(this.groups[0]).toString();
          this.setCurrentGroup(cgid);
        }

      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    );
  }

  editGroup(form: NgForm): void {
    const group: string = form.value.group.toLowerCase().trim();

    if (this.selectedGroup.group === group) {
      form.reset();
      this.selectedGroup = null;
      this.addGroupForm = false;
      return;
    }

    const index: number = this.groups.findIndex((grp: {
      [gid: string]: string
    }) => {
      if (grp[this.selectedGroup.gid] === this.selectedGroup.group) {
        return true;
      }
    });

    this.groups[index][this.selectedGroup.gid] = group;

    this.settingsService.updateGroup(this.groups).subscribe(
      () => {
        form.reset();
        this.updateSettings('groups', this.groups);
        this.toasterService.presentToast('Success!!', 'Group was editted successfully', 2000);
        this.selectedGroup = null;
        this.addGroupForm = false;
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    );
  }


  addExpense(form: NgForm): void {
    const expenseName: string = form.value.expense.toLowerCase().trim();

    const index: number = this.expenses.findIndex((exp: {
      [eid: string]: string
    }) => {
      if (this.getKeyVal(exp).value.toLowerCase() === expenseName) {
        return true;
      }
    });

    if (index !== -1) {
      return;
    }

    const eid: string = uuid.v4();

    const expense: {
      [eid: string]: string
    } = {
      [eid]: expenseName
    };

    this.expenses.push(expense);

    this.settingsService.updateExpenses(this.expenses).subscribe(
      () => {
        form.reset();
        this.updateSettings('expenses', this.expenses);
        this.toasterService.presentToast('Success!!', 'Expense was added successfully', 500);
        this.addExpenseForm = false;
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    );
  }

  editExpense(form: NgForm): void {
    const expenseName: string = form.value.expense.toLowerCase().trim();

    if (this.selectedExpense.expense === expenseName) {
      form.reset();
      this.selectedExpense = null;
      this.addExpenseForm = false;
      return;
    }


    const index: number = this.expenses.findIndex((exp: {
      [exp: string]: string
    }) => {
      if (exp[this.selectedExpense.eid] === this.selectedExpense.expense) {
        return true;
      }
    });

    this.expenses[index][this.selectedExpense.eid] = expenseName;

    this.settingsService.updateExpenses(this.expenses).subscribe(
      () => {
        form.reset();
        this.updateSettings('expenses', this.expenses);
        this.toasterService.presentToast('Success!!', 'Expense was editted successfully', 2000);
        this.selectedExpense = null;
        this.addExpenseForm = false;
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    );
  }

  updateGetProductView(viewValue: string): void {
    this.settingsService.updateGetProductsView(viewValue).subscribe(
      () => {
        this.updateSettings('getProductsView', viewValue);
      }, (error: string) => {
        this.toasterService.presentToast('Failure!!', error, 500, 'danger');
      }
    )
  }

  presentGroupActionSheet(group: string, gid: string): void {
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
            this.addGroupForm = true;
            this.selectedGroup = {
              group,
              gid
            };
          }

        },
        // {
        //   text: 'Delete',
        //   icon: 'trash-outline',
        //   handler: () => {
        //     this.popoverController.create({
        //       component: ConfirmDeleteComponent,
        //       componentProps: {
        //         type: 'Group',
        //         message: 'Are you sure you want to delete this group?'
        //       }
        //     }).then(popoverEl => {
        //       popoverEl.present();
        //       return popoverEl.onDidDismiss();
        //     }).then(
        //       popoverResult => {
        //         if (popoverResult.role === 'delete') {
        //           const groupArr = this.groups.filter((grp: {
        //             [gid: string]: string
        //           }) => {
        //             if (grp[gid] !== group) {
        //               return true;
        //             }
        //           });

        //           this.settingsService.updateGroup(groupArr).subscribe(
        //             (result: {
        //               groups: {
        //                 [gid: string]: string
        //               } []
        //             }) => {
        //               this.toasterService.presentToast('Success!!', 'Group was deleted successfully', 2000);
        //               this.groups = result.groups;
        //               this.updateSettings('groups', this.groups);

        //               if (gid === this.currentGroup && this.groups.length > 0) {
        //                 const cgid = Object.keys(this.groups[0]).toString();
        //                 this.setCurrentGroup(cgid);
        //                 this.currentGroup = cgid;
        //               }

        //               if (this.groups.length === 0) {
        //                 this.setCurrentGroup('');
        //                 this.currentGroup = '';
        //               }
        //             }, (error: string) => {
        //               this.toasterService.presentToast('Failure!!', error, 500, 'danger');
        //             }
        //           );
        //         }
        //       });
        //   }
        // }
      ]
    }).then((actionEl: HTMLIonActionSheetElement) => {
      actionEl.present();
    })
  }

  presentCategoryActionSheet(category: string, cid: string): void {
    this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Close',
        icon: 'close-outline',
        role: 'destructive'
      }, {
        text: 'Products',
        icon: 'prism-outline',
        handler: () => {
          this.router.navigate(['/', 'app', 'settings', 'manage-app', 'category', category, cid]);
        }
      }, {
        text: 'Edit',
        icon: 'create-outline',
        handler: () => {
          this.addCategoryForm = true;
          this.selectedCategory = {
            category,
            cid
          };
        }

      }, {
        text: 'Delete',
        icon: 'trash-outline',
        handler: () => {
          this.popoverController.create({
            component: ConfirmDeleteComponent,
            componentProps: {
              type: 'Category',
              message: 'Are data related to this category will be deleted. Proceed?'
            }
          }).then(popoverEl => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then(
            popoverResult => {
              if (popoverResult.role === 'delete') {
                const catgArr = this.categories.filter((catg: {
                  [cid: string]: string
                }) => {
                  if (catg[cid] !== category) {
                    return true;
                  }
                });

                this.settingsService.updateCategories(catgArr, cid).subscribe(
                  (result: {
                    categories: {
                      [cid: string]: string
                    } []
                  }) => {
                    this.toasterService.presentToast('Success!!', 'Category was deleted successfully', 2000);
                    this.categories = result.categories;
                    this.updateSettings('categories', this.categories);
                  }, (error: string) => {
                    this.toasterService.presentToast('Failure!!', error, 500, 'danger');
                  }
                );
              }
            }
          );

        }
      }]
    }).then((actionEl: HTMLIonActionSheetElement) => {
      actionEl.present();
    })
  }

  presentExpenseActionSheet(expense: string, eid: string): void {
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
          this.addExpenseForm = true;
          this.selectedExpense = {
            expense,
            eid
          };
        }

      }, {
        text: 'Delete',
        icon: 'trash-outline',
        handler: () => {
          this.popoverController.create({
            component: ConfirmDeleteComponent,
            componentProps: {
              type: 'Category',
              message: 'All data related to this category will be deleted. Proceed?'
            }
          }).then(popoverEl => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then(
            popoverResult => {
              if (popoverResult.role === 'delete') {
                const expArr = this.expenses.filter((exp: {
                  [eid: string]: string
                }) => {
                  if (exp[eid] !== expense) {
                    return true;
                  }
                });

                this.settingsService.updateExpenses(expArr, eid).subscribe(
                  (result: {
                    expenses: {
                      [eid: string]: string
                    } []
                  }) => {
                    this.toasterService.presentToast('Success!!', 'Category was deleted successfully', 2000);
                    this.expenses = result.expenses;
                    this.updateSettings('expenses', this.categories);
                  }, (error: string) => {
                    this.toasterService.presentToast('Failure!!', error, 500, 'danger');
                  }
                );
              }
            }
          );

        }
      }]
    }).then((actionEl: HTMLIonActionSheetElement) => {
      actionEl.present();
    })
  }


  // Utility functions
  getKeyVal(data: {
    [id: string]: string
  }): {
    key: string,
    value: string
  } {
    const value = Object.keys(data).map(key => {
      return {
        key,
        value: data[key]
      };
    });
    return value[0];
  }

  updateSettings(type: string, data: any): void {
    this.settings[type] = data;
    this.settingsService.settings = this.settings;
  }
}
