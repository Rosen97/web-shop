<template>
    <div class="user-shipping">
        <div class="user-reset-header">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>管理收货地址</span>
        </div>
        <ul class="user-shipping-list">
            <li class="user-shipping-item" v-for="item in shippingList">
                <div class="shipping-top">
                    <div>
                        <span v-text="item.receiverName"></span>
                        <span v-text="item.receiverMobile"></span>
                    </div>
                    <p class="shipping-address" v-text="`${item.receiverCity}${item.receiverDistrict}${item.receiverAddress}`"></p>
                </div>
                <div class="shipping-bottom">
                    <div class="user-shipping-default">
                        <i class="iconfont icon-duigou"></i>默认地址
                    </div>
                    <div>
                        <span class="user-shipping-edit" @click="editShipping(item.id)">
                            <i class="iconfont icon-edit"></i>编辑
                        </span>
                        <span class="user-shipping-delete" @click="deleteShipping(item.id)">
                            <i class="iconfont icon-delete"></i>删除
                        </span>
                    </div>
                </div>
                <p class="user-shipping-gap"></p>
            </li>
        </ul>
        <p class="add-shipping" @click="addShipping">添加新地址</p>
        <div class="new-shipping" v-show="addShippingWrap">
            <div class="user-reset-header">
                <i class="iconfont icon-left" @click="hideShippingWrap"></i>
                <span>添加新地址</span>
                <a @click="saveShipping($event)" class="add-save">保存</a>
            </div>
            <div class="new-shipping-content">
                <div class="new-shipping-item receiver">
                    <span class="shipping-title">收货人</span>
                    <input class="shipping-content" v-model="shipping.receiverName" />
                    <i></i>
                </div>
                <div class="new-shipping-item mobile">
                    <span class="shipping-title">联系电话</span>
                    <input class="shipping-content" v-model="shipping.receiverMobile" />
                    <i></i>
                </div>
                <div class="new-shipping-item area">
                    <span class="shipping-title">所在地区</span>
                    <input placeholder="请选择" class="shipping-content" v-model="shipping.receiverProvince" />
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="new-shipping-item street">
                    <span class="shipping-title">邮编</span>
                    <input placeholder="请选择" class="shipping-content" v-model="shipping.receiverZip" />
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="new-shipping-item detail">
                    <textarea placeholder="请填写详细地址，不少于5个字" v-model="shipping.receiverAddress"></textarea>
                </div>
            </div>
        </div>
        <div class="edit-shipping" v-show="editShippingWrap">
            <div class="user-reset-header">
                <i class="iconfont icon-left" @click="hideShippingWrap"></i>
                <span>编辑地址</span>
                <a @click="saveShipping($event)" class="edit-save">保存</a>
            </div>
            <div class="new-shipping-content">
                <div class="new-shipping-item receiver">
                    <span class="shipping-title">收货人</span>
                    <input class="shipping-content" v-model="shipping.receiverName" />
                    <i></i>
                </div>
                <div class="new-shipping-item mobile">
                    <span class="shipping-title">联系电话</span>
                    <input class="shipping-content" v-model="shipping.receiverMobile" />
                    <i></i>
                </div>
                <div class="new-shipping-item area">
                    <span class="shipping-title">所在地区</span>
                    <input placeholder="请选择" class="shipping-content" v-model="shipping.receiverProvince" />
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="new-shipping-item street">
                    <span class="shipping-title">邮编</span>
                    <input placeholder="请选择" class="shipping-content" v-model="shipping.receiverZip" />
                    <i class="iconfont icon-right"></i>
                </div>
                <div class="new-shipping-item detail">
                    <textarea placeholder="请填写详细地址，不少于5个字" v-model="shipping.receiverAddress"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shippingList: [],
                shipping: {
                    receiverName: '',
                    receiverMobile: '',
                    receiverProvince: '',
                    receiverCity: '',
                    receiverDistrict: '',
                    receiverAddress: '',
                    receiverZip: ''
                },
                addShippingWrap: false,
                editShippingWrap: false
            }
        },
        created(){
            this.getShippingData()
        },
        methods: {
            getShippingData(){
                this.$http('/api/shipping/list.do',{
                    pageNum: 1,
                    pageSize: 10
                },'POST').then((res)=>{
                    console.log(res)
                    this.shippingList = res.list
                })
            },
            editShipping(id){
                this.editShippingWrap = true
                this.$http('/api/shipping/select.do',{
                    shippingId: id
                },'POST').then((res)=>{
                    this.shipping = res
                })
            },
            deleteShipping(id){
                this.$http('/api/shipping/del.do',{
                    shippingId: id
                },'POST').then((res)=>{
                    this.getShippingData()
                })
            },
            addShipping(){
                this.addShippingWrap = true
            },
            saveShipping(e){
                if(!this.shipping.receiverName || !this.shipping.receiverMobile){
                    alert('请将表格填写完整')
                    return
                }
                this.shipping.receiverCity = this.shipping.receiverDistrict = this.shipping.receiverProvince
                let $className = e.currentTarget.className,
                    $url = ''
                $className === 'add-save' ? $url = '/api/shipping/add.do' : $url = '/api/shipping/update.do'
                this.$http($url,this.shipping,'GET').then((res)=>{
                    console.log(res)
                    this.addShippingWrap = false
                    this.getShippingData()
                })
            },
            hideShippingWrap(){
                this.addShippingWrap = false
                this.editShippingWrap = false
            },
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import '../../../common/style/mixin';
    .user-shipping{
        background: #eee;
        .user-reset-header{
            position: relative;
            width: 100%;
            padding: 25px;
            text-align: center;
            font-size: 36px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background: #eee;
            i{
                position: absolute;
                left: 20px;
                top: 20px;
                font-size: 54px;
            }
            a{
                position: absolute;
                right: 40px;
            }
        }
        .user-shipping-list{
            width: 100%;
            background: #fff;
            .user-shipping-item{
                width: 100%;
                font-size: 30px;
                .shipping-top{
                    width: 100%;
                    padding: 20px 20px 0 20px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    @include border-1px(#999);
                    div{
                        @include fj;
                    }
                    p{
                        padding: 20px 0;
                    }
                }
                .shipping-bottom{
                    @include fj;
                    width: 100%;
                    padding: 25px 20px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    .iconfont{
                        padding: 0 10px;
                        font-size: 40px;
                    }
                    .user-shipping-default{
                        .iconfont{
                            padding: 0 15px 0 0;
                            color: $orange;
                        }
                    }
                }
                .user-shipping-gap{
                    width: 100%;
                    height: 20px;
                    background: #eee;
                }
            }
        }
        .add-shipping{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100px;
            text-align: center;
            line-height: 100px;
            font-size: 36px;
            color: #fff;
            background: #FF6B01;
        }
        .new-shipping,
        .edit-shipping{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #eee;
            z-index: 1000;
            .new-shipping-content{
                width: 100%;
                background: #fff;
                .new-shipping-item{
                    @include fj;
                    width: 100%;
                    height: 90px;
                    padding: 0 20px;
                    line-height: 90px;
                    font-size: 30px;
                    @include border-1px(#e8e8e8);
                    box-sizing: border-box;
                    &.detail{
                        padding: 30px 0;
                        box-sizing: content-box;
                        @include border-1px(#fff);
                        textarea{
                            width: 100%;
                            padding: 0 20px;
                            font-size: 30px;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                    }
                    .shipping-title{
                        flex: 1;
                    }
                    .shipping-content{
                        flex: 4;
                        height: 100%;
                        font-size: 30px;
                    }
                    i{
                        font-size: 32px;
                        color: #666;
                    }
                }
            }
        }
    }
</style>
