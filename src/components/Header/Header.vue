<template>
  <header>
    <!-- seller部分 -->
    <div class="seller">
      <img :src="seller.avatar" alt="">
      <div class="seller-wrapper">
        <h3><i></i>{{seller.name}}</h3>
        <p class="delivery">{{seller.description}}/{{seller.deliveryTime}}分送达</p>
        <p class="support"><i></i>{{seller.supports[0].description}}</p>
      </div>
      <div class="sw"  @click="showPop">
        {{seller.supports.length}}个 >
      </div>
    </div>

    <!-- bulletin部分 -->
    <div class="bulletin"  @click="showPop">
      <i></i>
      <p>{{seller.bulletin}}</p>
      <span>></span>
    </div>
    <!-- 弹出框 -->
    <transition name="bounce">
      <ele-pop :seller="seller" v-show="show" @close="close"></ele-pop>
    </transition>

    <!-- bg -->
    <div class="bg">
      <img :src="seller.avatar" alt="">
    </div>
  </header>
</template>

<script>
import Pop from '../Pop/Pop';
export default {
  data(){
    return {
      show:false,
    }
  },
  props:{
    seller:{
      type:Object,
      require:true
    }
  },
  components:{
    'ele-pop':Pop,
  },
  methods:{
    showPop(){
      this.show = true;
    },
    close(){
      this.show = false;
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/public.less';
header{
  .h(268);
  width:100%;
  overflow:hidden;
  background-color:rgba(7,17,27,.5);
  color:#fff;
  position:relative;
  .seller{
    .margin(48,24,36,48);
    display:flex;
    justify-content:space-between;
    img{
      .w(128);
      .h(128);
      .border-radius(4);
      .padding(0,32,0,0);
    }
    .seller-wrapper{
      flex-grow:1;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      h3{
        .fs(32);
        font-weight:bold;
        i{
          display:inline-block;
        vertical-align:middle;
          .h(36);
          .w(60);
          background-image:url(../../assets/brand@2x.png);
          background-size:contain;
          .margin(0,12,0,0);
        }
      }
      .delivery{
        .fs(24);
        font-weight:200;
      }
      .support{
        .fs(20);
        font-weight:200;
        i{
          display:inline-block;
          .h(24);
          .w(24);
          background-image:url(../../assets/decrease_1@2x.png);
          background-size:contain;
          vertical-align:middle;
          .margin(0,8,0,0);
        }
      }
    }
    .sw{
      align-self:flex-end;
      .fs(20);
      background-color:rgba(0,0,0,.2);
      .bdr(16,14);
      .h(48);
      .lht(48);
      .padding(0,16,0,16);
    }
  }
  .bulletin{
    .h(56);
    .fs(20);
    display:flex;
    align-items:center;
    justify-content:space-between;
    background-color:rgba(7,17,27,.2);
    .padding(0,24,0,24);
    i{
      .w(44);
      .h(24);
      background-image:url(../../assets/bulletin@2x.png);
      background-size:contain;
      flex:none;
      .margin(0,8,0,0);
    }
    p{
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      flex:auto;
    }
    span{
      flex:none;
    }
  }

  .bg{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:-1;
    filter:blur(10px);
    img{
      width:100%;
      height:100%;
    }
  }

}
@keyframes bounce-in{
  0%{opacity:0;transform:scale(0);}
  50%{transform:scale(1.5);}
  100%{transform:scale(1);}
}
@keyframes bounce-out{
  0%{transform:scale(1);}
  50%{transform:scale(1.5);}
  100%{transform:scale(0);}
}
.bounce-enter-active{
  animation:bounce-in .5s;
}
.bounce-leave-active{
  animation:bounce-out .5s;
}
</style>
