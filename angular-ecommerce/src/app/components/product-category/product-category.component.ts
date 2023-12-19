import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../models/product-category';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit{

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService, private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe({
      next: (data) => {
        console.log('Product categories' + JSON.stringify(data));
        this.productCategories = data;
      },
      error: (err) => {
        this.toastr.error(err.statusText);
      },
    });
  }
}
