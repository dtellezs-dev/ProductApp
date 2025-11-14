import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  sortAsc = true;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = data;
      });
  }
  // Create a getter for template access
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  filter() {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sort();
  }

  sort() {
    this.filteredProducts.sort((a, b) =>
      this.sortAsc ? a.price - b.price : b.price - a.price
    );
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
    this.sort();
  }
}
