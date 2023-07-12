import { Component } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product: Product;
  nameError = '';
  quantityError = '';
  priceError = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private productService: ProductServiceService
  ) {
    this.product = new Product();
  }

  // Ajoutez la propriété errors dans votre composant
errors: any = {};

// Modifiez la partie de gestion des erreurs dans la méthode onSubmit()
onSubmit(): void {
  this.resetErrors();

  // Appeler le service pour envoyer les données au contrôleur backend
  this.productService['addProduct'](this.product).subscribe(
    (response: any) => {
      // Traiter la réponse du serveur
      console.log(response);
      this.gotoProductList();
    },
    (errorResponse: any) => {
      // Gérer les réponses d'erreur du serveur
      if (errorResponse.status === 400) {
        // Afficher les messages d'erreur dans le formulaire
        if (errorResponse.error.error1) {
          this.errors.name = errorResponse.error.error1;
        }
        if (errorResponse.error.error2) {
          this.errors.quantity = errorResponse.error.error2;
        }
        if (errorResponse.error.error3) {
          this.errors.price = errorResponse.error.error3;
        }
      } else {
        // Gérer les autres erreurs (par exemple, afficher un message d'erreur générique)
        console.error('Erreur lors de l\'ajout du produit :', errorResponse);
        this.errors.generic = 'Une erreur s\'est produite lors de l\'ajout du produit.';
      }
      
    }
  );
}


  
  gotoProductList(): void {
  this.router.navigate(['/products']);
}


  resetErrors(): void {
    this.nameError = '';
    this.quantityError = '';
    this.priceError = '';
  }
}
