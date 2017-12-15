import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { clone } from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  private products: Product[];
  private isProductForm: boolean;
  private isEditProductForm: boolean;
  private isNewForm: boolean;
  private newProduct: any = {};
  private editedProduct: any = {};

  constructor( private _productService: ProductService ) {  }

  ngOnInit() {
    this.isEditProductForm = false;
    this.isProductForm = false;
    this.isNewForm = false;
    this.getProducts();
  }

  getProducts() {
    this.products = this._productService.getProducts();
  }

  showEditProductForm(product: Product) {
    // this.isEditProductForm = true;
    if ( !product ) {
      this.isProductForm = false;
      return;
    }
    this.isEditProductForm = true;
    this.editedProduct = clone(product);
  }

  showAddProductForm() {
    // resets form if edited product
    if ( this.products.length ) {
      this.newProduct = {};
    }
    this.isProductForm = true;
    this.isNewForm = true;
  }

  addProduct(product: Product) {
    if ( this.isNewForm ) {
      // add a new product
      this._productService.addProduct(product);
    }
    this.isProductForm = false;
  }

  removeProduct(product: Product) {
    this._productService.deleteProduct(product);
  }

  updateProduct() {
    this._productService.updateProduct(this.editedProduct);
    this.isEditProductForm = false;
    this.editedProduct = {};
    console.log('kx1');
  }

  cancelNewProduct() {
    this.newProduct = {};
    this.isProductForm = false;
  }

  cancelEdits() {
    this.editedProduct = {};
    this.isEditProductForm = false;
  }
}
