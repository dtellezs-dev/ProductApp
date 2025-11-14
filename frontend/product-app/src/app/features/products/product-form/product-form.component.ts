import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  productId?: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.form.patchValue({
        name: product.name,
        price: product.price,
        stock: product.stock
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const product: Product = {
      id: this.productId ?? 0,
      name: this.form.value.name,
      price: this.form.value.price,
      stock: this.form.value.stock
    };
    if (this.isEdit) {
      this.productService.updateProduct(this.productId!, product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  get name() { return this.form.get('name'); }
  get price() { return this.form.get('price'); }
  get stock() { return this.form.get('stock'); }
}
