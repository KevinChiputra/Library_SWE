interface Product {
  author: string;
  cover_image: string;
  description: string;
  genre: string[];
  id: number;
  publication_year: number;
  title: string;
}

// Page Model
interface ProductsModel {
  products?: Product[];
}

enum ProductsActionType {
  Load = 'products-load',
  Clear = 'products-clear'
}

type ProductsAction =
  | {
      type: ProductsActionType.Clear;
    }
  | {
      type: ProductsActionType.Load;
      value?: ProductsModel;
    };

export { ProductsActionType };
export type { ProductsModel, ProductsAction, Product };
