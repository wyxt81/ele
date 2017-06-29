<template lang="html">
  <section class="food" id="food">
    <div>
      <span class="back" @click="back"> < </span>
      <img :src="food.image" alt="">
      <div class="food-info">
        <h3>{{food.name}}</h3>
        <p class="sale">月售{{food.sellCount}}份<i>好评率{{food.rating}}%</i></p>
        <p class="price">
          <strong><span>￥</span>{{food.price}}</strong>
          <del v-if="food.oldPrice"><span>￥</span>{{food.oldPrice}}</del>
        </p>
        <p class="add" @touchend.self="addCart">加入购物车</p>
      </div>
      <div class="bulletin">
        <h3>{{food.name}}</h3>
        <p>{{food.info}}</p>
      </div>
      <div class="comments">
        <div class="com-title">
          <h3>商品评价</h3>
          <div class="filter">
            <p class="all" @click="rateFilter='all'">全部<span>{{all}}</span></p>
            <p class="reco" @click="rateFilter='reco'">推荐<span>{{reco}}</span></p>
            <p class="bore" @click="rateFilter='bore'">吐槽<span>{{bore}}</span></p>
          </div>
        </div>
        <p class="content" @click="rateFilter='content'"><i class="iconfont icon-gou" :class="{blue:rateFilter=='content'}"></i>只看有内容的评价</p>

        <ul>
          <li v-for="item in rateType">
            <div class="">
              <p class="time">{{item.rateTime|getTime}}</p>
              <p class="com">
                <i v-if="item.rateType==1" class="iconfont icon-down"></i>
                <i v-else="item.rateType==0" class="iconfont icon-damuzhi"></i>
                {{item.text}}
              </p>
            </div>
            <div class="">
              <span>{{item.username}}</span>
              <img :src="item.avatar" alt="">
            </div>
            <!-- <img :src="" alt=""> -->
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script>
import IScroll from '../../../static/iscroll-probe.js';
export default {
  data(){
    return{
      rateFilter:'all',
    }
  },
  props:{
    food:{
      type:Object,
      require:true
    }
  },
  methods:{
    back(){
      this.$emit('back');
    },
    addCart(){
      if(this.food.count){
        this.food.count++
      }else{
        this.$set(this.food,'count',1);
      }
    }

  },
  computed:{
    all(){
      if(this.food.ratings){
        return this.food.ratings.length;
      }else{
        return 0;
      }
    },
    reco(){
      if(this.food.ratings){
        return this.food.ratings.filter(val=>val.rateType==0).length;
      }else{
        return 0;
      }

    },
    bore(){

      if(this.food.ratings){
        return this.food.ratings.filter(val=>val.rateType==1).length;
      }else{
        return 0;
      }
    },
    rateType(){
      switch(this.rateFilter){
        case 'all':
          return this.food.ratings;
        case 'reco':
          return this.food.ratings.filter(val=>val.rateType==0);
        case 'bore':
          return this.food.ratings.filter(val=>val.rateType==1);
        case 'content':
          return this.food.ratings.filter(val=>val.text!='');
        default:
          return ;
      }
    }
  },
	filters:{
		getTime(time){
			let date = new Date(time);
			let y = date.getFullYear();
			let m = date.getMonth();
      let d = date.getDate();
      let h = date.getHours();
      let m1 = date.getMinutes();
			return `${y}\-${m+1}\-${d} ${h}\:${m1}`;
		}
	},
  mounted(){
    this.$nextTick(()=>{
      new IScroll('#food',{probeType:2,tap:true,click:true});
    })
  },
  updated(){
    new IScroll('#food',{probeType:2,tap:true,click:true});
  }
}
</script>
1
<style lang="less" scoped>
@import '../../assets/css/public.less';
.food{
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color:#f3f5f7;
  img{
    width:100%;
    vertical-align:top;
  }
  .food-info{
    background-color:#fff;
    .padding(36,16,36,36);
    .margin(0,0,32,0);
    border-bottom:1px solid rgba(7,17,27,.1);
    position:relative;
    h3{
      .fs(28);
      font-weight:700;
      color:rgb(7,17,27);
      .padding(0,0,16,0);
    }
    .sale{
      .fs(20);
      color:rgb(147,153,159);
      i{
        .padding(0,0,0,24);
      }
    }
    .price{
      strong{
        .fs(28);
        color:rgb(240,20,20);
        span{
          .fs(20);
        }
      }
      del{
        .fs(20);
        font-weight:700;
        color:rgb(147,153,159);

        span{
          font-weight:normal;
        }
      }
    }
    .add{
      .w(148);
      .h(48);
      background-color:rgb(0,160,240);
      .fs(20);
      .lht(48);
      text-align:center;
      .border-radius(24);
      position:absolute;
      .right(16);
      .bottom(36);
      color:#fff;
    }
  }
  .bulletin{
    background-color:#fff;
    .padding(36,16,36,36);
    .margin(0,0,32,0);
    border-top:1px solid rgba(7,17,27,.1);
    border-bottom:1px solid rgba(7,17,27,.1);
    h3{
      .fs(28);
      font-weight:700;
      color:rgb(7,17,27);
      .padding(0,0,16,0);
    }
    p{
      .fs(24);
      font-weight:200;
      color:rgb(77,85,93);
      line-height:2em;
      .padding(0,0,0,16);
    }
  }
  .comments{
    background-color:#fff;
    .padding(36,0,0,0);
    .margin(0,0,32,0);
    border-top:1px solid rgba(7,17,27,.1);
    li{
      display:flex;
      justify-content:space-between;
      .margin(0,36,0,36);
      .padding(32,0,32,0);
      border-bottom:1px solid rgba(7,17,27,.1);
      .time{
        .fs(20);
        color:rgb(147,153,159);
        .padding(0,0,12,0);
      }
      .com{
        .fs(24);
        color:rgb(7,17,27);
        i{
          .fs(24);
          &.icon-damuzhi{
            color:rgb(0,160,220);
          }
          &.icon-down{
            color:rgb(147,153,159);
          }
        }
      }
      img{
        .w(24);
        .h(24);
        border-radius:50%;
        vertical-align:middle;
      }
      span{
        .fs(20);
        color:rgb(147,153,159);
        vertical-align:middle;
      }
    }
    h3{
      .fs(28);
      font-weight:700;
      color:rgb(7,17,27);
      .padding(0,0,16,36);
    }
    .filter{
      .fs(24);
      .padding(24,0,36,0);
      .margin(0,36,0,36);
      display:flex;
      border-bottom:1px solid rgba(7,17,27,.1);
      p{
        .padding(16,24,16,24);
        .lht(32);
        .margin(0,16,0,0);
        .border-radius(2);
        &.all{
          background-color:rgb(0,160,220);
          color:#fff;
        }
        &.reco{
          background-color:rgba(0,160,220,.2);
          color:rgb(77,85,93);
        }
        &.bore{
          background-color:rgba(77,85,93,.2);
          color:rgb(77,85,93);
        }
        span{
          .fs(16);
        }
      }
    }
    .content{
      .padding(24,0,24,36);
      .fs(24);
      color:rgb(147,153,159);
      .lht(48);
      border-bottom:1px solid rgba(7,17,27,.1);
      i{
        .fs(48);
        .padding(0,8,0,0);
        vertical-align:middle;
        &.blue{color:rgb(0,160,220)}
      }
    }
  }




  .back{
    position:absolute;
    .top(40);
    .left(40);
    color:#fff;
    .h(40);
    .w(40);

  }
}

</style>
