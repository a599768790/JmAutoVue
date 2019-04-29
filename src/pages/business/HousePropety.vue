<template>
 <div>
    <headertop :headerText="actualText"></headertop>
    <swipe></swipe>
    <div class="form">
      <div class="divTxt">
        <span class="spanTxt">姓名</span>
        <input class="inputTxt" placeholder="请输入姓名" v-model="housePropety.name">
      </div>
      <div class="divTxt">
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
        <input class="inputTxt" placeholder="请输入身份证号" v-model="housePropety.certNo">
      </div>
      <div class="divTxt">
        <span class="spanTxt">签发机关</span>
        <input class="inputTxt" placeholder="请输入签发机关" v-model="housePropety.effectivedate">
      </div>
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
        //扫描成功get数据，先把本人data保存到浏览器localstage
        axios.get('/static/index.json').then(this.getInfoSucc)

      },
      //自助机读取身份证
      zzjgetsfz () {
        //打开读取身份证端口
        alert("打开读取身份证");
        window.external.UniteMethod("ReadIDCardByJs","");
        setTimeout(function(){
            var str = localStorage.getItem("PrintList") || '[]';
            var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
            alert("从浏览器读取身份证")
            alert(str)
            this.housePropety = list.housePropety
            //读取到才隐藏
            if (Object.keys(this.housePropety).length != 0){
              this.urlList.getsfzdisplay = false
            }
            //保存到localstage
            // var self = {
            //   id:Date.now(), 
            //   name:this.housePropety.name, 
            //   sex:this.housePropety.sex,
            //   born:this.housePropety.birthDate,//身份证birthDate
            //   nation:this.housePropety.nation,
            //   address:this.housePropety.address,
            //   certNo:this.housePropety.certNo,
            //   grantDept:this.housePropety.grantDept,
            //   userLifeBegin:this.housePropety.userLifeBegin,
            //   userLifeEnd:this.housePropety.userLifeEnd,
            //   appellation:this.housePropety.appellation,
            //   isHouser:true
            // }
            //var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
            list.unshift(this.housePropety);
            //lacalstorge存储字符串
            localStorage.setItem('PrintList',JSON.stringify(list))

        },2000);
          

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
            certNo:this.housePropety.certNo,
            grantDept:this.housePropety.grantDept,
            userLifeBegin:this.housePropety.userLifeBegin,
            userLifeEnd:this.housePropety.userLifeEnd,
            appellation:this.housePropety.appellation,
            isCardReader:true
          }
          var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
          list.unshift(self);
          localStorage.setItem('PrintList',JSON.stringify(list))
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
