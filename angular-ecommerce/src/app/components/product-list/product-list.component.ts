import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-items';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  responseMessage: string = '';

  productQuantity: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // whenever route parameters change, update the list of products displayed in the component
    // based on the new parameters
    this.route.paramMap.subscribe((data) => {
      console.log(data.keys, data.get('id'));
      this.listProducts();
    });
  }

  listProducts() {
    // check if search keyword is present in the route or not
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    // check if category id is present in the route
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get id param string and convert it to a number using + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // no category available... default to categoryId 1
      this.currentCategoryId = 1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.toastr.error(err.statusText);
      },
    });
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProductByName(theKeyword).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.toastr.error(err.statusText);
      },
    });
  }

  addToCart(product: Product) {
    let theCartItem = new CartItem(product);

    this.cartService.addToCart(theCartItem);
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
