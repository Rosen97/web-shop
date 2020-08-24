import { Commit } from "vuex";
import {
  getProductList,
  ProductListParams,
  getProductDetail,
} from "@/api/index";
import {
  ProductState,
  ProductItemProps,
  ProductDetailProps,
} from "./interface";

const state: ProductState = {
  productList: [],
  currentProduct: {
    categoryId: 0,
    createTime: "",
    detail: "",
    id: 0,
    imageHost: "",
    mainImage: "",
    name: "",
    parentCategoryId: 0,
    price: 0,
    status: 0,
    stock: 0,
    subImages: "",
    subtitle: "",
    updateTime: "",
  },
  detailShow: false,
};

const mutations = {
  setProductList(state: ProductState, list: Array<ProductItemProps>) {
    state.productList = list;
  },
  setProductInfo(state: ProductState, info: ProductDetailProps) {
    state.currentProduct = info;
  },
  setDetailShow(state: ProductState, bool: boolean) {
    state.detailShow = bool;
  },
};

const getters = {
  productList: (state: ProductState) => state.productList,
};

const actions = {
  // 获取商品列表
  async fetchProductList(
    { state, commit }: { state: any; commit: Commit },
    { params, loadMore }: { params: ProductListParams; loadMore?: boolean }
  ) {
    const requestData = await getProductList(params);
    const currentData = loadMore
      ? state.productList.concat(requestData.data.list)
      : requestData.data.list;
    commit("setProductList", currentData);
  },

  // 获取商品详情
  async fetchProductInfo({ commit }: { commit: Commit }, productId: number) {
    const requestData = await getProductDetail({ productId });
    commit("setDetailShow", true);
    commit("setProductInfo", requestData.data);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
