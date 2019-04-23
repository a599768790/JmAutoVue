<template>
 <div class="returnnext-div">

    <!-- <router-link :to=url.homeurl>
    </router-link> -->
    <!-- <button class="printBtn" @click="tohousepropety">自助打印</button>
    <button class="printBtn" @click="tohousepropety">自助打印</button>
    <button class="printBtn" @click="tohousepropety">自助打印</button>
    <button class="printBtn" @click="tohousepropety">自助打印</button>
    <button class="printBtn" @click="tohousepropety">自助打印</button>
    <button class="printBtn" @click="tohousepropety">自助打印</button>
    <button class="printBtn" @click="tohousepropety">自助打印</button> -->

    <van-button type="danger" v-show="url.getsfzdisplay == null ? 'true' : url.getsfzdisplay" size="small" @click="getsfz">读取身份证</van-button>
    <van-button round type="danger" size="small" @click="returnhome">返回</van-button>
    <router-link :to=url.addspouse v-show="url.spousedisplay">
        <van-button round type="danger" size="small">添加配偶</van-button>
    </router-link>
    <router-link :to=url.addchildren v-show="url.childrendisplay">
        <van-button round type="danger" size="small">添加子女</van-button>
    </router-link>
    <van-button round type="danger" size="small" v-show="url.nextdisplay" @click="nextstep">下一步</van-button>
    <van-button round type="danger" size="small" v-show="url.submitdisplay" @click="submit">提交</van-button>


    <!-- <van-button round type="danger" size="small" v-show="url.submitdisplay" @click="submittoprint">提交</van-button> -->
 </div>
</template>

<script>
 import axios from 'axios'
 let Base64 = require('js-base64').Base64
 export default {
   data () {
     return {
         number:'666'
     }
   },
   props:{
        url:Object,
        dataList:Array
    },
   components: {

   },
    mounted () {


    },
   methods: {
       //回到首页清除缓存
       returnhome:function(){
           localStorage.clear();
           this.$router.push({
              path: this.url.homeurl,
              // query: {
              //   id: id
              // }
            })
       },
       //下一步
       nextstep () {
           this.$emit('actualnextstep')
           
            
       },
        //提交打印pdf
        submit:function(){
            const self = this;
            // let postData = localStorage.getItem("PrintList")
            //console.log(postData)
            //let postData = [{"id":1550651856855,"name":"张三","sex":"男","birthDate":"1992-01-01","nation":"汉族","address":"福建省思明区湖滨中路518号","hkidCardNumber":"350201199201011234","signorganization":"厦门市公安局思明分局","effectivedate":"2000-01-01至2020-01-01","relation":"户主","isHouser":true}]
            let postData = {
                "applyUser": "张三",
                "applyUserCardNO": "350201199201011234",
                "applyCardType": "居民身份证",
                "isCardReader": true,
                "familyMembers": [
                ]
            }
            this.showloading = true;
            axios.post('/pdf/FamilySearch',postData)
            .then(function (res) {
            　　console.log(res);
                let pdfpath = res.data.body
                pdfpath = "/printpdf/" + pdfpath
                //"/printpdf\CacheFile\2019\2\21\20190201000060_ivkicd_2019022117215944975.pdf"
                console.log(pdfpath)
                //成功后跳转
                self.showloading = false;
                // self.$router.push({ query: { 
                //     url: Base64.encode(pdfpath)
                //     } 
                // })
                self.$router.push({
                path: '/pdf',
                query: {
                  url: pdfpath
                }
                })
            })
            .catch(function (error) {
            　　console.log(error);
            });
        },

        //测试提交打印pdf
        submittoprint:function(){
            let pdfpath = 'test.pdf'
            this.$router.push({
                path: '/pdf',
                query: {
                url: pdfpath
                }
            })
            // const self = this;
            // let postData = localStorage.getItem("PrintList")
            // //console.log(postData)
            // //let postData = [{"id":1550651856855,"name":"张三","sex":"男","birthDate":"1992-01-01","nation":"汉族","address":"福建省思明区湖滨中路518号","hkidCardNumber":"350201199201011234","signorganization":"厦门市公安局思明分局","effectivedate":"2000-01-01至2020-01-01","relation":"户主","isHouser":true}]
            // this.showloading = true;
            // axios.post('/api/Search',postData)
            // .then(function (res) {
            // 　　console.log(res);
            //     let pdfpath = res.data.filePath
            //     pdfpath = "/pdf" + pdfpath
            //     console.log(pdfpath)
            //     //成功后跳转
            //     self.showloading = false;
            //     // self.$router.push({ query: { 
            //     //     url: Base64.encode(pdfpath)
            //     //     } 
            //     // })

            //     self.$router.push({
            //     path: '/pdf',
            //     query: {
            //       url: Base64.encode(pdfpath)
            //     }
            //     })
            // })
            // .catch(function (error) {
            // 　　console.log(error);
            // });
        },
        //读取身份证，传递事件给父组件
        getsfz () {
          this.$emit('actualgetsfz')
        }

    }
 }
</script>

<style scoped>
.returnnext-div{
    text-align: center;
}
.van-button--danger{
    background-color:#1989fa;
    border:#1989fa;
}
</style>
