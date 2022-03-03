import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };

  limit = 10;
  offset = 0;

  // Inyectamos los servicios creados en el constructor
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
    this.productsService.getProductsByPage(10,0)
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id)
    .subscribe(data =>{
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }
  
  createProduct(){
    const productNew: CreateProductDTO = {
      title: "new Product",
      description: "new description",
      images: ['https://placeimg.com/640/480/any?random=${Math.random()}'],
      categoryId: 2,
      price: 1000
    }
    this.productsService.create(productNew)
    .subscribe(data =>{
      console.log(data);
      this.products.unshift(data);
    });
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: "nuevo title"
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(item => item.id=== this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(()=>{
      const productIndex = this.products.findIndex(item => item.id=== this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit,this.offset)
    .subscribe(data => {
      // this.products.concat(data);
      this.products.push(...data)
      this.offset += this.limit;
    });
  }
}
