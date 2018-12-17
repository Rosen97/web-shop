<template>
  <div class="product-list-wrap">
    <div style="position: fixed;left: 0;top: 0;width: 100%;z-index: 1000;background: #fff;">
      <header class="category-header wrap">
        <i class="iconfont icon-left" @click="goBack"></i>
        <div class="header-search">
          <i class="iconfont icon-search"></i>
          <input type="text" class="search-title" @mouseenter="textEnter" @mouseleave="textLeave"
                 v-model="keyword"/>
        </div>
        <i class="iconfont icon-More" v-if="!searchBtn"></i>
        <span class="search-btn" @click="getSearch" v-else>搜索</span>
      </header>
      <section class="select-menu" :class="{'isFixed' : seclectActive}">
        <div class="select-item" :class="{'active' : orderBy === 'default'}" data-orderBy="default"
             @click="selectOrder($event)">
          默认排序
        </div>
        <div class="select-item" :class="{'active' : orderBy === 'price_asc'}" data-orderBy="price_asc"
             @click="selectOrder($event)">
          升序<i class="iconfont icon-up1" :class="{'active' : orderBy === 'price_asc'}"></i>
        </div>
        <div class="select-item" :class="{'active' : orderBy === 'price_desc'}" data-orderBy="price_desc"
             @click="selectOrder($event)">
          降序<i class="iconfont icon-down1" :class="{'active' : orderBy === 'price_desc'}"></i>
        </div>
        <div class="select-item">
          筛选<i class="iconfont icon-shaixuan"></i>
        </div>
      </section>
    </div>
    <loading v-show="isLoading" :loading-type="2"></loading>
    <section class="product-list" v-show="!isLoading">
      <refresh :on-refresh="onRefresh" :on-infinite="onInfinite" style="top: 220px;">
        <div>
          <div class="product-item" v-for="(item,index) in productList" @click="productDetail(index)">
            <img :src="item.imageHost+item.mainImage" v-if="item.imageHost && item.mainImage">
            <img src="../../assets/product_default.jpg" v-else/>
            <div class="product-info">
              <p class="name">{{item.name}}</p>
              <p class="subtitle">{{item.subtitle}}</p>
              <span class="price">￥ {{item.price}}</span>
            </div>
          </div>
        </div>
      </refresh>
    </section>
    <message v-show="isMessage" :message-text="messageText"></message>
  </div>
</template>

<script>
  import loading from '../../components/common/loading'
  import refresh from '../../components/common/refresh'
  import message from '../../components/common/message'
  import {getUrlKey, getStore, dedupeObject} from "../../common/js/util";
  import {productListKeyword, productListCategoryId} from "../../service/getData";
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        keyword: '',
        productList: [],
        orderBy: 'default',
        params: {
          categoryId: '',
          keyword: '',
          pageNum: 1,
          pageSize: 20,
          orderBy: 'default'
        },
        isLoading: true,
        seclectActive: false,
        searchBtn: false,
        messageText: '',
        isMessage: false
      }
    },
    created() {
      this.init()
    },
    mounted() {
      window.addEventListener('scroll', this.pageScroll)
    },
    methods: {
      ...mapMutations([
        'RECORE_FOOT'
      ]),
      init() {
        let keyword = getUrlKey('keyword'),
          categoryId = getUrlKey('categoryId')
        this.productList = []
        this.params.categoryId = categoryId
        this.params.keyword = keyword
        this.keyword = keyword
        this.getProductList(this.params)
      },
      //价格排序
      selectOrder(e) {
        let orderBy = e.currentTarget.getAttribute('data-orderBy')
        if (orderBy === this.orderBy) {
          return
        }
        this.productList = []    //重置list
        this.orderBy = orderBy
        this.params.orderBy = orderBy
        this.params.pageNum = 1
        this.isLoading = true
        this.getProductList(this.params)
      },
      getProductList(params) {
        if (!this.keyword) {
          productListCategoryId(params).then((res) => {
            this.isLoading = false
            if (res.data.list.length === 0) {
              this.$el.querySelector('.loading_text').style.display = 'none';
              this.showMessage()
              return
            }
            this.productList = this.productList.concat(res.data.list)
          })
        } else {
          productListKeyword(params).then((res) => {
            this.isLoading = false
            if (res.data.list.length === 0) {
              this.$el.querySelector('.loading_text').style.display = 'none';
              // alert('暂无更多数据！')
              this.showMessage()
              return
            }
            this.productList = this.productList.concat(res.data.list)
          })
        }
      },
      showMessage() {
        this.isMessage = true
        this.messageText = '没有更多的商品啦！'
        setTimeout(() => {
          this.isMessage = false
        }, 1200)
      },
      getSearch() {
        this.$router.push('/product-list?keyword=' + this.keyword + '&categoryId=0')
        // // console.log(1111)
        this.params.keyword = this.keyword
        this.params.pageNum = 1
        this.productList = []
        this.getProductList(this.params)
      },
      productDetail(index) {
        let footprintList = getStore('footprintList')
        footprintList.unshift(this.productList[index])
        this.RECORE_FOOT(dedupeObject(footprintList))
        this.$router.push('./product/' + this.productList[index].id)
      },
      //刷新
      onRefresh(done) {
        this.params.pageNum = 1
        this.productList = []
        this.isLoading = true
        this.getProductList(this.params);
        done() // call done
      },
      //加载更多
      onInfinite(done) {
        this.params.pageNum++
        this.getProductList(this.params);
        done()
      },
      pageScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? this.seclectActive = true : this.seclectActive = false
      },
      textEnter() {
        this.searchBtn = true
      },
      textLeave() {
        this.searchBtn = false
      },
      goBack() {
        console.log(111)
        this.$router.go(-1)
      }
    },
    components: {
      loading,
      refresh,
      message
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../common/style/mixin';
  .category-header {
    @include fj;
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding: 0 30px;
    @include boxSizing;
    font-size: 30px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: $red;
    }
    .icon-left {
      font-size: 50px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      width: 76%;
      height: 40px;
      line-height: 40px;
      margin: 20px 0;
      padding: 10px 0;
      color: #232326;
      background: #F7F7F7;
      @include borderRadius(40px);
      .icon-search {
        padding: 0 10px 0 40px;
        font-size: 34px;
      }
      .search-title {
        font-size: 24px;
        color: #666;
        background: #F7F7F7;
      }
    }
    .icon-More {
      font-size: 40px;
    }
    .search-btn {
      height: 70px;
      margin: 15px 0;
      line-height: 70px;
      padding: 0 10px;
      color: #fff;
      background: $red;
      @include borderRadius(10px);
    }
  }
  .select-menu {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100px;
    background: #fff;
    &.isFixed {
      position: fixed;
      left: 0;
      top: 0;
    }
    .select-item {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 100px;
      font-size: 30px;
      border-top: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      &.active {
        color: $red;
      }
      .iconfont {
        &.icon-down1 {
          color: #999;
          padding-left: 10px;
          font-size: 22px;
        }
        &.icon-up1 {
          @extend .icon-down1;
          font-size: 34px;
        }
        &.icon-shaixuan {
          @extend .icon-down1;
          font-size: 28px;
        }
        &.active {
          color: $red;
        }
      }
    }
  }
  .loading {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100px;
      height: 100px;
      transform: translate(-50%, -50%);
    }
  }
  .product-list {
    width: 100%;
    .product-item {
      @include fj;
      width: 100%;
      height: 240px;
      padding: 20px 0;
      border-bottom: 1px solid #dcdcdc;
      img {
        width: 280px;
        height: 240px;
        padding: 0 20px;
        @include boxSizing;
      }
      .product-info {
        width: 56%;
        height: 240px;
        padding: 10px;
        @include boxSizing;
        .name {
          width: 100%;
          max-height: 80px;
          line-height: 40px;
          font-size: 30px;
          color: #333;
          overflow: hidden;
        }
        .subtitle {
          width: 100%;
          max-height: 40px;
          padding: 20px 0;
          line-height: 50px;
          font-size: 26px;
          color: #999;
          overflow: hidden;
        }
        .price {
          color: $red;
          font-size: 32px;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
