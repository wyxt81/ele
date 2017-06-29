<template>
    <section class="pop">
      <div class="bg">
      </div>
      <h2>{{seller.name}}</h2>
      <component :is="star"></component>
      <div class="cheap">
        <h3>优惠信息</h3>
        <ul>
          <li v-for="item in seller.supports">{{item.description}}</li>
        </ul>
      </div>
      <div class="">
        <h3>商家公告</h3>
        <p>{{seller.bulletin}}</p>
      </div>
      <div class="close" @click="close">
        X
      </div>

    </section>
</template>

<script>
import Star1 from '../Star/Star1'
import Star15 from '../Star/Star15'
import Star2 from '../Star/Star2'
import Star3 from '../Star/Star3'
import Star35 from '../Star/Star35'
import Star4 from '../Star/Star4'
import Star45 from '../Star/Star45'
import Star5 from '../Star/Star5'
export default {
  props:{
    seller:{
      type:Object,
      require:true
    }
  },
  methods:{
    close(){
      this.$emit('close')
    }
  },
  computed:{
    star(){
      let score = this.seller.score;
      switch(true){
        case score==1:
          return 'ele-star1';
        case score>1 && score<2:
          return 'ele-star15';
        case score==2:
          return 'ele-star2';
        case score>2 && score<3:
          return 'ele-star25';
        case score==3:
          return 'ele-star3';
        case score>3 && score<4:
          return 'ele-star35';
        case score==4:
          return 'ele-star4';
        case score>4 && score<5:
          return 'ele-star45';
        case score==5:
          return 'ele-star5';
        default:
          return 'ele-star5';
      }
    }
  },
  components:{
    'ele-star1':Star1,
    'ele-star15':Star15,
    'ele-star2':Star2,
    'ele-star3':Star3,
    'ele-star35':Star35,
    'ele-star4':Star4,
    'ele-star45':Star45,
    'ele-star5':Star5,
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';

  .pop{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:rgba(7,17,27,.8);
    .padding(136,72,64,72);
    z-index:200;
    h2{
      .fs(32);
      font-weight:700;
      text-align:center;
      .padding(0,0,32,0);
    }
    h3{
      text-align:center;
      .fs(28);
      font-weight:700;
      color:#fff;
      position:relative;
      .padding(56,0,48,0);
      &:before,&:after{
        content:"";
        position:absolute;
        .w(224);
        .h(2);
        background-color:rgba(255,255,255,.2)
      }
      &:before{
        left:0;
        top:50%;
      }
      &:after{
        right:0;
        top:50%;
      }
    }
    li{
      .fs(24);
      font-weight:200;
      color:#fff;
      .padding(0,0,24,0);
    }
    p{
      .fs(24);
      .lht(48);
      color:#fff;
      font-weight:200;
    }
    .bg{
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      left:0;
      filter:blur(10px);
    }
    .close{
      position:absolute;
      .bottom(64);
      left:50%;
      transform:translateX(-50%);
      .fs(64);
      color:rgba(255,255,255,0.5);
    }

  }
</style>
