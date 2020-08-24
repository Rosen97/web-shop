import HTTP from "../utils/http";

export interface LoginParamsProps {
  username: string;
  password: string;
}

export interface RegisterParamsProps {
  username: string;
  password: string;
  email: string;
  phone: string;
  question: string;
  answer: string;
}

export interface ProductListParams {
  categoryId?: number;
  keyword?: string;
  pageNum: number;
  pageSize: number;
  orderBy: string;
}

export interface ProductDetailParams {
  productId: number;
}

/**
 * 检查用户登录状态
 */
export const checkLogin = async () => HTTP.post("/user/get_user_info.do");

/**
 * 去登录
 */
export const userLogin = async (params: LoginParamsProps) =>
  HTTP.post("/user/login.do", params);

/**
 * 注册
 */
export const userRegister = async (params: RegisterParamsProps) =>
  HTTP.post("/user/register.do", params);

/**
 * 退出登录
 */
export const logout = async () => HTTP.post("/user/logout.do");

/**
 * 商品列表
 * keyword和category不能同时传，会报错500
 */
export const getProductList = (params: ProductListParams) =>
  HTTP.post("/product/list.do", params);

/**
 * 商品详情
 */
export const getProductDetail = (params: ProductDetailParams) =>
  HTTP.post("/product/detail.do", params);
