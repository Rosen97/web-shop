<template>
  <div class="product-wrap">
    <SearchHead
      :keyword="productParams.keyword"
      @handleSearch="handleSearch"
      @changeInput="changeInput"
    />
    <div>{{productParams.num}}</div>
    <SelectTab :list="selectList" :type="productParams.orderType" @changeTab="changeTab" />
    <div class="product-list">
      <Scroll @loadMore="loadMore">
        <ProductItem
          :info="item"
          v-for="item in productList"
          :key="item.id"
          @jumpDetail="jumpDetail"
        />
      </Scroll>
    </div>
    <ProductDetail v-if="detailShow" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SearchHead from "./component/search-head/index.vue";
import SelectTab from "./component/select-tab/index.vue";
import ProductItem from "@/components/product-item/index.vue";
import Scroll from "@/components/scroll/index.vue";
import ProductDetail from "../product-detail/index.vue";
import { ProductItemProps } from "@/store/product/interface";
import { State, Mutation, Action } from "vuex-class";

@Component({
  components: {
    SearchHead,
    SelectTab,
    ProductItem,
    Scroll,
    ProductDetail
  }
})
export default class ProductList extends Vue {
  productParams = {
    orderType: "default",
    keyword: "1",
    pageNum: 1,
    pageSize: 20
  };
  selectList = [
    { name: "默认排序", type: "default", icon: "" },
    { name: "升序", type: "price_asc", icon: "icon-up1" },
    { name: "降序", type: "price_desc", icon: "icon-down1" }
  ];

  @State(state => state.productList) productList: Array<ProductItemProps>;
  @State(state => state.detailShow) detailShow: boolean;
  @Mutation("setProductList") setProductList: Function;
  @Action("fetchProductList") fetchProductList: Function;
  @Action("fetchProductInfo") fetchProductInfo: Function;

  jumpDetail(id: number) {
    this.fetchProductInfo(id);
  }

  // 监听input
  changeInput(value: string) {
    this.productParams.keyword = value;
  }

  // 搜索
  handleSearch() {
    this.productParams.pageNum = 1;
    this.setProductList([]);
    this.fetchProductListDispatch();
  }

  // 筛选
  changeTab(type: string) {
    this.productParams.orderType = type;
    this.productParams.pageNum = 1;
    this.setProductList([]);
    this.fetchProductListDispatch();
  }

  // 获取商品列表
  fetchProductListDispatch(loadMore = false) {
    this.fetchProductList({ params: this.productParams, loadMore });
  }

  // 加载更多
  async loadMore(done: () => void) {
    if (this.detailShow) return;
    this.productParams.pageNum++;
    await this.fetchProductList({ params: this.productParams, loadMore: true });
    setTimeout(() => {
      done();
    });
  }

  mounted() {
    this.fetchProductListDispatch();
  }
}
</script>

<style scoped lang="scss" src="./index.scss"></style>
