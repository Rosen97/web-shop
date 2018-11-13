import $http from './ajax'

/**
 * 首页数据
 */
export const homeData = () => $http('/home/data');

/**
 * 分类数据
 */
export const categoryData = () => $http('/category/data');

/**
 * 商品详情
 */
export const productDetail = (productId) => $http('/api/product/detail.do',{
    productId
});

/**
 * 购物车列表
 */
export const cartList = () => $http('/api/cart/list.do');


/**
 * 购物车数量
 */
export const cartCount = () => $http('/api/cart/get_cart_product_count.do');

/**
 * 购物车添加商品
 */
export const addCart = (productId,count) => $http('/api/cart/add.do',{
    productId,
    count
});


/**
 * 更新购物车数量
 */
export const updateCartCount = (productId,count) => $http('/api/update.do',{
    productId,
    count
});

/**
 * 移除购物车若干商品
 */
export const deleteProduct = (productIds) => $http('/api/delete_product.do',{
    productIds
});

/**
 * 购物车选中某个商品
 */
export const selectProduct = (productId) => $http('/api/select.do',{
    productId
});

/**
 * 购物车取消选中某个商品
 */
export const unselectProduct = (productId) => $http('/api/un_select.do',{
    productId
});

/**
 * 购物车全选
 */
export const selectAll = () => $http('/api/select_all.do');

/**
 * 购物车取消全选
 */
export const unselectAll = () => $http('/api/un_select_all.do');
