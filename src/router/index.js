import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Goods from '@/components/Goods/Goods'
import Comments from '@/components/Comments/Comments'
import Seller from '@/components/Seller/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Goods
    },
    {
      path:'/comments',
      name:'Comments',
      component:Comments
    },
    {
      path:'/seller',
      name:'Seller',
      component:Seller
    }
  ]
})
