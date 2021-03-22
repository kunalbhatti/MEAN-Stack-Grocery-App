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

import {
  SettingsService
} from 'src/app/services/settings.service';
import {
  ToasterService
} from 'src/app/services/toaster.service';
import {
  ConfirmDeleteComponent
} from './modals/confirm-delete/confirm-delete.component';

import {
  SettingsModel
} from './../../../models/settings.model';

@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.page.html',
  styleUrls: ['./manage-app.page.scss'],
})
export class ManageAppPage implements OnInit {
  groupError: string = '';
  addGroupForm: boolean;
  groups: {
    [gid: string]: string
  } [];
  selectedGroup: {
    group: string,
    gid: string
  };

  categoryError: string = '';
  addCategoryForm: boolean;
  categories: {
    [cid: string]: string
  } [];
  selectedCategory: {
    category: string,
    cid: string
  };

  constructor(private settingsService: SettingsService,
    private toasterService: ToasterService,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private router: Router) {}

  ngOnInit() {
    this.addGroupForm = false;
    this.addCategoryForm = false;

    this.settingsService.getSettings().subscribe(
      (settingsData: {
        settings: SettingsModel
      }) => {
        if (settingsData.settings) {
          const userData = settingsData.settings;
          if (userData.groups) {
            this.groups = userData.groups;
          } else {
            this.groups = [];
          }
          if (userData.categories) {
            this.categories = userData.categories;
          } else {
            this.categories = [];
          }
        } else {
          this.groups = [];
          this.categories = [];
        }
      }, error => {
        this.groupError = error;
      })

  }

  addCategory(form: NgForm) {

    const index = this.categories.findIndex(catg => {
      if (this.getKeyVal(catg).value.toLowerCase() === form.value.category.toLowerCase()) {
        return true;
      }
    });

    if (index !== -1) {
      return;
    }

    const cid = uuid.v4();

    const category = {
      [cid]: form.value.category
    };


    this.categories.push(category);
    this.settingsService.updateCategories(this.categories).subscribe(
      () => {
        form.reset();
        this.toasterService.presentToast('Success!!', 'Category was added successfully', 2000);
        this.addCategoryForm = false;
      }
    );
  }

  editCategory(form: NgForm) {
    const category = form.value.category;
    const index = this.categories.findIndex(catg => {
      if (catg[this.selectedCategory.cid] === this.selectedCategory.category) {
        return true;
      }
    });

    this.categories[index][this.selectedCategory.cid] = category;

    this.settingsService.updateCategories(this.categories).subscribe(
      () => {
        form.reset();
        this.toasterService.presentToast('Success!!', 'Category was editted successfully', 2000);
        this.selectedCategory = null;
        this.addCategoryForm = false;
      }
    );
  }

  addGroup(form: NgForm) {

    if (this.groups.length === 3) {
      return;
    }

    const index = this.groups.findIndex(grp => {
      if (this.getKeyVal(grp).value.toLowerCase() === form.value.group.toLowerCase()) {
        return true;
      }
    });

    if (index !== -1) {
      return;
    }

    const gid = uuid.v4();

    const group = {
      [gid]: form.value.group
    };

    this.groups.push(group);
    this.settingsService.updateGroup(this.groups).subscribe(
      () => {
        form.reset();
        this.toasterService.presentToast('Success!!', 'Group was added successfully', 2000);
        this.addGroupForm = false;
      }
    );
  }

  editGroup(form: NgForm) {
    const group = form.value.group;
    const index = this.groups.findIndex(grp => {
      if (grp[this.selectedGroup.gid] === this.selectedGroup.group) {
        return true;
      }
    });

    this.groups[index][this.selectedGroup.gid] = group;

    this.settingsService.updateGroup(this.groups).subscribe(
      () => {
        form.reset();
        this.toasterService.presentToast('Success!!', 'Group was editted successfully', 2000);
        this.selectedGroup = null;
        this.addGroupForm = false;
      }
    );
  }

  presentGroupActionSheet(group: string, gid: string) {
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

      }, {
        text: 'Delete',
        icon: 'trash-outline',
        handler: () => {
          this.popoverController.create({
            component: ConfirmDeleteComponent,
            componentProps: {
              type: 'group'
            }
          }).then(popoverEl => {
            popoverEl.present();
            return popoverEl.onDidDismiss();
          }).then(
            popoverResult => {
              if (popoverResult.role === 'delete') {
                const groupArr = this.groups.filter((grp: {
                  [gid: string]: string
                }) => {
                  if (grp[gid] !== group) {
                    return true;
                  }
                });

                this.settingsService.updateGroup(groupArr).subscribe(
                  (result: {
                    groups: {
                      [cid: string]: string
                    } []
                  }) => {
                    this.toasterService.presentToast('Success!!', 'Group was deleted successfully', 2000);
                    this.groups = result.groups;
                  }
                )
              }
            });
        }
      }]
    }).then(actionEl => {
      actionEl.present();
    })
  }

  presentCategoryActionSheet(category: string, cid: string) {
    this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Close',
        icon: 'close-outline',
        role: 'destructive'
      }, {
        text: 'Open',
        icon: 'open',
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
              type: 'category'
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

                this.settingsService.updateCategories(catgArr).subscribe(
                  (result: {
                    categories: {
                      [cid: string]: string
                    } []
                  }) => {
                    this.toasterService.presentToast('Success!!', 'Category was deleted successfully', 2000);
                    this.categories = result.categories;

                  }
                )
              }
            }
          )

        }
      }]
    }).then(actionEl => {
      actionEl.present();
    })
  }


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
}
