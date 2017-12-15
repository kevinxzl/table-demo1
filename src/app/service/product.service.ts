import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { PRODUCT_DATA } from '../model/product-data';
import { findIndex } from 'lodash';



@Injectable()
export class ProductService {
  private pData = PRODUCT_DATA;

  constructor() { }

  getProducts(): Product[] {
    return this.pData;
  }

  addProduct(product: Product) {
    this.pData.push(product);
  }

  updateProduct(product: Product) {
    let index = findIndex(this.pData, (p: Product) => {
      return p.id === product.id;
    });
    this.pData[index] = product;
    console.log(this.pData[index].id);
  }

  deleteProduct(product: Product) {
    this.pData.splice(this.pData.indexOf(product), 1);
  }
}

