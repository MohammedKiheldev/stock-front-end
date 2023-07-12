import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id!: number;
  product!: Product;
  errors: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductServiceService
  ) { }

  ngOnInit() {
    this.product = new Product();
    this.id = this.route.snapshot.params['id'];
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct(this.id)
      .subscribe(
        (data: Product) => {
          console.log(data);
          this.product = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  onSubmit() {
    this.resetErrors();

    this.productService.updateProduct(this.id, this.product)
      .subscribe(
        (data: Product) => {
          console.log(data);
          this.gotoProductList();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            if (error.error.error1) {
              this.errors.name = error.error.error1;
            }
            if (error.error.error2) {
              this.errors.quantity = error.error.error2;
            }
            if (error.error.error3) {
              this.errors.price = error.error.error3;
            }
          } else {
            console.error('Error updating product:', error);
            this.errors.generic = 'An error occurred while updating the product.';
          }
        }
      );
  }

  gotoProductList() {
    this.router.navigate(['/products']);
  }

  resetErrors() {
    this.errors = {};
  }
}
