<template>
  <div class="">
    <section class="goods">
      <div class="menu">
        <ul>
          <li v-for="(item,index) in goods" @click="goTo(index)" :class="{curr:current==index}" ref="menu">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="goodslist">
        <div>
          <dl class="" v-for="item in goods" ref="goodsitem">
            <dt>{{item.name}}</dt>
            <dd class="" v-for="good in item.foods" @click="foodDetail(good)">
              <div class="food">
                <img :src="good.icon" alt="">
                <div class="goods-info">
                  <h3>{{good.name}}</h3>
                  <p class="info">{{good.description}}</p>
                  <p class="sale"><span>月售{{good.sellCount}}份</span> 好评率{{good.rating}}</p>
                  <p class="price"><strong><span>￥</span>{{good.price}}</strong><del v-if="good.oldPrice">￥{{good.oldPrice}}</del></p>
                </div>
              </div>
              <div class="addcart">
                <ele-add :food="good" @drop='drop'></ele-add>
              </div>

            </dd>
          </dl>
        </div>
      </div>

    </section>
    <transition name="slide">
      <ele-food :food="food" v-show="showfood" @back="back"></ele-food>
    </transition>
    <transition name="ball" v-for="ball in balls"
    @before-enter="beforeEnter"
    @enter="Enter"
    @after-enter="afterEnter"
  >
  <div class="ball" v-show="ball.show">
    <div class="inner"></div>
  </div>
  </transition>
    <ele-cart :minPrice="minPrice" :goods="goods"></ele-cart>
  </div>

</template>

<script>
import ele from '../../../data.json';
// import '../../assets/js/iscroll-probe.js';
import IScroll from '../../../static/iscroll-probe.js';
import Food from '../Food/Food';
import Cart from '../Cart/Cart';
import AddCart from '../AddCart/AddCart';
export default {
  data(){
    return{
      goods:[],
      current:0,
      listHeight:[],
      food:{},
      showfood:false,
      minPrice:0,
      showCart:false,
      balls:[
        {show:false},
        {show:false},
        {show:false},
        {show:false},
        {show:false}
      ],
      dropballs:[]
    }
  },
  methods:{
    goTo(index){
      this.current=index;
      let dls = this.$refs.goodsitem;
      this.listScroll.scrollToElement(dls[index]);
    },
    _getListHeight(){
      let arr = [0];
      let dls = this.$refs.goodsitem;
      for( let i=0;i<dls.length;i++ ){
        arr.push( arr[i]+dls[i].offsetHeight );
      }
      return arr;
    },
    foodDetail(food){
      this.food = food;
      this.showfood = true;
    },
    back(){
      this.showfood = false;
    },
    drop(el){


      for (let i = 0, l = this.balls.length; i < l; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropballs.push(ball)
          return
        }
      }
    },
    beforeEnter(el){
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32 ;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display='';
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.querySelector('.inner')
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    Enter(el){
      el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.querySelector('.inner')
        inner.style.transform = `translate3d(0,0,0)`
      })
    },
    afterEnter(el){
      let ball = this.dropballs.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  computed:{

  },
  components:{
    'ele-food':Food,
    'ele-cart':Cart,
    'ele-add':AddCart
  },
  //应该在此阶段获取数据
  created(){
    this.goods = ele.goods;
    this.minPrice = ele.seller.minPrice;
  },
  mounted(){
    //加click：true
    this.listScroll = new IScroll('.goodslist',{probeType:2,tap:true,click:true});
    this.menuScroll = new IScroll('.menu',{probeType:2,tap:true,click:true});
    //console.info( this._getListHeight() );
    let _this = this;
    this.listHeight = this._getListHeight();
    this.listScroll.on('scrollEnd',function(){
      //console.info( this.y );
      let y = Math.abs(this.y);
      _this.listHeight.findIndex(val=>val>y);
      _this.current = _this.listHeight.findIndex(val=>val>y)-1;
      //console.info( _this.listHeight.findIndex(val=>val>y) );
      let lis = _this.$refs.menu;
      _this.menuScroll.scrollToElement(lis[_this.current]);
    });

  },
}
</script>

<style lang="less">
@import '../../assets/css/public.less';
.goods{
  display:flex;
  position:fixed;
  .top(349);
  left:0;
  right:0;
  overflow:hidden;
  .bottom(96);
  border-top:1px solid rgba(7,17,27,.1);
  .menu{
    .w(160);
    .fs(24);
    flex:none;
    background-color:#f3f5f7;
    li{
      .h(108);
      .padding(0,24,0,24);
      &.curr{
        background-color:#fff;
      }

      p{
        display:flex;
        align-items:center;
        height:100%;
        border-bottom:1px solid rgba(7,17,27,0.1);
        // box-sizing:border-box;
      }
    }
  }
  .goodslist{
    // overflow:hidden;
    flex-grow:1;
    // flex:auto;
    dt{
      color:rgb(147,153,159);
      .fs(24);
      .lht(52);
      .h(52);
      background-color:#f3f5f7;
      border-left:3px solid #d9dde1;
      .padding(0,0,0,28);
    }
    dd{
      position:relative;
      .margin(0,36,0,36);
      .padding(36,0,36,0);
      border-bottom:1px solid rgba(7,17,27,.1);
      .food{
        display:flex;
        img{
          .w(114);
          .h(114);
          // flex:none;
          .padding(0,20,0,0);
        }
        .goods-info{
          // display:flex;
          // flex-direction:column;
          // justify-content:space-between;
          // overflow:hidden;
          flex-grow:1;
          .margin(16,0,16,0);
          h3{
            .fs(28);
            color:rgb(7,17,27);
          }
          .info{
            .fs(20);
            color:rgb(147,153,159);
            .margin(16,0,16,0);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            // width:100%;
            .w(350);


          }
          .sale{
            .fs(20);
            color:rgb(147,153,159);
            .margin(16,0,16,0);
            span{
              .padding(0,24,0,0);
            }
          }
          .price{
              // .lht(48);
              // height:10px;
              display:flex;
            strong{
              .fs(28);
              color:rgb(240,20,20);
              font-weight:700;

              span{
                .fs(20);
                font-weight:normal;
              }
            }
            del{
              .fs(20);
            }
          }
        }
      }
      .addcart{
        position:absolute;
        .right(0);
        .bottom(5);
      }
    }
  }
}
.slide-enter-active,.slide-leave-active{
  transition:all .5s;
}
.slide-enter,.slide-leave-active{
  transform:translateX(100%);
  opacity:0;
}
.ball{
  position: fixed;
  .left(64);
  .bottom(44);
  transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
  .inner{
    .w(30);
    .h(30);
    transition: all 0.4s linear;
    border-radius: 50%;
    z-index: 200;
    background: rgb(0,160,220);
  }
}
</style>
