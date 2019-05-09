<template>
 <div class="returnnext-div">
    <button class="blueBtn getsfzBtn" v-show="url.getsfzdisplay == null ? 'true' : url.getsfzdisplay" @click="getsfz" >读取身份证</button>
    <button class="blueBtn" :class="active" @click="returnhome">返回</button>
    <router-link :to=url.addspouse v-show="url.spousedisplay">
        <button class="blueBtn">添加配偶</button>
    </router-link>
    <router-link :to=url.addchildren v-show="url.childrendisplay">
        <button class="blueBtn">添加子女</button>
    </router-link>
    <button class="blueBtn" v-show="url.nextdisplay" @click="nextstep">下一步</button>
    <!-- <button class="blueBtn" v-show="url.submitdisplay" @click="submit">提交</button> -->
    <button class="blueBtn" v-show="url.submitdisplay" @click="submittoprint">提交</button>
    
 </div>
</template>

<script>
 import axios from 'axios'
 let Base64 = require('js-base64').Base64
 export default {
   data () {
     return {
         number:'666',
     }
   },
   props:{
        url:Object,
        dataList:Array,
        active:String
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
            var list = JSON.parse(localStorage.getItem("PrintList"));
            var listB = JSON.parse(localStorage.getItem("PrintList"));
            var selfIndexof = list.length-1;
            var familyMembers = listB.slice(0,selfIndexof);;//去掉最后一个
            for (let v of familyMembers){
                if (v.appellation == "配偶"){
                    v.appellation = 1;
                }
                if (v.appellation == "子女"){
                    v.appellation = 2;
                }
            }
            console.log(familyMembers);
            let postData = {
                "applyUser": list[selfIndexof].name,
                "applyUserCardNO": list[selfIndexof].certNo,
                "applyCardType": "身份证",
                "isCardReader": true,
                "familyMembers": familyMembers
            }
            console.log(postData)
            this.showloading = true;
            axios.post('/api/FamilySearch',postData)
            .then(function (res) {
            　　console.log(res);
                let pdfpath = res.data.body
                pdfpath = "/" + pdfpath
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
            alert(pdfpath)
            this.$router.push({
                path: '/pdf',
                query: {
                url: pdfpath
                }
            })
        },
        //读取身份证，传递事件给父组件
        getsfz () {
          this.$emit('actualgetsfz')
        }

    }
 }
</script>

<style lang="scss" scoped>
.returnnext-div{
    text-align: center;
    height: 0.52rem;
    margin-top:0.3rem;
    .blueBtn{
        // width:1.94rem;
        height: 0.52rem;
        border-radius: 0.1rem; 
        vertical-align: top;
        border:none;
        color:#fff;
        font-size:0.28rem;
        background: #29aae3;
    }
    .active{
        
    }
}
.van-button--danger{
    background-color:#1989fa;
    border:#1989fa;
}
</style>
