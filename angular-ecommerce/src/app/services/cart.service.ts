import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-items';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem: CartItem[] = [];

  storage: Storage = localStorage;
  // private baseUrl='http://localhost:8080/api';

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {
    let getItems = this.storage.getItem('cartItem');
    let getQuantity = this.storage.getItem('cartQuantity');
    if(getItems != null) {
      this.cartItem = JSON.parse(getItems);
    }
    if(getQuantity != null) {
      this.totalQuantity.next(JSON.parse(getQuantity));
    }
   }

  addToCart(theCartItem: CartItem) {
    // check if we already have item in cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem!: CartItem ;

    if(this.cartItem.length > 0) {
      // find item in cart based on item id
      existingCartItem = this.cartItem.find( item => { return item.id == theCartItem.id } )!;
      
      // check if we found it
      alreadyExistInCart = (existingCartItem != undefined);
    }
    if(alreadyExistInCart) {
      existingCartItem.quantity++;
    }
    else {
      // just add item to the array
      this.cartItem.push(theCartItem);
      }
    // console.log("items "+JSON.stringify(this.cartItem))
    this.computeTotals();
  }
  
  // getAllCartItems():Observable<any>{
  //   const url=`${this.baseUrl}/cart-items`;
  //   return this.httpClient.get<any>(url);
  // }

  // addToCart(theCartItem: CartItem):Observable<any>{
  //   const url=`${this.baseUrl}/pushedCartItem`;
  //   return this.httpClient.post<any>(url,theCartItem);
  // }

  // addItemValue(theCartItem:CartItem):Observable<any>{
  //   const url=`${this.baseUrl}/updatedCartItem`;
  //   return this.httpClient.put<any>(url,theCartItem);
  // }

  // remove(theCartItem: CartItem):Observable<any>{
  //   const url=`${this.baseUrl}/deleteCartItem/${theCartItem.id}`;
  //   return this.httpClient.delete<any>(url);
  // }

  // decrementQuantity(theCartItem: CartItem):Observable<any> {
  //   const url=`${this.baseUrl}/decrementCartItem`;
  //   return this.httpClient.put<any>(url,theCartItem);
  // }

  computeTotals() {
    let totalPrice = 0;
    let totalQuantity = 0;

    for(let currentItem of this.cartItem) {
      totalPrice += currentItem.quantity * currentItem.unitPrice;
      totalQuantity += currentItem.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
    console.log(totalPrice+" "+totalQuantity);

    this.storage.setItem('cartItem', JSON.stringify(this.cartItem));
    this.storage.setItem('cartQuantity', `${totalQuantity}`);
  }

  decrementQuantity(theCartItem: CartItem) {
    // check if we already have item in cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem!: CartItem ;

    if(this.cartItem.length > 0) {
      // find item in cart based on item id
      existingCartItem = this.cartItem.find( item => { return item.id == theCartItem.id } )!;
      
      // check if we found it
      alreadyExistInCart = (existingCartItem != undefined);
    }
    if(alreadyExistInCart) {
      existingCartItem.quantity--;
    }

    if(existingCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const index = this.cartItem.findIndex(
      item => item.id === theCartItem.id
    )
    if(index >= 0) {
      this.cartItem.splice(index,1);
      this.computeTotals();
    }
  }

  getCartItemQuantity(productId: number) {
    const cartItem = this.cartItem.find( item => item.id === productId);

    if(cartItem != undefined) {
      return cartItem.quantity;
    }
    return 0;
  }

}
