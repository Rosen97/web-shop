<template>
    <div class="product-list-wrap">
        <header class="category-header wrap">
            <i class="iconfont icon-left" @click="goBack"></i>
            <div class="header-search">
                <i class="iconfont icon-search"></i>
                <input type="text" class="search-title" v-model="keyword" />
            </div>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="select-menu" :class="{'isFixed' : seclectActive}">
            <div class="select-item" :class="{'active' : orderBy === 'default'}" data-orderBy="default" @click="selectOrder($event)">
                默认排序
            </div>
            <div class="select-item" :class="{'active' : orderBy === 'price_asc'}" data-orderBy="price_asc" @click="selectOrder($event)">
                升序<i class="iconfont icon-up1" :class="{'active' : orderBy === 'price_asc'}"></i>
            </div>
            <div class="select-item" :class="{'active' : orderBy === 'price_desc'}" data-orderBy="price_desc" @click="selectOrder($event)">
                降序<i class="iconfont icon-down1" :class="{'active' : orderBy === 'price_desc'}"></i>
            </div>
            <div class="select-item">
                筛选<i class="iconfont icon-shaixuan"></i>
            </div>
        </section>
      <section class="product-list">
        <scroll :on-refresh="onRefresh" :on-infinite="onInfinite" style="top: 220px;">
            <div>
              <div class="product-item" v-for="item in productList" @click="productDetail(item.id)">
                <img :src="item.imageHost+item.mainImage">
                <div class="product-info">
                  <p class="name">{{item.name}}</p>
                  <p class="subtitle">{{item.subtitle}}</p>
                  <span class="price">￥ {{item.price}}</span>
                </div>
              </div>
            </div>
          </scroll>
      </section>
    </div>
</template>

<script>
    import scroll from '../../components/common/scroll'
    import {getUrlKey} from "../../common/js/util";
    import {productListKeyword,productListCategoryId} from "../../service/getData";

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
              seclectActive: false
            }
        },
        created() {
            let keyword = getUrlKey('keyword'),
                categoryId = getUrlKey('categoryId')
            this.params.categoryId = categoryId
            this.params.keyword = keyword
            this.keyword = keyword
            this.getProductList(this.params)
        },
      mounted(){
        window.addEventListener('scroll',this.pageScroll)
      },
        methods: {
            //价格排序
            selectOrder(e){
                let orderBy = e.currentTarget.getAttribute('data-orderBy')
                if(orderBy === this.orderBy){
                    return
                }
                this.productList = []    //重置list
                this.orderBy = orderBy
                this.params.orderBy = orderBy
                this.getProductList(this.params)
            },
            getProductList(params){
                if(this.keyword == ''){
                    productListCategoryId(params).then((res)=>{
                        this.productList = this.productList.concat(res.list)
                    })
                }else{
                    productListKeyword(params).then((res)=>{
                        console.log(res)
                        this.productList = this.productList.concat(res.list)
                    })
                }
            },
            productDetail(id){
                this.$router.push('./product/'+id)
            },
          pulldown(){
              console.log(11111)
          },
          //刷拉刷新
          onRefresh(done) {
            this.params.pageNum = 1
            this.productList = []
            this.getProductList(this.params);
            done() // call done
          },
          //加载更多
          onInfinite(done) {
            this.params.pageNum++
            this.getProductList(this.params);
            done()
          },
          pageScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            scrollTop > 100 ? this.seclectActive = true : this.seclectActive = false
          },
            goBack(){
                console.log(111)
                this.$router.go(-1)
            }
        },
      components: {
        scroll
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
            width: 80%;
            height: 40px;
            line-height: 40px;
            margin: 20px 0;
            padding: 10px 0;
            color: #232326;
            background: #F7F7F7;
            @include borderRadius(40px);
            .icon-search {
                padding: 0 20px 0 40px;
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
    }
    .select-menu{
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 100px;
      background: #fff;
        &.isFixed{
          position: fixed;
          left: 0;
          top: 0;
        }
        .select-item{
            flex: 1;
            height: 100%;
            text-align: center;
            line-height: 100px;
            font-size: 30px;
            border-top: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
            &.active{
                color: $red;
            }
            .iconfont{
                &.icon-down1{
                    color: #999;
                    padding-left: 10px;
                    font-size: 22px;
                }
                &.icon-up1{
                    @extend .icon-down1;
                    font-size: 34px;
                }
                &.icon-shaixuan{
                    @extend .icon-down1;
                    font-size: 28px;
                }
                &.active{
                    color: $red;
                }
            }
        }
    }
    .product-list{
        width: 100%;
        .product-item{
            @include fj;
            width: 100%;
            height: 240px;
            padding: 20px 0;
            border-bottom: 1px solid #dcdcdc;
            img{
                width: 240px;
                height: 240px;
                padding: 0 20px;
            }
            .product-info{
                width: 64%;
                height: 240px;
                padding: 10px;
                @include boxSizing;
                .name{
                    width: 100%;
                    max-height: 80px;
                    line-height: 40px;
                    font-size: 30px;
                    color: #333;
                    overflow: hidden;
                }
                .subtitle{
                    width: 100%;
                    max-height: 40px;
                    padding: 20px 0;
                    line-height: 50px;
                    font-size: 26px;
                    color: #999;
                    overflow: hidden;
                }
                .price{
                    color: $red;
                    font-size: 32px;
                }
            }
        }
    }
</style>
