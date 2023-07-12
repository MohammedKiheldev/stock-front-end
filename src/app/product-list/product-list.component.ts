import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  p = 1; // Page actuelle

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.findAll().subscribe(data => {
      this.products = data;
    });
  }

  purchaseProduct(product: Product) {
    // Decrease quantity by 1
    product.quantity -= 1;

    // Check if quantity is zero
    if (product.quantity === 0) {
      // Remove the product from the list
      this.products = this.products.filter(p => p.id !== product.id);
    }
  }

  editProduct(product: Product) {
    // Redirect to the update page with the product ID as a parameter
    this.router.navigate(['/update', product.id]);
  }
}
