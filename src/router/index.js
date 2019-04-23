import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import Vant from 'vant';
import 'vant/lib/index.css';


import home from '@/pages/Home/Home'
import main from '@/pages/HomeIndex/Main'
import housepropety from '@/pages/Business/HousePropety'
import naturealpropety from '@/pages/Business/NaturealPropety'
import registerpropety from '@/pages/Business/RegisterPropety'
import addspouse from '@/pages/Business/AddSpouse'
import addchildren from '@/pages/Business/AddChildren'
import enterinfo from '@/pages/Business/EnterInfo'



Vue.use(Router)
Vue.use(MintUI)
Vue.use(Vant);


export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      component: home,
      children:[
        {
          path: '',
          name: 'main',
          component: main
        },
        {
          path: '/Business/housepropety',
          name: 'housepropety',
          component: housepropety
        },
        {
          path: '/Business/naturealpropety',
          name: 'naturealpropety',
          component: naturealpropety
        },
        {
          path: '/Business/registerpropety',
          name: 'registerpropety',
          component: registerpropety
        },
        {
          //添加配偶
          path: '/Business/addspouse',
          name: 'addspouse',
          component: addspouse
        },
        {
          path: '/Business/addchildren',
          name: 'addchildren',
          component: addchildren
        },
        //录入信息
        {
          path: '/Business/enterinfo',
          name: 'enterinfo',
          component: enterinfo
        },
        // {
        //   path: '/home',
        //   name: 'home',
        //   component: Home
        // },
        // {
        //   path: '/recent',
        //   name: 'recent',
        //   component: Recent
        // },
        // {
        //   path: '/guang',
        //   name: 'guang',
        //   component: Guang
        // },
        // {
        //   path: '/order',
        //   name: 'order',
        //   component: Order
        // },
        // {
        //   path: '/me',
        //   name: 'me',
        //   component: Me
        // },
      ]
    },
    {
      path: '/pdf',
      name: 'PDF',
      component: () => import('@/common/pdf/Pdf.vue')
    },
    {
      path: '/test',
      component: () => import('@/pages/business/Test.vue')
    }
    

  ]
})
