export interface Category {
  id: string;
  name: string;
}


// Creamos la interface para productos para que de esta manera tengamos tipado nuestro proyecto
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}

// Para campos opcionales
export interface UpdateProductDTO extends Partial<CreateProductDTO>  {}