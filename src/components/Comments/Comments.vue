<template>
  <div class="comment">
    <div>
      <div class="syn">
        <div class="score">
          <h3>{{seller.score}}</h3>
          <p class="syn-score">综合评分</p>
          <p>高于周边商家{{seller.rankRate}}</p>
        </div>
        <div class="bdr">

        </div>
        <div class="syn-star">
          <ul>
            <li class="star">
              <p>服务态度</p>
              <div class="startop">
                <ele-star :score="serviceScore"></ele-star>
              </div>
              <span>{{serviceScore}}</span>
            </li>
            <li class="star">
              <p>商品评分</p>
              <div class="startop">
                <ele-star :score="foodScore"></ele-star>
              </div>
              <span>{{foodScore}}</span>
            </li>
            <li>
              <p>送达时间</p>
              <i>{{seller.deliveryTime}}分钟</i>
            </li>
          </ul>
        </div>
    </div>

      <div class="comments">

          <div class="com-title">
        <h3>商品评价</h3>
        <div class="filter">
          <p class="all" @click="rateFilter='all'">全部<span>{{ratings.length}}</span></p>
          <p class="reco" @click="rateFilter='reco'">推荐<span>{{reco}}</span></p>
          <p class="bore" @click="rateFilter='bore'">吐槽<span>{{bore}}</span></p>
        </div>
      </div>
          <p class="content" @click="content=!content">
            <i class="iconfont icon-gou" :class="{blue:content}"></i>
            只看有内容的评价
          </p>
          <ul>
            <li v-for="item in rateType">
              <div class="com-top">
                <img :src="item.avatar" alt="">
                <div class="midd">
                  <span>{{item.username}}</span>
                  <p><ele-star :score="item.score"></ele-star></p>
                </div>
                <p class="time">{{item.rateTime|getTime}}</p>
              </div>
              <div class="com-bottom">
                <p>{{item.text}}</p>
                <p class="com">
                  <i v-if="item.rateType==1" class="iconfont icon-down"></i>
                  <i v-else="item.rateType==0" class="iconfont icon-damuzhi"></i>
                  <strong v-for="reco in item.recommend">{{reco}}</strong>
                </p>
              </div>

              <!-- <img :src="" alt=""> -->
            </li>
          </ul>


      </div>

    </div>
  </div>
</template>

<script>
import ele from '../../../data.json';
import Star from '../Star/Star.vue';
import '../../assets/js/iscroll-probe';
export default {
  data(){
    return {
      ratings:[],
      serviceScore:0,
      foodScore:0,
      seller:{},
      rateFilter:'all',
      content:false
    }
  },
  components:{
    'ele-star':Star,
  },
  created(){
    this.ratings = ele.ratings;
    this.serviceScore = ele.seller.serviceScore;
    this.foodScore = ele.seller.foodScore;
    this.seller = ele.seller;

  },
  methods:{
  },
  computed:{
    reco(){
      return this.ratings.filter(val=>val.rateType==0).length;
    },
    bore(){
      console.info( this.ratings );
      return this.ratings.filter(val=>val.rateType==1).length;
    },
    rateType(){
      if(this.content){
        switch(this.rateFilter){
          case 'all':
            return this.ratings.filter(val=>val.text!='');
          case 'reco':
            return this.ratings.filter(val=>val.rateType==0&&val.text!='');
          case 'bore':
            return this.ratings.filter(val=>val.rateType==1&&val.text!='');
          default:
            return ;
        }
      }else{
        switch(this.rateFilter){
          case 'all':
            return this.ratings;
          case 'reco':
            return this.ratings.filter(val=>val.rateType==0);
          case 'bore':
            return this.ratings.filter(val=>val.rateType==1);
          default:
            return ;
        }
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
    new IScroll('.comment');
  },
  updated(){
    new IScroll('.comment');
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
  .comment{
    background-color:#f3f5f7;
    position:fixed;
    .top(349);
    width:100%;
    bottom:0;
    border-top:1px solid rgba(7,17,27,.1);
    overflow:hidden;
    .syn{
      .h(210);
      box-sizing:border-box;
      border-bottom:1px solid rgba(7,17,27,.1);
      background-color:#fff;
      .padding(36,48,36,0);
      display:flex;
      .margin(0,0,36,0);
      .score{
        .w(275);
        text-align:center;
        h3{
          .fs(48);
          color:rgb(255,153,0);
        }
        .syn-score{
          .fs(24);
          color:rgb(7,17,27);
          .padding(12,0,16,0);
        }
        p{
          .fs(20);
          color:rgb(147,153,159);
          .padding(0,0,12,0);
        }
      }
      .bdr{
        .h(140);
        width:1px;
        background-color:rgba(7,17,27,.1);
        .margin(0,48,0,0);
      }
      .syn-star{
        li{
          .fs(24);
          .lht(30);
          color:rgb(7,17,27);
          display:flex;
          .startop{
            vertical-align:middle;
          }
          p{
            .padding(0,24,0,0);
          }
          span{
            .padding(0,0,0,24);
          }
          i{
            color:rgb(147,153,159);
          }
          &.star{
            .padding(0,0,16,0);
            align-items:center;
          }
        }
      }
    }
    .comments{
      background-color:#fff;
      .padding(36,0,0,0);
      .margin(0,0,32,0);
      border-top:1px solid rgba(7,17,27,.1);
      li{
        .margin(0,36,0,36);
        .padding(32,0,32,0);
        border-bottom:1px solid rgba(7,17,27,.1);
        .com-top{
          display:flex;
          justify-content:space-between;
          align-items:center;
          .padding(0,0,12,0);
          .h(56);
          .midd{
            flex:auto;
            display:flex;
            flex-direction:column;
            .padding(0,0,0,24);
            p{
              .w(194);
            }
          }
          .time{
            .fs(20);
            color:rgb(147,153,159);
            .padding(0,0,12,0);
          }
        }
        .com-bottom{
          p{
            .fs(24);
            color:rgb(7,17,27);
            .lht(36);
            .padding(0,0,0,90);
            strong{
              .fs(18);
              .lht(32);
              color:rgb(147,153,159);
              text-overflow:ellipsis;
              overflow:hidden;
              white-space:nowrap;
              box-sizing:border-box;
              .padding(0,12,0,12);
              .margin(0,0,0,16);
              border:1px solid rgba(7,17,27,.1);
            }
          }
        }


        .com{
          .fs(24);
          color:rgb(7,17,27);
          text-overflow:ellipsis;
          overflow:hidden;
          white-space:nowrap;
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
          .w(56);
          .h(56);
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
  }

</style>
