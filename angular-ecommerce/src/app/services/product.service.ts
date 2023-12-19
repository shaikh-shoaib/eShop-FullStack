import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product-category';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrl + '/products';

  private categoryUrl = environment.baseUrl + '/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/category/${theCategoryId}`;

    return this.httpClient.get<Product[]>(searchUrl);
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProduct> {
    // http://localhost:8080/api/products/category/1?page=0&size=2
    const searchUrl = `${this.baseUrl}/category/${theCategoryId}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  searchProductByName(searchKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search?name=${searchKeyword}`;
    return this.httpClient.get<Product[]>(searchUrl);
  }

  getProductById(productId: number): Observable<Product> {
    // http://localhost:8080/api/products/1
    const searchUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(searchUrl);
  }
}

export interface GetResponseProduct {
  content: {
    products: Product[];
  };
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
}
