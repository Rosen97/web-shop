<template>
    <div class="user-shipping">
        <div class="user-reset-header">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>收货地址</span>
        </div>
        <ul class="user-shipping-list">
            <li class="user-shipping-item" v-for="(item,index) in shippingList">
                <div class="shipping-top">
                    <div>
                        <span v-text="item.receiverName"></span>
                        <span v-text="item.receiverMobile"></span>
                    </div>
                    <p class="shipping-address">{{item.receiverProvince}} {{item.receiverCity}}</p>
                    <p class="shipping-address">{{item.receiverAddress}}</p>
                </div>
                <div class="shipping-bottom">
                    <div class="user-shipping-default" :class="{'active' : defaultIndex === index}" @click="setDefault(index)">
                        <i class="iconfont icon-duigou" v-if="defaultIndex === index"></i>
                        <i class="iconfont icon-weibiaoti38" v-else></i>
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
            </li>
        </ul>
        <p class="add-shipping" @click="addShipping">新增收货地址</p>
        <transition name="slide">
            <div class="new-shipping" v-show="addShippingWrap">
                <div class="user-reset-header">
                    <i class="iconfont icon-left" @click="hideShippingWrap"></i>
                    <span>添加新地址</span>
                    <a @click="saveShipping($event)" class="add-save">保存</a>
                </div>
                <div class="new-shipping-content">
                    <div class="new-shipping-item receiver">
                        <span class="shipping-title">收货人</span>
                        <input placeholder="请填写收货人" class="shipping-text" v-model="shipping.receiverName" />
                    </div>
                    <div class="new-shipping-item mobile">
                        <span class="shipping-title">联系电话</span>
                        <input placeholder="请填写联系电话" class="shipping-text" v-model="shipping.receiverMobile" />
                    </div>
                    <div class="new-shipping-item area">
                        <span class="shipping-title">所在地区</span>
                        <p class="shipping-text" @click="selectAddress">{{address}}</p>
                    </div>
                    <div class="new-shipping-item street">
                        <span class="shipping-title">邮编</span>
                        <input placeholder="请填写邮编" class="shipping-text" v-model="shipping.receiverZip" />
                    </div>
                    <div class="new-shipping-item detail">
                        <textarea placeholder="请填写详细地址，不少于5个字" v-model="receiverAddress"></textarea>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="slide">
            <div class="edit-shipping" v-show="editShippingWrap">
                <div class="user-reset-header">
                    <i class="iconfont icon-left" @click="hideShippingWrap"></i>
                    <span>编辑地址</span>
                    <a @click="saveShipping($event)" class="edit-save">保存</a>
                </div>
                <div class="new-shipping-content">
                    <div class="new-shipping-item receiver">
                        <span class="shipping-title">收货人</span>
                        <input placeholder="请填写收货人" class="shipping-text" v-model="shipping.receiverName" />
                    </div>
                    <div class="new-shipping-item mobile">
                        <span class="shipping-title">联系电话</span>
                        <input placeholder="请填写联系电话" class="shipping-text" v-model="shipping.receiverMobile" />
                    </div>
                    <div class="new-shipping-item area">
                        <span class="shipping-title">所在地区</span>
                        <p class="shipping-text" @click="selectAddress">{{address}}</p>
                    </div>
                    <div class="new-shipping-item street">
                        <span class="shipping-title">邮编</span>
                        <input placeholder="请填写邮编" class="shipping-text" v-model="shipping.receiverZip" />
                    </div>
                    <div class="new-shipping-item detail">
                        <textarea placeholder="请填写详细地址，不少于5个字" v-model="receiverAddress"></textarea>
                    </div>
                </div>
            </div>
        </transition>

        <popup :popup-title="popupTitle"
               :popup-show="popupShow"
               @cancelPopup="cancelPopup"
               @confirmPopup="confirmPopup"></popup>
        <div class="picker" v-if="pickerShow" @click="closePicker($event)">
            <div class="picker-wrapper">
                <div class="picker-head">
                    <span>所在区域</span>
                    <i class="iconfont icon-close" @click="closePicker($event)"></i>
                </div>
                <div class="address">
                    <span :class="{'active' : selectIndex === 0}" data-index="0" @click="changeTag($event)">{{provinceTitle}}</span>
                    <span :class="{'active' : selectIndex === 1}" data-index="1" @click="changeTag($event)">{{cityTitle}}</span>
                    <span :class="{'active' : selectIndex === 2}" data-index="2" @click="changeTag($event)">{{areaTitle}}</span>
                </div>
                <div class="picker-content">
                    <div class="picker-item" v-if="selectIndex === 0">
                        <list-scroll :scroll-data="areaData">
                            <div class="provinceList">
                                <span v-for="(item,index) in areaData"
                                      :class="{'active' : provinceIndex === index}"
                                      @click="selectProvince(index)">
                                    <i class="iconfont icon-right" v-if="provinceIndex === index"></i>
                                    {{item.value}}
                                </span>
                            </div>
                        </list-scroll>
                    </div>
                    <div class="picker-item" v-if="selectIndex === 1">
                        <list-scroll :scroll-data="cityList">
                            <div class="cityList">
                                <span v-for="(item,index) in cityList"
                                      :class="{'active' : cityIndex === index}"
                                      @click="selectCity(index)">
                                    <i class="iconfont icon-right" v-if="cityIndex === index"></i>
                                    {{item.value}}
                                </span>
                            </div>
                        </list-scroll>
                    </div>
                    <div class="picker-item" v-if="selectIndex === 2">
                        <list-scroll :scroll-data="areaList">
                            <div class=" areaList">
                                <span v-for="(item,index) in areaList"
                                      :class="{'active' : areaIndex === index}"
                                      @click="selectArea(index)">
                                    <i class="iconfont icon-right" v-if="areaIndex === index"></i>
                                    {{item.value}}
                                </span>
                            </div>
                        </list-scroll>
                    </div>
                </div>
            </div>
        </div>
        <div class="shipping-empty" v-show="shippingList.length === 0">你还没有添加收货地址</div>
    </div>
</template>

<script>
    import listScroll from '../../components/common/list-scroll'
    import popup from 'components/common/popup'
    import {addressList,addAddress,updateAddress} from "../../service/getData";
    import {mapState,mapMutations} from 'vuex'
    import areaData from './area'
    import {removeSpace,formValidate} from "../../common/js/util";
    export default {
        data() {
            return {
                shippingList: [],
                shipping: {
                    userId: '',
                    id: '',
                    receiverPhone: '',
                    receiverName: '',
                    receiverMobile: '',
                    receiverProvince: '',
                    receiverCity: '',
                    receiverAddress: '',
                    receiverZip: ''
                },
                receiverAddress: '',
                areaData: [],
                cityList: [],
                areaList: [],
                selectIndex: 0,   //地址标签索引
                provinceIndex: -1,  //省份索引
                cityIndex: -1,     //城市索引
                areaIndex: -1,     //区域索引
                defaultIndex: 0,
                address: '请选择所在区域',
                provinceTitle: '请选择',
                cityTitle: '请选择',
                areaTitle: '请选择',
                deleteShippingId: 0,
                addShippingWrap: false,
                editShippingWrap: false,
                popupTitle: '',
                popupShow: false,
                pickerShow: false
            }
        },
        computed: {
            ...mapState({
                shippingId: state => state.shippingId
            })
        },
        created(){
            this.getShippingData()
            this.areaData = areaData
            console.log(areaData)
        },
        methods: {
            ...mapMutations([
                'RECORD_SHIPPINGID'
            ]),
            async getShippingData(){
                let pageNum = 1,
                    pageSize = 10
                await addressList(pageNum,pageSize).then((res)=>{
                    if(res.data.list.length > 0){
                        this.shipping.userId = res.data.list[0].userId
                    }else{
                        this.RECORD_SHIPPINGID(0)
                    }
                    this.shippingList = res.data.list
                })
                //shippingId为0   默认为第一个地址
                if(this.shippingList.length > 0){
                    if(!this.shippingId && this.shippingList){
                        this.RECORD_SHIPPINGID(this.shippingList[0].id)
                    }
                  if(!this.shippingList){  //没有收获地址 return
                    return
                  }
                  this.shippingList.forEach((item,index)=>{
                    if(item.id === this.shippingId){
                      this.defaultIndex = index
                    }
                  })
                }
            },
            //默认收获地址
            setDefault(index){
                this.defaultIndex = index
                this.RECORD_SHIPPINGID(this.shippingList[index].id)
            },
          //编辑地址
            async editShipping(id){
                this.resetShipping()
                this.shipping.id = id
                this.editShippingWrap = true
                await this.$http('/api/shipping/select.do',{
                    shippingId: id
                },'POST').then((res)=>{
                    this.shipping = res.data
                    this.receiverAddress = this.shipping.receiverAddress
                })
                this.initPicker()
            },
            initPicker(){
                console.log(this.shipping.receiverProvince)
                console.log(this.shipping.receiverCity)
                areaData.forEach((item,index)=>{
                    if(item.value === this.shipping.receiverProvince){
                        this.provinceIndex = index
                        this.provinceTitle = this.shipping.receiverProvince
                        this.selectProvince(index)
                    }
                })
                areaData[this.provinceIndex].children.forEach((item,index)=>{
                    if(item.value === this.shipping.receiverCity){
                        this.cityIndex = index
                        this.cityTitle = this.shipping.receiverCity
                        this.selectCity(index)
                    }
                })
                this.areaIndex = 0
                this.areaTitle = areaData[this.provinceIndex].children[0].value
                this.selectArea(0)
                this.address = this.provinceTitle + this.cityTitle + this.areaTitle
            },
          //删除地址
            deleteShipping(id){
              ModalHelper.afterOpen()
              this.popupTitle = '确定删除改地址吗？'
              this.popupShow = true
              this.deleteShippingId = id
            },
          confirmPopup(){
            this.$http('/api/shipping/del.do',{
              shippingId: this.deleteShippingId
            },'POST').then(()=>{
              this.getShippingData()
            })
            if(this.deleteShippingId === this.shippingId){  //如果删除的是默认地址，第一个为默认地址
              addressList(1,10).then((res)=>{
                if(res.data.list.length > 0){
                  this.RECORD_SHIPPINGID(res.data.list[0].id)
                }else{
                  this.RECORD_SHIPPINGID(0)
                }
              })
            }
            this.cancelPopup()
          },
          cancelPopup(){
              ModalHelper.beforeClose()
              this.popupShow = false
          },
          //添加地址
            addShipping(){
                this.resetShipping()
                this.addShippingWrap = true
            },
            changeTag(e){
                let $index = parseInt(e.currentTarget.getAttribute('data-index'))
                this.selectIndex = $index
                this.areaData = areaData
            },
            selectAddress(){
                this.pickerShow = true
            },
            selectProvince(index){
                this.cityList = areaData[index].children
                this.provinceIndex = index
                this.selectIndex = 1
                this.provinceTitle = areaData[index].value
                this.cityTitle = '请选择'
                this.areaTitle = '请选择'
                this.areaList = []
            },
            selectCity(index){
                this.areaList = this.cityList[index].children
                this.cityIndex = index
                this.selectIndex = 2
                this.cityTitle = this.cityList[index].value
                this.areaTitle = '请选择'
            },
            selectArea(index){
                this.areaIndex = index
                this.areaTitle = this.areaList[index].value
                this.pickerShow = false
                this.address = `${this.provinceTitle} ${this.cityTitle} ${this.areaTitle}`
                this.shipping.receiverProvince = this.provinceTitle
                this.shipping.receiverCity = this.cityTitle
            },
            closePicker(e){
                let $className = e.target.className
                if($className == 'picker' || $className == 'iconfont icon-close'){
                    this.pickerShow = false
                }
            },
            //添加新地址 or 更新地址
            saveShipping(e){
                console.log(e.currentTarget.className)
                console.log(this.receiverAddress)
                if(!this.shipping.receiverName || !this.shipping.receiverMobile || this.provinceIndex === -1
                    || this.cityIndex === -1 || this.areaIndex === -1 || !this.shipping.receiverZip || !this.receiverAddress){
                    alert('请将表格填写完整')
                    return
                }
                if(!formValidate(this.shipping.receiverMobile,'phone')){
                    alert('手机号格式不正确')
                    return
                }
                let $className = e.currentTarget.className
                if($className === 'add-save'){
                    this.shipping.receiverAddress = this.areaTitle + this.receiverAddress
                    addAddress(this.shipping).then(()=>{})
                    this.addShippingWrap = false
                }else{
                    this.shipping.receiverAddress = this.receiverAddress
                    updateAddress(this.shipping).then(()=>{})
                    this.editShippingWrap = false
                }
                setTimeout(()=>{   //确保数据更新到服务端在请求地址列表
                    this.getShippingData()
                },500)
            },
            resetShipping(){  //重置shipping参数
                this.shipping.receiverPhone = ''
                this.shipping.receiverName = ''
                this.shipping.receiverMobile = ''
                this.shipping.receiverProvince = ''
                this.shipping.receiverCity = ''
                this.shipping.receiverAddress = ''
                this.shipping.receiverZip = ''
                this.receiverAddress = ''
                this.cityList = []
                this.areaList = []
                this.selectIndex = 0
                this.provinceIndex = -1
                this.cityIndex = -1
                this.areaIndex = -1
                this.address = '请选择所在区域'
                this.provinceTitle = '请选择'
                this.provinceTitle = '请选择'
                this.cityTitle = '请选择'
                this.areaTitle =  '请选择'
            },
            hideShippingWrap(){
                this.addShippingWrap = false
                this.editShippingWrap = false
            },
            removeSpace(value){
                return removeSpace(value)
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        components: {
            popup,
            listScroll
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import '../../common/style/mixin';
    .user-shipping{
        position: relative;
        background: #eee;
        .user-reset-header{
            position: relative;
            width: 100%;
            padding: 20px;
            text-align: center;
            font-size: 36px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background: #fff;
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
            padding-bottom: 120px;
            background: #eee;
            .user-shipping-item{
                width: 100%;
                font-size: 30px;
                margin-top: 20px;
                background: #fff;
                .shipping-top{
                    width: 100%;
                    padding: 20px 20px 0 20px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    @include border-1px(#999);
                    div{
                        @include fj;
                        span:first-child{
                            color: $red;
                        }
                    }
                    p{
                        padding: 20px 0;
                        &:last-child{
                            padding: 0 0 20px 0;
                        }
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
                        color: #000;
                        &.active{
                            color: $red;
                        }
                        .iconfont{
                            padding: 4px 10px 0 0;
                            &.icon-duigou{
                                color: $red;
                            }
                            &.icon-weibiaoti38{
                                color: #333;
                            }
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
            background: $red;
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
                    .shipping-text{
                        width: 70%;
                        font-size: 30px;
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
        .delete-shipping-con{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 80%;
            height: 240px;
            margin-left: -40%;
            margin-top: -120px;
            @include borderRadius(20px);
            background: #fff;
            p{
                width: 100%;
                height: 140px;
                text-align: center;
                line-height: 140px;
                font-size: 42px;
                @include border-1px(#999);
            }
            div{
                width: 100%;
                height: 100px;
                display: flex;
                span{
                    flex: 1;
                    text-align: center;
                    line-height: 100px;
                    font-size: 40px;
                    color: #218BFD;
                    box-sizing: border-box;
                    &:first-child{
                        border-right: 1px solid #999;
                    }
                }
            }
        }
        .picker{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            z-index: 10000;
            .picker-wrapper{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 800px;
                background: #fff;
                .picker-head{
                    position: relative;
                    width: 100%;
                    height: 100px;
                    text-align: center;
                    line-height: 100px;
                    font-size: 34px;
                    .iconfont{
                        position: absolute;
                        right: 40px;
                        top: 0;
                        font-size: 38px;
                    }
                }
                .address{
                    display: flex;
                    width: 100%;
                    border-bottom: 1px solid #999;
                    span{
                        width: 20%;
                        height: 100px;
                        margin: 0 5%;
                        text-align: center;
                        line-height: 100px;
                        font-size: 30px;
                        &.active{
                            color: $red;
                            border-bottom: 1px solid $red;
                        }
                    }
                }
                .picker-content{
                    display: flex;
                    width: 100%;
                    .picker-item{
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                        width: 50%;
                        height: 600px;
                        overflow: hidden;
                        /*oveflow-y: scroll;*/
                        span{
                            position: relative;
                            display: block;
                            width: 100%;
                            height: 100px;
                            padding-left: 70px;
                            text-align: left;
                            line-height: 100px;
                            font-size: 30px;
                            @include boxSizing;
                            &.active{
                                color: $red;
                            }
                            .iconfont{
                                position: absolute;
                                left: 30px;
                                color: $red;
                                font-size: 30px;
                            }
                        }
                    }
                }
            }
        }
        .shipping-empty{
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 34px;
            transform: translate(-50%,-50%);
        }
        .slide-enter-active,.slide-leave-active{
            transition: all 0.5s;
        }
        .slide-enter,.slide-leave-to{
            transform: translate3d(100%,0,0);
        }
    }
</style>
