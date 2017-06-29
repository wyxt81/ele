<template>
  <div class="star">
    <ul class="off">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <ul class="half">
      <li v-for="i in off"></li>
    </ul>
    <ul class="on">
      <li v-for="i in on"></li>
    </ul>
  </div>

</template>

<script>
export default {
  props:{
    score:{
      type:Number,
      require:true
    }
  },
  computed:{
    on(){
      return Math.floor(this.score);
    },
    off(){
      return Math.ceil(this.score);
    }
  }

}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';
  .star{
    .w(197);
    .h(30);
    margin:0 auto;
    position:relative;
    .lht(30);
    ul{
      position:absolute;
      top:0;
      left:0;
      .h(30);
    }

    li{
      .w(30);
      height:100%;
      float:left;
      .margin(0,11,0,0);
      &:last-child{
        margin:0;
      }

    }
  }
  .off li{
    background-image:url(./star36_off@2x.png);
    background-size:100% 100%;
  }
  .on li{
    background-image:url(./star36_on@2x.png);
    background-size:100% 100%;
  }
  .half li{
    background-image:url(./star36_half@2x.png);
    background-size:100% 100%;
  }
</style>
