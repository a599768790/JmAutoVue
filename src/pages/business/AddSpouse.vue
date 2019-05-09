<template>
 <div>
    <!-- <headertop :headerText="actualText"></headertop> -->
    <swipe></swipe>
    <div class="form">
      <div class="divTxt">
        <span class="spanTxt">姓名</span>
        <input class="inputTxt" placeholder="请输入姓名" name="name" v-model="spouse.name">
      </div>
      <div class="divTxt">
        <span class="spanTxt">性别</span>
        <input class="inputTxt" placeholder="请输入性别" name="sex" v-model="spouse.sex">
      </div>
      <div class="divTxt">
        <span class="spanTxt">出生</span>
        <input class="inputTxt" placeholder="请输入出生年月" name="born" v-model="spouse.born">
      </div>
      <div class="divTxt">
        <span class="spanTxt">民族</span>
        <input class="inputTxt" placeholder="请输入民族" name="nation" v-model="spouse.nation">
      </div>
      <div class="divTxt">
        <span class="spanTxt">地址</span>
        <input class="inputTxt" placeholder="请输入地址" name="address" v-model="spouse.address">
      </div>
      <div class="divTxt">
        <span class="spanTxt">身份证号</span>
        <input class="inputTxt" placeholder="请输入身份证号" name="idCardNo" v-model="spouse.idCardNo">
      </div>
      <div class="divTxt">
        <span class="spanTxt">签发机关</span>
        <input class="inputTxt" placeholder="请输入签发机关" name="grantDept" v-model="spouse.grantDept">
      </div>
    </div>
    <returnnext :url="urlList" @actualgetsfz="zzjgetsfz" @actualnextstep='nextstep'></returnnext>
    <bottom></bottom>
 </div>
</template>

<script>
import * as common from "@/api/base.js"
 //import headertop from '@/common/header/head'
 import swipe from '@/common/swipe/swipe'
 import returnnext from '@/common/returnnext/returnnext'
 import bottom from '@/common/footer/footer'
 import axios from 'axios'
 export default {
   data () {
     return {
      spouse:{},
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
      //actualText:"请刷取配偶身份证"
     }
   },
   components: {
    //headertop,
    swipe,
    returnnext,
    bottom
   },
   mounted () {

    },
   methods:{
          //子组件传过来的
          getsfz () {
            var jsonstr = '{"name": "郑瑶珊","sex": "女","nation": "汉族","born": "19921126","address": "福建省福州市罗源县青禾家园6座404","idCardNo": "350123199211262424", "grantDept": "福州市公安分局罗源分局","relation":"配偶"}'
            var obj = JSON.parse(jsonstr)
            this.spouse = obj
            var ListObj = JSON.parse(localStorage.getItem("PrintList") || '[]')//获取浏览器缓存转对象
            ListObj.unshift(obj);//加入数组
            alert(JSON.stringify(ListObj))
            common.loadData(ListObj[0]);//模拟自助机绑定
            
            localStorage.setItem('PrintList',JSON.stringify(ListObj))
          },
          //子组件传来的事件
          nextstep () {
            if (Object.keys(this.spouse).length == 0){
                alert("配偶不能为空");
                return;
              }else{
                this.$router.push({
                path: this.urlList.nexturl,
                // query: {
                //   id: id
                // }
                })
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
                  alert("读取缓存");
                  alert(JSON.stringify(list[0]));
                  this.spouse = list[0]
                  common.loadData(list[0]);//绑定表单
                  //读取到才隐藏
                  if (Object.keys(this.spouse).length != 0){
                    alert("隐藏读取按钮")
                    //this.urlList.getsfzdisplay = false;
                    $(".getsfzBtn").hide();
                  }
              },2000);
          },
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
      padding-top:0.1rem;
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
