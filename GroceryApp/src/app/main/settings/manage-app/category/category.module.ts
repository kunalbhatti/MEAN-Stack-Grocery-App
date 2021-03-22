import {
  CommonModule
} from "@angular/common";
import {
  NgModule
} from "@angular/core";
import {
  FormsModule
} from "@angular/forms";
import {
  IonicModule
} from "@ionic/angular";
import {
  CategoryRoutingModule
} from "./category-routing.module";
import {
  CategoryPage
} from "./category.page";

@NgModule({
  declarations: [CategoryPage],
  imports: [CommonModule, FormsModule, IonicModule, CategoryRoutingModule],
})
export class CategoryModule {

}
