<template>
  <div id="app">
    <ele-header :seller="seller"></ele-header>
    <ul class="nav">
      <li><router-link to="/">商品</router-link></li>
      <li><router-link to="/comments">评价</router-link></li>
      <li><router-link to="/seller">商家</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header/Header'

import './assets/css/font.css'

let Goods = require('./components/Goods/Goods')

import Comments from './components/Comments/Comments'

// import Data from '../data.json'
// console.info( Data );
import './assets/css/reset.css'
//阻止默认事件
document.documentElement.addEventListener('touchmove',(e)=>{
  e.preventDefault();
})
export default {
  name: 'app',
  data(){
    return {
      seller:{},
    }
  },
  created(){
    this.seller = require('../data.json').seller;
  },
  components:{
    'ele-header':Header,
    'ele-goods':Goods,
    'ele-comments':Comments,
  }
}
</script>

<style lang="less">
@import './assets/css/public.less';
.nav{
  .h(80);
  background-color:#fff;
  .fs(28);
  display:flex;
  justify-conten:center;
  align-items:space-around;
  li{
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    a{
      color:rgb(77,85,93);
      text-decoration:none;
    }
    .router-link-exact-active{
      color:rgb(240,20,20);
    }
  }
}
</style>
