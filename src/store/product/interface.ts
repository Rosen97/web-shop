export interface ProductItemProps {
  categoryId?: number;
  id: number;
  status: number;
  imageHost: string;
  mainImage: string;
  name: string;
  subtitle: string;
  price: number;
}

export interface ProductDetailProps {
  categoryId: number;
  createTime: string;
  detail: string;
  id: number;
  imageHost: string;
  mainImage: string;
  name: string;
  parentCategoryId: number;
  price: number;
  status: number;
  stock: number;
  subImages: string;
  subtitle: string;
  updateTime: string;
}

export interface ProductState {
  productList: Array<ProductItemProps>;
  currentProduct: ProductDetailProps;
  detailShow: boolean;
}
