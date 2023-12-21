import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cart-items';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    unitPrice: 0,
    imageUrl: '',
    unitsInStock: 0,
    ratings: 0,
  };

  productQuantity: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private cartService: CartService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.handleProductDetails();
  }

  handleProductDetails() {
    // fetch product details using service
    const productId = +this.route.snapshot.paramMap.get('id')!;

    if (!productId) {
      this.router.navigate(['/']);
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.toastr.error(err.statusText);
      },
    });
  }

  addToCart(product: Product) {
    let cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(product: Product) {
    let theCartItem = new CartItem(product);

    this.cartService.decrementQuantity(theCartItem);
  }

  getProductQuantity(productId: number) {
    this.productQuantity = this.cartService.getCartItemQuantity(productId);

    return this.productQuantity;
  }
}
