import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(
    private http: HttpClient
  ) { }

  // https://young-sands-07814.herokuapp.com/docs/
  
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiURL, { params });
  }

  // getAllProducts() {
  //   // return this.http.get<Product[]>('https://fakestoreapi.com/products');
  //   return this.http.get<Product[]>(this.apiURL);
  // }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }

  create(data: CreateProductDTO){
    return this.http.post<Product>(this.apiURL,data);
  }

  // Put debemos enviar toda la informacion asi solo modifiquemos un campo
  // Patch debemos enviar solo el campo que hemos modificado
  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiURL}/${id}`,dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiURL}/${id}`);
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiURL, {
      params: {limit,offset}
    })
  }
}
