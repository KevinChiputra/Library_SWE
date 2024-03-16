interface Product {
  id: number
  title: string
  author: string
  publication_year: number
  genre: string[]
  description: string
  cover_image: string
}

// Page Model
interface ProductsModel {
  products?: Product[]
}

enum ProductsActionType {
  Load = 'products-load',
  Clear = 'products-clear'
}

type ProductsAction = {
  type: ProductsActionType.Clear
} | {
  type: ProductsActionType.Load
  value?: ProductsModel
};

export { ProductsActionType };
export type { ProductsModel, ProductsAction, Product };
