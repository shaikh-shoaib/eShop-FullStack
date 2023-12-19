import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderHistory } from 'src/app/models/order-history';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent {
  displayedColumns: string[] = ['trackingNumber', 'dateCreated', 'totalPrice', 'totalQuantity'];
  dataSource!: OrderHistory[];

  constructor(private checkoutService: CheckoutService, private authService: AuthService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const email = localStorage.getItem('userEmail');
    if (email === null) {
      this.authService.logOut();
      return;
    }
    this.checkoutService.getOrderHistory(email).subscribe({
      next: (res) => {
        this.dataSource = res;
        // console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.statusText);
      },
    });
  }
}