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

@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.page.html',
  styleUrls: ['./manage-app.page.scss'],
})
export class ManageAppPage implements OnInit {
  groupError: string = '';
  addGroupForm: boolean;
  groups: string[];

  selectedGroup: string;

  categoryError: string = '';
  addCategoryForm: boolean;
  categories: any[];

  selectedCategory: string;

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
        settings: {
          groups: string[],
          selectedGroup: {
            name: string,
            id: number
          };
          categories: string[];
        }
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
      }
    )

  }

  addCategory(form: NgForm) {
    const category = form.value.category;

    const index = this.categories.findIndex((catg: string) => {
      if (category.toLowerCase() === catg.toLowerCase()) {
        return true;
      }
      return false;
    })

    if (index !== -1) {
      return;
    }

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
    const index = this.categories.findIndex(loc => {
      if (loc === this.selectedCategory) {
        return true;
      }
    });

    this.categories[index] = category;

    this.settingsService.updateCategories(this.categories).subscribe(
      result => {
        form.reset();
        this.toasterService.presentToast('Success!!', 'Category was editted successfully', 2000);
        this.selectedCategory = null;
        this.addCategoryForm = false;
      }
    );
  }

  addGroup(form: NgForm) {
    const group = form.value.group;
    if (this.groups.length === 3) {
      return;
    }

    const index = this.groups.findIndex((loc: string) => {
      if (group.toLowerCase() === loc.toLowerCase()) {
        return true;
      }

      return false;
    })

    if (index !== -1) {
      return;
    }

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
    const groups = form.value.group;
    const index = this.groups.findIndex(loc => {
      if (loc === this.selectedGroup) {
        return true;
      }
    });

    this.groups[index] = groups;

    this.settingsService.updateGroup(this.groups).subscribe(
      () => {
        form.reset();
        this.toasterService.presentToast('Success!!', 'Group was editted successfully', 2000);
        this.selectedGroup = null;
        this.addGroupForm = false;
      }
    );
  }


  presentGroupActionSheet(group: string) {
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
          this.selectedGroup = group;
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
                const groupArr = this.groups.filter((grp: string) => {
                  if (grp !== group) {
                    return true;
                  }
                });

                this.settingsService.updateGroup(groupArr).subscribe(
                  (result: {
                    groups: string[]
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

  presentCategoryActionSheet(category: string) {
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
          const index = this.categories.findIndex(catg => {
            if (catg === category) {
              return true;
            }
          })
          this.router.navigate(['/', 'app', 'settings', 'manage-app', 'category', category, index]);
        }
      }, {
        text: 'Edit',
        icon: 'create-outline',
        handler: () => {
          this.addCategoryForm = true;
          this.selectedCategory = category;
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
                const catgArr = this.categories.filter((catg: string) => {
                  if (catg !== category) {
                    return true;
                  }
                });

                this.settingsService.updateCategories(catgArr).subscribe(
                  (result: {
                    categories: string[]
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
}
