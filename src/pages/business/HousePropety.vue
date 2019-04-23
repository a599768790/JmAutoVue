<template>
 <div>
    <!-- <mt-header fixed title="请刷取自助终端的本人身份证" class="header"></mt-header> -->
    <headertop :headerText="actualText"></headertop>
    <swipe></swipe>
    <div class="form">
      <div class="divTxt">
        <span class="spanTxt">姓名</span>
        <input class="inputTxt" placeholder="请输入姓名" v-model="housePropety.name">
      </div>
      <!-- <div class="divTxt">
        <span class="spanTxt">性别</span>
        <input class="inputTxt" placeholder="请输入性别" v-model="housePropety.sex">
      </div>
      <div class="divTxt">
        <span class="spanTxt">出生</span>
        <input class="inputTxt" placeholder="请输入出生年月" v-model="housePropety.birthDate">
      </div>
      <div class="divTxt">
        <span class="spanTxt">民族</span>
        <input class="inputTxt" placeholder="请输入民族" v-model="housePropety.nation">
      </div>
      <div class="divTxt">
        <span class="spanTxt">地址</span>
        <input class="inputTxt" placeholder="请输入地址" v-model="housePropety.address">
      </div>
      <div class="divTxt">
        <span class="spanTxt">身份证号</span>
        <input class="inputTxt" placeholder="请输入身份证号" v-model="housePropety.hkidCardNumber">
      </div>
      <div class="divTxt">
        <span class="spanTxt">签发机关</span>
        <input class="inputTxt" placeholder="请输入签发机关" v-model="housePropety.effectivedate">
      </div> -->

      <!-- <mt-field label="姓名" placeholder="请输入姓名" v-model="housePropety.name"></mt-field>
      <mt-field label="性别" placeholder="请输入性别" v-model="housePropety.sex"></mt-field>
      <mt-field label="出生" placeholder="请输入出生年月" v-model="housePropety.birthDate"></mt-field>
      <mt-field label="民族" placeholder="请输入民族" v-model="housePropety.nation"></mt-field>
      <mt-field class="address" label="地址" placeholder="请输入地址" v-model="housePropety.address"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" v-model="housePropety.hkidCardNumber"></mt-field>
      <mt-field label="签发机关" placeholder="请输入签发机关" v-model="housePropety.grantDept"></mt-field> -->
      <!-- <mt-field label="有效期至" placeholder="有效期" v-model="housePropety.effectivedate"></mt-field> -->
    </div>
    <returnnext :url="urlList" @actualgetsfz="getsfz" @actualnextstep="nextstep"></returnnext>
    <bottom></bottom>
 </div>
</template>

<script>
import headertop from '@/common/header/head'
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
      actualText:'请刷取自助终端的本人身份证',
     }
   },
   components: {
    headertop,
    swipe,
    returnnext,
    bottom
   },
   mounted () {

    },
   methods:{
      //子组件传递过来的事件
      getsfz () {
        //alert("111")
        //扫描成功get数据，先把本人data保存到浏览器localstage
        axios.get('/static/index.json').then(this.getInfoSucc)
        //this.urlList.getsfzdisplay = false

      },
      //子组件传过来下一步
      nextstep () {
        if (Object.keys(this.housePropety).length == 0){
          alert("不能为空");
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
      getInfoSucc (res) {
        res = res.data
        if (res.ret && res.data){
          const data = res.data
          this.housePropety = data.housePropety
          //读取到才隐藏
          if (Object.keys(this.housePropety).length != 0){
            this.urlList.getsfzdisplay = false
          }
          //保存到localstage
          var self = {
            id:Date.now(), 
            name:this.housePropety.name, 
            sex:this.housePropety.sex,
            born:this.housePropety.birthDate,//身份证birthDate
            nation:this.housePropety.nation,
            address:this.housePropety.address,
            hkidCardNumber:this.housePropety.hkidCardNumber,
            grantDept:this.housePropety.grantDept,
            userLifeBegin:this.housePropety.userLifeBegin,
            userLifeEnd:this.housePropety.userLifeEnd,
            relation:this.housePropety.relation,
            isHouser:true
          }
          var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
          list.unshift(self);
          localStorage.setItem('PrintList',JSON.stringify(list))
        }
      },
      //自助机读取身份证
      ReadIDCardByJs:function(){
          setTimeout(function () { 
            window.external.UniteMethod("ReadIDCardByJs","");
          },400);
      },
          


          


    }
 }
</script>

<style lang="scss" scoped>

  // .mint-header-title{
  //   overflow:initial;
  // }
  
  .form{
    padding:0.2rem 0.6rem 0 0.6rem;
    .divTxt{
      // line-height: 0.54rem;
      height: 0.50rem;
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
        padding: 0.05rem 0;
        width: 72%;
        height: 0.48rem;
        line-height: 0.58rem;
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
  // .mint-cell{
  //   min-height:0.82rem;
  // }
  // .btn{
  //   text-align: center
  // }

</style>
