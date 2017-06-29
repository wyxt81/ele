<template>
  <div>
    <footer @click="toggleShow">
      <div class="cart-left">
        <div class="outter">
          <div class="inner" :class="{blue:cartCount}">
            <i class="iconfont icon-gouwuche"></i>
          </div>
          <span v-show="cartCount">{{cartCount}}</span>
        </div>
      </div>
      <div class="cart-mid">
        <p>￥{{cartPrice}}元</p>
        <i></i>
        另需配送费4元
      </div>
      <div class="cart-right" :class="{blue:cartPrice>=minPrice}">
        {{deli}}
      </div>

    </footer>
    <transition name="slide">
      <div class="cart" v-show="cartShows">
        <h2>购物车<span @click="removeAll">清空</span></h2>
        <ul>
          <!-- <transition name="scale"> -->
          <li v-for="item in cartFood" leave-active-class="animated slideOutDown">
            <h3>{{item.name}}</h3>
            <strong class="price"><span>￥</span>{{item.price}}</strong>
            <ele-add :food="item"></ele-add>
          </li>
          <!-- </transition> -->
        </ul>

      </div>
    </transition>
    <transition name="fade">
      <div class="cover" v-show="cartShows"></div>
    </transition>

  </div>

</template>

<script>
import AddCart from '../AddCart/AddCart';
export default {
  data(){
    return {
      cartShow:false,
    }
  },
  props:{
    minPrice:Number,
    goods:Array
  },
  computed:{
    deli(){
      if(this.cartCount==0){
        return `￥20元起送`;
      }
      if(this.cartPrice<this.minPrice){
        return `还差￥${this.minPrice-this.cartPrice}起送`;
      }
      return "结算";
    },

      cartFood(){
        let arr=[];
        this.goods.forEach(val=>{
          val.foods.filter(item=>{
            if(item.count){
              arr.push(item);
            }
          });
        });
        return arr;
      },
      cartPrice(){
        let sum = 0;
        this.cartFood.forEach(val=>{
          sum+= val.count*val.price
        })
        return sum;
      },
      cartCount(){
        let price = 0;
        for( let i=0;i<this.cartFood.length;i++ ){
          price += this.cartFood[i].count;
        }
        return price;
      },
      cartShows(){
        if(this.cartFood.length==0){
          this.cartShow=false;
          return false;
        }
        return this.cartShow;
      }
  },
  methods:{
    removeAll(){
      this.cartFood.forEach(val=>val.count=0);
    },
    toggleShow(){
      if(this.cartFood.length){
        this.cartShow = !this.cartShow;
      }
    }
  },
  components:{
    'ele-add':AddCart,
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
@import '../../assets/css/animate.min.css';
footer{
  .h(96);
  width:100%;
  position:fixed;
  left:0;
  bottom:0;
  z-index:100;
  background-color:#141d27;
  display:flex;
  .cart-left{
    .w(160);
    color:rgba(255,255,255,.4);
    font-weight:700;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    .fs(32);
    .outter{
      .w(112);
      .h(112);
      border-radius:50%;
      background-color:#141d27;
      position:absolute;
      .bottom(4);
      .left(20);
      .inner{
        .w(88);
        .h(88);
        border-radius:50%;
        background-color:rgba(255,255,255,.1);
        position:absolute;
        .left(12);
        .top(12);
        display:flex;
        align-items:center;
        justify-content:center;
        color:rgba(255,255,255,.4);
        .fs(48);
        &.blue{
          background-color:rgb(0,160,220);
          color:#fff;
        }
      }
      span{
        .fs(18);
        background-color:rgb(240,20,20);
        position:absolute;
        .top(0);
        .right(0);
        color:#fff;
        .w(48);
        .lht(32);
        box-sizing:border-box;
        .padding(0,12,0,12);
        .border-radius(16);
        text-align:center;
        display:block;
      }
    }
  }
  .cart-mid{
    display:flex;
    align-items:center;
    flex:auto;
    .fs(24);
    color:rgba(255,255,255,.4);
    font-weight:100;
    p{
      .fs(32);
    }
    i{
      width:1px;
      .h(48);
      background-color:rgba(255,255,255,.1);
      .margin(0,24,0,24);
    }
  }
  .cart-right{
    .w(210);
    .fs(28);
    font-weight:700;
    color:rgba(255,255,255,.5);
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:#2B333B;
    &.blue{
      background-color:rgb(0,160,220);
      color:#fff;
    }
  }
}
.cart{
  .fs(28);
  position:fixed;
  .bottom(96);
  background-color:#fff;
  left:0;
  right:0;
  z-index:50;
  h2{
    background-color:#f3f5f7;
    position:relative;
    .lht(80);
    .padding(0,36,0,36);
    color:rgb(7,17,27);
    border-bottom:1px solid rgba(7,17,27,.1);
    span{
      position:absolute;
      .right(36);
      bottom:0;
      .fs(24);
      color:rgb(0,160,220);
    }
  }
  ul{
    .padding(0,36,40,36);

    li{
      .h(96);
      display:flex;
      align-items:center;
      border-bottom:1px solid rgba(7,17,27,.1);
      h3{
        flex:auto;
      }
      strong{
        color:rgb(240,20,20);
        .padding(0,24,0,0);
        span{
          .fs(20);
        }
      }
    }
  }
}
.cover{
  background-color:rgba(7,17,27,.8);
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:10;
}
.slide-enter,.slide-leave-active{
  transform:translateY(100%);
}
.slide-enter-active,.slide-leave-active{
  transition:all .5s;
}
.fade-enter,.fade-leave-active{opacity:0;}
.fade-enter-active,.fade-leave-active{transition:all .5s;}

.scale-leave-active{transform:scale(0);transition:all .5s;}
</style>
