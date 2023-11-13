import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-items';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {  }

  ngOnInit() {
    this.listCartItems();
  }

  listCartItems(){
    // this.cartService.getAllCartItems().subscribe(
    //   data => {
    //     this.cartItems = data;
    //   }
    // );
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    this.cartService.totalQuantity.subscribe (
      data => {
        this.totalQuantity = data;
      }
    );
    
    this.cartService.computeTotals();
  }
  
  addItem(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
    // this.cartService.addItemValue(cartItem).subscribe(
    //   ()=>this.listCartItems()
    // );
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
    // this.cartService.decrementQuantity(cartItem).subscribe(
    //   ()=>this.listCartItems()
    // );
  }

  removeItem(cartItem: CartItem) {
    this.cartService.remove(cartItem);
    // this.cartService.remove(cartItem).subscribe(
    //   ()=>this.listCartItems()
    // );
  }

}
