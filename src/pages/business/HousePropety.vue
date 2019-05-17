<template>
 <div>
    <!-- <headertop :headerText="actualText"></headertop> -->
    <swipe></swipe>
    <div class="form">
      <div class="divTxt">
        <span class="spanTxt">姓名</span>
        <input class="inputTxt inputName" name="name" placeholder="请输入姓名" v-model="housePropety.name">
      </div>
      <div class="divTxt">
        <span class="spanTxt">性别</span>
        <input class="inputTxt" placeholder="请输入性别" name="sex" v-model="housePropety.sex">
      </div>
      <div class="divTxt">
        <span class="spanTxt">出生</span>
        <input class="inputTxt" placeholder="请输入出生年月" name="born" v-model="housePropety.born">
      </div>
      <div class="divTxt">
        <span class="spanTxt">民族</span>
        <input class="inputTxt" placeholder="请输入民族" name="nation" v-model="housePropety.nation">
      </div>
      <div class="divTxt">
        <span class="spanTxt">地址</span>
        <input class="inputTxt" placeholder="请输入地址" name="address" v-model="housePropety.address">
      </div>
      <div class="divTxt">
        <span class="spanTxt">身份证号</span>
        <input class="inputTxt" placeholder="请输入身份证号" name="idCardNo" v-model="housePropety.idCardNo">
      </div>
      <div class="divTxt">
        <span class="spanTxt">签发机关</span>
        <input class="inputTxt" placeholder="请输入签发机关" name="grantDept" v-model="housePropety.grantDept">
      </div>
    </div>
    <returnnext :url="urlList" @actualgetsfz="getsfz" @actualnextstep="nextstep"></returnnext>
    <bottom></bottom>
 </div>
</template>

<script>
// import $ from 'jquery'
// import {aa} from "@/api/base.js"
import * as common from "@/api/base.js"
//import headertop from '@/common/header/head'
import swipe from '@/common/swipe/swipe'
import returnnext from '@/common/returnnext/returnnext'
import bottom from '@/common/footer/footer'
import axios from 'axios'


 export default {
   data () {
     return {
      housePropety:{},
      urlList:{
        homeurl:'/',
        nexturl:'/Business/enterinfo',
        addspouse:'/Business/addspouse',
        addchildren:'/Business/addchildren',
        spousedisplay:false,
        childrendisplay:false,
        nextdisplay:true,
        getsfzdisplay:true
      },
      //actualText:'请刷取自助终端的本人身份证',

     }
   },
   components: {
    //headertop,
    swipe,
    returnnext,
    bottom
   },
   mounted () {
    //  aa();
    // $(".getsfzBtn").hide();
    },
   methods:{
      //子组件传递过来的事件
      getsfz () {
        //扫描成功get数据，先把本人data保存到浏览器localstage
        var jsonstr = '{"name": "李毅辉","sex": "男","nation": "汉族","born": "19920926","address": "福建省厦门市同安区祥湖里20号202室","idCardNo": "350212199209264515", "grantDept": "厦门市公安分局同安分局","relation":"户主"}'
        var obj = JSON.parse(jsonstr)//自助机获取解析
        this.housePropety = obj
        var ListObj = JSON.parse(localStorage.getItem("PrintList") || '[]')//获取浏览器缓存转对象
        ListObj.unshift(obj);//加入数组
        alert(JSON.stringify(ListObj))
        common.loadData(ListObj[0]);//模拟自助机绑定

        localStorage.setItem('PrintList',JSON.stringify(ListObj))
        common.loadData(jsonstr)
        //读取到才隐藏
        if (Object.keys(this.housePropety).length != 0){
          // this.urlList.getsfzdisplay = false
          alert("隐藏读取按钮")
          //this.urlList.getsfzdisplay = false;
          $(".getsfzBtn").hide();
        }
      },
      //点击自助机读取身份证
      zzjgetsfz () {
        //打开读取身份证端口
        alert("准备打开读取端口");
        window.external.UniteMethod("ReadIDCardByJs","");
            setTimeout(function(){
                var str = localStorage.getItem("PrintList") || '[]';
                var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
                alert("读取浏览器缓存");
                alert(JSON.stringify(list[0]));
                this.housePropety = list[0]
                common.loadData(list[0]);
                //读取到才隐藏
                if (Object.keys(this.housePropety).length != 0){
                  alert("隐藏读取按钮")
                  var jsonstr = JSON.stringify(this.housePropety)
                  alert(jsonstr);
                  //this.urlList.getsfzdisplay = false;
                  $(".getsfzBtn").hide();
                }
            },2000);
      },

      //子组件传过来下一步
      nextstep () {
        if (Object.keys(this.housePropety).length == 0){
          var jsonstr = JSON.stringify(this.housePropety)
          alert(jsonstr);
          alert("不能为空");
          return;
        }else{
          this.$router.push({
          path: this.urlList.nexturl,
          query: {
            id: 9999
          }
          })
        }
      }
    }
 }


</script>

<style lang="scss" scoped>
  .form{
    padding:0.1rem 0.6rem 0 0.6rem;
    .divTxt{
      // line-height: 0.54rem;
      height: 0.50rem;
      margin-top:0.2rem;
    }
    .spanTxt{
      color:#707070;
      font-size:0.28rem;
      vertical-align: top;
      padding-top:0.2rem;
      display: inline-block;
      width:1.3rem;

    }
    .inputTxt{
        // padding: 0.05rem 0;
        width: 72%;
        height: 0.42rem;
        line-height: 0.42rem;
        font-size: 0.34rem;
        vertical-align: top;
        text-indent: 0.2rem;
        border-radius: 0.1rem;
        border:1px solid #eee;
        font-size:0.28rem;
        color:#bbbaba;
    }
    input::-webkit-input-placeholder {
    font-size:0.28rem;
    color:#bbbaba;
    line-height: 0.48rem;
    }
  }
  
</style>
