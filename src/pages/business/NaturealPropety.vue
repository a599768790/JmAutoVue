<template>
 <div>
    <mt-header fixed title="TEST" class="header"></mt-header>
    <swipe></swipe>
    <div class="form">
      <mt-field label="姓名" placeholder="请输入姓名" v-model="housePropety.name"></mt-field>
      <mt-field label="性别" placeholder="请输入性别" v-model="housePropety.sex"></mt-field>
      <mt-field label="出生" placeholder="请输入出生年月" v-model="housePropety.born"></mt-field>
      <mt-field label="民族" placeholder="请输入民族" v-model="housePropety.nation"></mt-field>
      <mt-field class="address" label="地址" placeholder="请输入地址" v-model="housePropety.address"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" v-model="housePropety.idCardNo"></mt-field>
      <mt-field label="签发机关" placeholder="请输入签发机关" v-model="housePropety.grantDept"></mt-field>
      <!-- <mt-field label="有效期至" placeholder="有效期" v-model="housePropety.effectivedate"></mt-field> -->
    </div>
    <returnnext :url="urlList"></returnnext>

 </div>
</template>

<script>
 import swipe from '@/components/common/swipe/swipe'
 import returnnext from '@/components/common/returnnext/returnnext'
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
        nextdisplay:true
      }
     }
   },
   components: {
    swipe,
    returnnext
   },
   mounted () {
      //打开证件读取
      this.ReadIDCardByJs()
      //返回json
      //this.IDCardResultToJs()
      //this.getHomeInfo()
      
    },
   methods:{
          ReadIDCardByJs:function () {

          },
          //读取身份证
          
          // getHomeInfo () {
          //   //扫描成功get数据，先把本人data保存到浏览器localstage
          //   axios.get('/static/index.json').then(this.getHomeInfoSucc)
          // },
          // getHomeInfoSucc (res) {
          //   res = res.data
          //   if (res.ret && res.data){
          //     const data = res.data
          //     this.housePropety = data.housePropety

          //     //保存到localstage
          //     var self = {
          //       id:Date.now(), 
          //       name:this.housePropety.name, 
          //       sex:this.housePropety.sex,
          //       born:this.housePropety.born,//身份证birthDate
          //       nation:this.housePropety.nation,
          //       address:this.housePropety.address,
          //       idCardNo:this.housePropety.idCardNo,
          //       grantDept:this.housePropety.grantDept,
          //       userLifeBegin:this.housePropety.userLifeBegin,
          //       userLifeEnd:this.housePropety.userLifeEnd,
          //       relation:this.housePropety.relation,
          //       isHouser:true
          //     }

          //     var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
          //     list.unshift(self);
          //     localStorage.setItem('PrintList',JSON.stringify(list))
          //   }
          //   //console.log(res)
          // },
          
          //自助机读取身份证
          getsfz:function(){
              //setTimeout(function () { 
                window.external.UniteMethod("ReadIDCardByJs","");
              //},400);
          },
          // IDCardResultToJs:() => {
          //   //setTimeout(function () { 
          //     var response = window.external.UniteMethod("IDCardResultToJs",""); 
          //     this.housePropety = response
          //     // if (typeof fn_callback=="function") {
          //     // fn_callback(response);
          //     // }
          //     if(response.status == 1){
          //       alert('读取成功!!')
          //       this.CloseIDCardRead();
                
          //     }
          //     if(response.status == 0){
          //       alert("读取失败!!")
          //     }

          //     //保存到localstage
          //     var self = {
          //       id:Date.now(), 
          //       name:this.housePropety.name, 
          //       sex:this.housePropety.sex,
          //       birthDate:this.housePropety.birth,//身份证birthDate
          //       nation:this.housePropety.nation,
          //       address:this.housePropety.address,
          //       hkidCardNumber:this.housePropety.hkidCardNumber,
          //       signorganization:this.housePropety.signorganization,
          //       effectivedate:this.housePropety.effectivedate,
          //       relation:this.housePropety.relation,
          //       isHouser:true
          //     }

          //     var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
          //     list.unshift(self);
          //     localStorage.setItem('PrintList',JSON.stringify(list))

              

          //   //},400);

          // },
          //关闭身份证读取
          CloseIDCardRead:function(){
            //setTimeout(function () { 
              window.external.CloseIDCardRead()
              //},400);
            alert('关闭读取身份证')
          }




    }
 }
</script>

<style scoped>
  .mint-header-title{
    overflow:initial;
  }
  .form{
    padding:0.2rem 0.6rem 0 0.6rem;
  }
  .mint-cell{
    min-height:0.82rem;
  }
  .btn{
    text-align: center
  }

</style>
