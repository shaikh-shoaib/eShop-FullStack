import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../models/purchase';
import { Observable, map, tap } from 'rxjs';
import { OrderHistory } from '../models/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<string>(`${environment.baseUrl}/checkout/purchase`, purchase);
  }

  getOrderHistory(email: string): Observable<any> {
    return this.httpClient.get<OrderHistory[]>(`${environment.baseUrl}/orders/search?email=${email}`).pipe(
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
