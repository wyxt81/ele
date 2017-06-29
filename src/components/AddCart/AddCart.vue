<template>
  <section class="addcart">
    <transition name="rslide">
      <i class="iconfont icon-jian" v-if="food.count" @click.stop="subCount"></i>
    </transition>
    <transition name="fade">
      <p v-if="food.count">{{food.count}}</p>
    </transition>

    <span class="iconfont icon-jia" @click.stop="addCount"></span>
  </section>
</template>

<script>
export default {
  props:{
    food:{
      type:Object,
      require:true
    },
  },
  methods:{
    addCount(event){
      if(this.food.count){
        this.food.count++;
      }else{
        this.$set(this.food,'count',1);
      }
      this.$emit('drop',event.target)
    },
    subCount(){
      this.food.count--;
      if(this.food.count<=0){
        this.food.count = 0;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/public.less';

.addcart{
  .w(144);
  .h(48);
  color:rgb(0,160,220);
  position:relative;
  .icon-jian{
    position:absolute;
    .left(0);
    .bottom(2);
    .fs(48);
  }
  .icon-jia{
    position:absolute;
    .right(0);
    .bottom(0);
    .fs(48);
  }
  p{
    position:absolute;
    text-align:center;
    .w(48);
    .bottom(0);
    .left(48);
    .fs(24);
    .h(48);
    .lht(48);
    color:rgb(147,153,159);
  }
}
@keyframes slidein{
  0%{.transform(96,360)}
  100%{.transform(0,0)}
}
@keyframes slideout{
  0%{.transform(0,0)}
  100%{.transform(96,360)}
}
.rslide-enter-active{
  animation:slidein .5s;
}
.rslide-leave-active{
  animation:slideout .5s;
}
@keyframes fadein{
  0%{opacity:0}
  100%{opacity:1}
}
@keyframes fadeout{
  0%{opacity:1}
  100%{opacity:0}
}
.fade-enter-active{
  animation:fadein .5s;
}
.fade-leave-active{
  animation:fadeout .5s;
}
</style>
