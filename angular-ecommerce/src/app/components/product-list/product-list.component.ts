import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  } from 'rxjs';
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

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService, private router: Router
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

       // if currentcategoryid is NaN
       if (!this.currentCategoryId) {
        this.router.navigate(['/category/1']);
        return;
      }
    } else {
      // no category available... default to categoryId 1
      this.currentCategoryId = 1;
    }

    // this.productService.getProductList(this.currentCategoryId).subscribe({
    this.productService.getProductListPaginate(this.pageIndex, this.pageSize, this.currentCategoryId).subscribe({
      next: (data) => {
        this.products = data.content;
        this.length = data.totalElements;
      },
      error: (err) => {
        this.toastr.error(err.statusText);
      },
    });
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // this.productService.searchProductByName(theKeyword).subscribe({
    this.productService.searchProductByNamePaginate(this.pageIndex, this.pageSize, theKeyword).subscribe({
      next: (data) => {
        this.products = data.content;
        this.length = data.totalElements;
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

  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showPageSizeOptions = true;
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.listProducts();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
