import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.page.html',
    styleUrls: ['cart.page.css']
})
export class CartPage implements OnInit{

    ngOnInit(){
        console.log('cart page onInit called');
    }

    searchItem(event) {
        const value = event.target.value;

    }
}