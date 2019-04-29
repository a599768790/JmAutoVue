<template>
 <div>
    <headertop :headerText="actualText"></headertop>
    <swipe></swipe>
    <div class="form">
      <div class="divTxt">
        <span class="spanTxt">姓名</span>
        <input class="inputTxt" placeholder="请输入姓名" v-model="spouse.name">
      </div>
      <div class="divTxt">
        <span class="spanTxt">性别</span>
        <input class="inputTxt" placeholder="请输入性别" v-model="spouse.sex">
      </div>
      <div class="divTxt">
        <span class="spanTxt">出生</span>
        <input class="inputTxt" placeholder="请输入出生年月" v-model="spouse.birthDate">
      </div>
      <div class="divTxt">
        <span class="spanTxt">民族</span>
        <input class="inputTxt" placeholder="请输入民族" v-model="spouse.nation">
      </div>
      <div class="divTxt">
        <span class="spanTxt">地址</span>
        <input class="inputTxt" placeholder="请输入地址" v-model="spouse.address">
      </div>
      <div class="divTxt">
        <span class="spanTxt">身份证号</span>
        <input class="inputTxt" placeholder="请输入身份证号" v-model="spouse.certNo">
      </div>
      <div class="divTxt">
        <span class="spanTxt">签发机关</span>
        <input class="inputTxt" placeholder="请输入签发机关" v-model="spouse.effectivedate">
      </div>
    </div>
    <returnnext :url="urlList" @actualgetsfz="getsfz" @actualnextstep='nextstep'></returnnext>
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
      actualText:"请刷取配偶身份证"
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
          //子组件传过来的
          getsfz () {
            //扫描成功get数据，先把本人data保存到浏览器localstage
            axios.get('/static/index.json').then(this.getHomeInfoSucc)
            // if(Object.keys(this.spouse).length != 0){
            //   this.urlList.getsfzdisplay = false
            // }
            this.urlList.getsfzdisplay = false
          },
          getHomeInfoSucc (res) {
            res = res.data
            if (res.ret && res.data){
              const data = res.data
              this.spouse = data.housePropety.relationperson[0]
              //读取到消息才隐藏
              if (Object.keys(this.spouse).length != 0){
                this.urlList.getsfzdisplay = false
              }
            
              //保存到localstage
              var spouse = {
                id:Date.now(), 
                name:this.spouse.name, 
                sex:this.spouse.sex,
                birthDate:this.spouse.birth,//身份证birthDate
                nation:this.spouse.nation,
                address:this.spouse.address,
                certNo:this.spouse.certNo,
                signorganization:this.spouse.signorganization,
                effectivedate:this.spouse.effectivedate,
                appellation:this.spouse.appellation,
                isHouser:false,
                certType:"身份证"
              }

              var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
              list.unshift(spouse);
              localStorage.setItem('PrintList',JSON.stringify(list))
            }
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
