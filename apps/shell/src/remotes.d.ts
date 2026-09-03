declare module 'shop/ProductList' {
  import { ComponentType } from 'react';
  import { Product } from '@mfe/types';

  export interface ProductListProps {
    products?: Product[];
    onAddToCart?: (product: Product) => void;
    title?: string;
    isHostConsumed?: boolean;
  }

  const ProductList: ComponentType<ProductListProps>;
  export default ProductList;
}
