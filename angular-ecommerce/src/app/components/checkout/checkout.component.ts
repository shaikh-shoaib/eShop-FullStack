import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { Purchase } from 'src/app/models/purchase';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutFormService } from 'src/app/services/checkout-form.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  states: string[] = [];

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private checkoutFormService: CheckoutFormService, 
              private checkoutService: CheckoutService, private router: Router, private authService: AuthService, private validatorService: ValidatorService, private toastr: ToastrService) { 

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, this.validatorService.noWhitespaceValidator, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, this.validatorService.noWhitespaceValidator, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, this.validatorService.noWhitespaceValidator, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, this.validatorService.noWhitespaceValidator, Validators.minLength(2)]),
        state: new FormControl('', Validators.required),
        pinCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
      }),
      creditCard: this.formBuilder.group({
        cardType:  new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, this.validatorService.noWhitespaceValidator, Validators.minLength(2)]),
        cardNumber:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth:  new FormControl('', Validators.required),
        expirationYear:  new FormControl('', Validators.required),
      })
    }, { updateOn: 'submit'})
  }

  ngOnInit(): void {
    if(!this.authService.loggedIn) {
      this.router.navigate(['/login']);
    }
    
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    )
    // console.log("this.Priceee "+this.totalPrice);
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    )
    // console.log("this.Quantityy "+this.totalQuantity);
    this.creditCardYears = this.checkoutFormService.expiryYears;
    this.creditCardMonths = this.checkoutFormService.months;
    this.states = this.checkoutFormService.states;
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get street() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get city() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get state() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get pinCode() { return this.checkoutFormGroup.get('shippingAddress.pinCode'); }

  get cardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get nameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get cardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get securityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
  get expirationMonth() { return this.checkoutFormGroup.get('creditCard.expirationMonth'); }
  get expirationYear() { return this.checkoutFormGroup.get('creditCard.expirationYear'); }

  onSubmit() {
    console.log('Handling the submit button');

    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    
    const cartItems = this.cartService.cartItem;

    let orderItems: OrderItem[] = cartItems.map(
      item => new OrderItem(item)
    )

    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          this.toastr.success('Order Placed!');
          alert(`Your order has been placed.\nOrder Tracking Number: ${response.trackingNumber}`)

          this.resetCart()
        },
        error: err => {
          this.toastr.error('Error placing order!');
          alert(`There was an error: ${err.message}`);
          console.log(err);
        }
    });

    // console.log(this.checkoutFormGroup.get('customer')!.value);
    // console.log(this.checkoutFormGroup.get('shippingAddress')!.value);
    // console.log(this.checkoutFormGroup.get('creditCard')!.value);
  }

  resetCart() {
    this.cartService.cartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl('/products');
  }
}
