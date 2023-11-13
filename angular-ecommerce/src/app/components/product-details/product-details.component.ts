import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-items';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: Product = { id: 0, name: '', description: '', unitPrice: 0, imageUrl: '', unitsInStock: 0, ratings: 0};

  productQuantity: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) {  }

  ngOnInit(): void {
    this.handleProductDetails();
  }

  handleProductDetails() {
    // fetch product details using service
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductById(productId).subscribe(
      data => {
        this.product = data;
      }
    )
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
