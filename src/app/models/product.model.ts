// Creamos la interface para productos para que de esta manera tengamos tipado nuestro proyecto
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}
