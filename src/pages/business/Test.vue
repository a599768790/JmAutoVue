<template>
 <div>
     <input type='button' value="测试" @click='tohousepropety'>
 </div>
</template>

<script>
 import axios from 'axios'
 export default {
   data () {
     return {

     }
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
        // axios.post('/api/User/Login',{
        // 　　params: {
        // 　　　　...postData,
        // 　　}
        // })
        axios.post('http://188.48.2.6:2666/api/User/Login',{
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


        // this.$ajax.post('http://188.48.2.6:2666/api/User/Login',{})
        // .then(function (res) {
        //   console.log(res.data)
        // })
        // .catch(function (error) {
        //   console.log(error)
        // })


            // //不走服务
            // //self.showloading = false;
            // this.$router.push({
            //   path: '/Business/housepropety',
            //   // query: {
            //   //   id: id
            //   // }
            // })

      }
   }
 }
</script>

<style>

 
</style>
