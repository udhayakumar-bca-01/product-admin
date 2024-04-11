import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfacess';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  productForm!: FormGroup;
  productList!: Product[];
  addMode = false;
  isEditMode = false
  error: any;

  constructor(private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      img: ['', []]
    });
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe(
      (response) => {
        this.productList = response;
      },
      (error) => {
        this.error = error;
      }
    )
  }

  addProduct() {
    const formValue = this.productForm.getRawValue();
    if (!this.isEditMode) {
      formValue.id = this.productList.length
      this.productService.addProduct(formValue).subscribe(
        (response) => {
          this.addMode = false;
          this.isEditMode = false
          this.productForm.reset();
          this.getProduct()
        },
        (error) => {
          this.error = error;
        }
      )
    } else {
      this.productService.updateProduct(formValue).subscribe(
        (respose) => {
          this.addMode = false;
          this.isEditMode = false
          this.productForm.reset();
          this.getProduct()
        },
        (error) => {
          this.error = error
        }
      )
    }

  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.addMode = false
    this.productForm.patchValue(product)
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(
      (response) => {
        this.getProduct()
      },
      (error) => {
        this.error = error;
      }
    )
  }

  onOpenForm() {
    this.addMode = true;
  }

  cancelProduct() {
    this.addMode = false;
    this.isEditMode = false;
  }
}
