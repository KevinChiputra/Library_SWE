interface Product {
  description: string
  id: number
  title: string
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
