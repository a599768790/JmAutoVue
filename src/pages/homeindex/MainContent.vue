<template>
 <div>
   <loading v-show="showloading"></loading>
   <div class="btnDiv">
      <mt-button size="large" @click="tohousepropety">自助打印</mt-button>

      <!-- <mt-button size="large" @click="test">Test</mt-button> -->
      <!-- <button @click="f">测试1</button>
      <button @click="ff">测试2</button>
      <button @click="fff">测试3</button>
      <button @click="ffff">测试4</button> -->
    <!-- <router-link to="/Business/naturealpropety">
      <mt-button size="large">不动产自然状况查询</mt-button>
    </router-link>
    <router-link to="/Business/registerpropety">
      <mt-button size="large">不动产登记信息查询</mt-button>
    </router-link> -->

   </div>

 </div>
</template>

<script>
import loading from '@/common/loading/loading'
// import {getToke} from '@/api/base'
import * as test from '@/api/index'
import axios from 'axios'
 export default {
   data () {
     return {
       showloading:false
     }
   },
   components: {
     loading
   },
   methods:{
      tohousepropety:function(){
        const self = this;
        let postData = {
        　　companyCode:'tur',
        　　userName:'123456789123456789',
        　　password:'123456'
        }
        this.showloading = true;
        axios.post('/api/User/Login',{
        　　params: {
        　　　　...postData,
        　　}
        })
        // axios.post('http://188.48.2.6:2666/api/User/Login',{
        // 　　params: {
        // 　　　　...postData,
        // 　　}
        // })
        .then(function (response) {
            
        　　console.log(1)
        　　console.log(response);
            var token  = response.data.body.token
            localStorage.setItem('token',JSON.stringify(token));

            //成功后跳转
            self.showloading = false;
            self.$router.push({
              path: '/Business/housepropety',
              // query: {
              //   id: id
              // }
            })
            axios.defaults.headers.common['Authorization'] = JSON.parse(window.localStorage['token'])
            axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
            //实例化Vue
            new Vue({
              el: '#app',
              router,
              components: {
                App
              },
              template: '<App/>'
            })
            
        })
        .catch(function (error) {
        　　console.log(error);
        });



            // //不走服务
            // //self.showloading = false;
            // this.$router.push({
            //   path: '/Business/housepropety',
            //   // query: {
            //   //   id: id
            //   // }
            // })

      },
      test:function(){
        //不走服务
        //self.showloading = false;
        this.$router.push({
          path: '/Business/naturealpropety',
          // query: {
          //   id: id
          // }
        })
      },
      
      f:function(){
        console.log(this)
        test.IDCardResultToJs(this);
      },
      ff:() => {
        console.log(this)
        test.IDCardResultToJs(111);
      },
      fff () {
        aaa()
      },
   }
   
 }
</script>

<style lang="stylus" scoped>
  .btnDiv
    height 4rem
    padding 0.6rem
    padding-top 2.4rem

    a
      text-decoration: none;
      
    .mint-button
      margin-top 0.5rem
      font-weight bold
</style>
