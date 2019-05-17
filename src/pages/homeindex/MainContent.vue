<template>
 <div>
   <loading v-show="showloading"></loading>
   <div class="btnDiv">
      <button class="printBtn" @click="tohousepropety">自助打印</button>
   </div>

 </div>
</template>

<script>
import loading from '@/common/loading/loading'
// import * as test from '@/api/index'
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
        //axios.post('/api/User/Login',{
        　　params: {
        　　　　...postData,
        　　}
        })
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


        //本地不走服务
        // const self = this;
        // self.showloading = false;
        // self.$router.push({
        //   path: '/Business/housepropety',
        //   // query: {
        //   //   id: id
        //   // }
        // })
      },
      f:function(){
        console.log(this)
        test.IDCardResultToJs(this);
      },
      ff:() => {
        console.log(this)
        test.IDCardResultToJs(111);
      }
   }
   
 }
</script>

<style lang="scss" scoped>
  .btnDiv{
    margin-top:3.04rem;
    text-align: center;
    // height:4rem;
    // padding:0.6rem;
    // padding-top:2.4rem;
      .printBtn{
        width:4.2rem;
        height: 1rem;
        background: #29aae3;
        border-radius: 0.4rem; 
        border:none;
        color:#fff;
        font-size:0.52rem;
      }
    }
</style>
