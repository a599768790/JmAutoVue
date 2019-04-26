<template>
 <div>
    <!-- <mt-header fixed title="请刷取子女身份证" class="header"></mt-header> -->
    <headertop :headerText="actualText"></headertop>
    <swipe></swipe>
    <div class="form">
      <!-- <mt-field label="姓名" placeholder="请输入姓名" v-model="children.name"></mt-field>
      <mt-field label="性别" placeholder="请输入性别" v-model="children.sex"></mt-field>
      <mt-field label="出生" placeholder="请输入出生年月" v-model="children.birthDate"></mt-field>
      <mt-field label="民族" placeholder="请输入民族" v-model="children.nation"></mt-field>
      <mt-field class="address" label="地址" placeholder="请输入地址" v-model="children.address"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" v-model="children.hkidCardNumber"></mt-field>
      <mt-field label="签发机关" placeholder="请输入签发机关" v-model="children.signorganization"></mt-field>
      <mt-field label="有效期至" placeholder="有效期" v-model="children.effectivedate"></mt-field> -->
      <div class="divTxt">
        <span class="spanTxt">姓名</span>
        <input class="inputTxt" placeholder="请输入姓名" v-model="children.name">
      </div>
      <div class="divTxt">
        <span class="spanTxt">性别</span>
        <input class="inputTxt" placeholder="请输入性别" @click="chooseSex" v-model="children.sex">
      </div>
      <div class="divTxt">
        <span class="spanTxt">出生</span>
        <input class="inputTxt" placeholder="请输入出生年月" @click="chooseBirth('single')" v-model="children.birthDate">
      </div>
      <div class="divTxt">
        <span class="spanTxt">民族</span>
        <input class="inputTxt" placeholder="请输入民族" @click="chooseNation" v-model="children.nation">
      </div>
      <div class="divTxt">
        <span class="spanTxt">地址</span>
        <input class="inputTxt" placeholder="请输入地址" v-model="children.address">
      </div>
      <div class="divTxt">
        <span class="spanTxt">身份证号</span>
        <input class="inputTxt" placeholder="请输入身份证号" @touchstart.stop="idshow = true" v-model="children.hkidCardNumber">
      </div>
      <div class="divTxt">
        <span class="spanTxt">签发机关</span>
        <input class="inputTxt" placeholder="请输入签发机关" v-model="children.effectivedate">
      </div>
    </div>
    <returnnext :url="urlList" @actualgetsfz='getsfz' @actualnextstep='nextstep'></returnnext>
    <bottom></bottom>
    <van-popup v-model="sexDisplay" :overlay="false">
        <van-picker
            show-toolbar
            :columns="columns"
            :visible-item-count="2"
            @confirm="sexonConfirm"
            @cancel="sexonCancel"
        />
    </van-popup>
    <calendar :show.sync="calendarshow" :mode="mode" @change="onChange"/>

    <van-popup class="nationPop" v-model="nationDisplay" :overlay="false">
        <van-picker
            show-toolbar
            :columns="nationcolumns"
            :visible-item-count="3"
            @confirm="nationonConfirm"
            @cancel="nationonCancel"
        />
    </van-popup>
    <van-number-keyboard
      :show="idshow"
      extra-key="."
      close-button-text="完成"
      @blur="idshow = false"
      @input="onInput"
      @delete="onDelete"
    />

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
      children:{},
      childrenList:[],
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
      actualText:"请刷取子女身份证",
      sexDisplay: false,
      birthDisplay:false,
      nationDisplay:false,
      columns: ['男', '女'],
      nationcolumns:["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族",
		"土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", 
		"达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", 
		"德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"],
      //日期控件
      calendarshow: false,
      mode: 'during',
      //身份证输入
      idshow: false
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
          getsfz () {
            //扫描成功get数据，先把本人data保存到浏览器localstage
            axios.get('/static/index.json').then(this.getHomeInfoSucc)
            // if(Object.keys(this.housePropety).length != 0){
            //   this.urlList.children = false
            // }
            this.urlList.getsfzdisplay = false
          },
          getHomeInfoSucc (res) {
            res = res.data
            if (res.ret && res.data){
              const data = res.data
              this.children = data.housePropety.relationperson[1]
              //读取到才隐藏
              if (Object.keys(this.children).length != 0){
                this.urlList.getsfzdisplay = false
              }
              
              //保存到localstage
              var children = {
                id:Date.now(), 
                name:this.children.name, 
                sex:this.children.sex,
                birthDate:this.children.birthDate,//身份证birthDate
                nation:this.children.nation,
                address:this.children.address,
                hkidCardNumber:this.children.hkidCardNumber,
                signorganization:this.children.signorganization,
                effectivedate:this.children.effectivedate,
                relation:this.children.relation,
                isHouser:false
              }
              var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
              list.unshift(children);
              localStorage.setItem('PrintList',JSON.stringify(list))
            }
          },
          //子组件传来的事件
          nextstep () {
            if (Object.keys(this.children).length == 0){
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
          //选择性别
          chooseSex () {
              this.sexDisplay = true;
          },
          sexonConfirm(value, index) {
            this.children.sex = value;
            this.sexDisplay = false;
          },
          sexonCancel () {
            this.sexDisplay = false;
          },
          //选择日期
          chooseBirth(mode) {
            this.calendarshow = true;
            this.mode = mode;
            this.children.birthDate = '';
          },
          //填充
          onChange(date) {
            if (this.mode === 'single') {
              this.children.birthDate = date.format('YYYY-MM-DD');
            } 
            // else {
            //   this.date = JSON.stringify(date.map((item) => item.format('YYYY-MM-DD')));
            // }
          },
          //选择民族
          chooseNation () {
            this.nationDisplay = true;
          },
          nationonConfirm(value, index) {
            this.children.nation = value;
            this.nationDisplay = false;
          },
          nationonCancel () {
            this.nationDisplay = false;
          },
          //身份证
          onInput(value) {
            //alert(value);
            //console.log(value)
            this.children.hkidCardNumber = value;
          },
          onDelete() {
            alert('delete');
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
  .van-popup{
      width: 7.52rem;
      top: 83%;
      height: 3rem;
  }
  .nationPop{
    height: 4rem;
    top: 79%;
  }
</style>
