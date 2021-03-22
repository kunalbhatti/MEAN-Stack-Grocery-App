import {
  Component, OnInit
} from "@angular/core";

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.css']
})
export class ExpensesPage implements OnInit{

  ngOnInit(){
    console.log('Expenses page onInit called')
  }

}
