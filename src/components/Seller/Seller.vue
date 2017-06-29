<template>
  <section class="sellerpage">
    <div>
      <div class="seller-info">
        <div class="top">
          <div class="left">
            <h3>{{seller.name}}</h3>
            <p>
              <span><ele-star :score="seller.score"></ele-star></span>
              <span>
                ({{seller.ratingCount}})
                月售{{seller.sellCount}}单
              </span>
            </p>
          </div>
          <div class="right" @click="collect=!collect">
            <span :class="{red:collect}">
              <i class="iconfont icon-aixin"></i>
            </span>
            <p v-show="!collect">收藏</p>
            <p v-show="collect">已收藏</p>
          </div>
        </div>
        <ul>
          <li>
            <p>起送价</p>
            <h3>{{seller.minPrice}}<span>元</span></h3>
          </li>
          <li>
            <p>商家配送</p>
            <h3>{{seller.deliveryPrice}}<span>元</span></h3>
          </li>
          <li>
            <p>评价配送时间</p>
            <h3>{{seller.deliveryTime}}<span>元</span></h3>
          </li>
        </ul>
      </div>
      <div class="bulletin">
        <h3>公告与活动</h3>
        <p>{{seller.bulletin}}</p>
        <ul>
          <li v-for="item in seller.supports">
            <i :class="{dec:item.type==0,dis:item.type==1,gua:item.type==2,inv:item.type==3,spe:item.type==4}"></i>
            {{item.description}}
          </li>
        </ul>
      </div>
      <div class="view">
        <h3>商家实景</h3>
        <div class="view-imgs">
          <ul ref="imgs">
            <li v-for="item in seller.pics" ref="img"><img :src="item" alt=""></li>
          </ul>
        </div>

      </div>
      <div class="seller-title">
        <h3>商家信息</h3>
        <ul>
          <li v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import ele from '../../../data.json';
import Star from '../Star/Star.vue';
import '../../assets/js/iscroll-probe.js';
export default {
  data(){
    return {
      seller:{},
      collect:false,
    }
  },
  components:{
    'ele-star':Star,
  },
  created(){
    this.seller = ele.seller;
  },
  mounted(){
    new IScroll('.sellerpage');
    let w =  this.$refs.img[0].offsetWidth;
    console.info( this.$refs.imgs );
    console.info( this.seller.pics.length+1 );
    this.$refs.imgs.style.width = (this.seller.pics.length)*w + 'px';
    new IScroll('.view-imgs',{scrollX:true,scrollY:false});
  },
  updated(){
    new IScroll('.sellerpage');
    let w =  this.$refs.img[0].offsetWidth;
    console.info( this.$refs.imgs );
    console.info( this.seller.pics.length+1 );
    this.$refs.imgs.style.width = (this.seller.pics.length)*w + 'px';
    new IScroll('.view-imgs',{scrollX:true,scrollY:false});
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
.sellerpage{
  position:fixed;
  .top(349);
  bottom:0;
  width:100%;
  overflow-y:hidden;
  background-color:#F3F5F7;
  border-top:1px solid rgba(7,17,27,.1);
  .fs(28);
  .seller-info{
    .padding(36,36,36,36);
    .margin(0,0,36,0);
    .h(300);
    box-sizing:border-box;
    background-color:#fff;
    border-bottom:1px solid rgba(7,17,27,.1);
    .top{
      display:flex;
      justify-content:space-between;
      border-bottom:1px solid rgba(7,17,27,.1);
      .padding(0,0,36,0);
      .left{
        flex:1;
        h3{
          color:rgb(7,17,27);
          .padding(0,0,16,0);
        }
        p{
          display:flex;
          justify-content:flex-start;
          align-items:center;
        }
      }
      .right{
        text-align:center;
        color:rgb(77,85,93);
        .w(70);
        span{
          .fs(48);
          &.red{
            color:rgb(240,20,20);
          }
        }
        p{
          .padding(8,0,0,0);
          .fs(20);
          white-space:nowrap;
        }
      }
    }
    ul{
      display:flex;
      // align-items:center;
      .padding(36,0,0,0);
      li{
        flex:1;
        text-align:center;
        display:flex;
        flex-direction:column;
        justify-content:center;
        border-right:1px solid rgba(7,17,27,.1);
        &:last-child{
          border:0 none;
        }
        p{
          color:rgb(147,153,159);
          .fs(20);
          .padding(0,0,8,0);
        }
        h3{
          .fs(48);
          color:rgb(7,17,27);
          font-weight:200;
          span{
            .fs(20);
          }
        }
      }
    }
  }
  .bulletin{
    border-top:1px solid rgba(7,17,27,.1);
    .padding(36,36,0,36);
    background-color:#fff;
    .margin(0,0,32,0);
    border-bottom:1px solid rgba(7,17,27,.1);
    h3{
      color:rgb(7,17,27);
      .padding(0,0,16,0);
    }
    p{
      .fs(24);
      .lht(48);
      color:rgb(240,20,20);
      font-weight:100;
      .padding(0,24,32,24);
    }
    ul{

      li{
        border-top:1px solid rgba(7,17,27,.1);
        display:flex;
        .padding(32,24,32,24);
        .fs(24);
        color:rgb(7,17,27);
        .lht(32);
        i{
          .w(32);
          .h(32);
          background-size:100% 100%;
          .margin(0,12,0,0);
          &.dec{
            background-image:url(./decrease_4@2x.png);
          }
          &.dis{
            background-image:url(./discount_4@2x.png);
          }
          &.gua{
            background-image:url(./guarantee_4@2x.png);
          }
          &.inv{
            background-image:url(./invoice_4@2x.png);
          }
          &.spe{
            background-image:url(./special_4@2x.png);
          }
        }
      }
    }
  }
  .view{
    border-top:1px solid rgba(7,17,27,.1);
    border-bottom:1px solid rgba(7,17,27,.1);
    background-color:#fff;
    .padding(36,0,36,36);
    .margin(0,0,32,0);

    h3{
      .fs(28);
      color:rgb(7,17,27);
      .padding(0,0,24,0);
    }
    ul{
      display:flex;
      .h(180);
      li{
        .w(240);
        .h(180);
        .padding(0,12,0,0);
        flex-shrink:0;
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
  .seller-title{
    border-top:1px solid rgba(7,17,27,.1);
    background-color:#fff;
    .padding(36,0,36,36);
    h3{
      .fs(28);
      color:rgb(7,17,27);
      .padding(0,0,24,0);
    }
    ul{

      li{
        border-top:1px solid rgba(7,17,27,.1);
        display:flex;
        .padding(32,24,32,24);
        .fs(24);
        color:rgb(7,17,27);
        .lht(32);

        }
      }
    }

  }

</style>
