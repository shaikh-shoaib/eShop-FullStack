import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../models/purchase';
import { Observable, map, tap } from 'rxjs';
import { OrderHistory } from '../models/order-history';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = 'http://localhost:8080/api'
  // private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<string>(`${this.baseUrl}/checkout/purchase`, purchase);
  }

  getOrderHistory(email: string): Observable<any> {
    return this.httpClient.get<OrderHistory[]>(`${this.baseUrl}/orders/search?email=${email}`).pipe(
      map(items => 
        items.map( item => {
          return <OrderHistory> {
            dateCreated: item['dateCreated'],
            totalPrice: item['totalPrice'],
            totalQuantity: item['totalQuantity'],
            trackingNumber: item['trackingNumber']
          }
        })
      )
    )
  }
}
