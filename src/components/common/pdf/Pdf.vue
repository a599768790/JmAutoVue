<template>
  <div class="pdf">
    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
    <div>
      <mt-button size="large" @click="MSPrintByJS">testprint</mt-button>
      
    </div>
    <div>
      <mt-button size="large" @click="returnhome">返回首页</mt-button>
    </div>
  </div>


  
</template>

<script>
import PDFJS from 'pdfjs-dist'
let Base64 = require('js-base64').Base64

export default {
  data () {
    return {
      title: '',
      pdfDoc: null,
      loadding: false,
      pages: 0,
      printurl:window.location.href
    }
  },
  methods: {
    renderPage (num) {
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (_this.pages > num) {
          _this.renderPage(num + 1)
        }
      })
    },
    loadFile (url) {
      let _this = this
      PDFJS.getDocument(url).then(function (pdf) {
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          _this.renderPage(1)
        })
      })
    },
    //测试打印pdf
    MSPrintByJS:function(){
      var request = {
          "printData": "", 
          "templateId": "3", 
          "cutMode": "0", 
          "attach": "附加信息", 
          "htmlUrlInfo": {
            "htmlUrl": this.printurl, 
            "width": "240", 
            "height": "228"
          }
      }
      //console.log(request);
      window.external.UniteMethod("MSPrintByJS",request)

    },
    MSPrintResultToJs:function(){
      var response = window.external.UniteMethod("MSPrintResultToJs");
      if (response.status == 1){
        alert("成功!");

      }
      if(response.status == 0){
        alert("打印失败!!")
      }
    },
    //返回首页
    returnhome:function(){
        localStorage.clear();
        this.$router.push({
          path: '/',
          // query: {
          //   id: id
          // }
        })
    },

  },
  mounted () {
    //"printpdf\CacheFile\2019\2\21\20190201000059_mahic7_2019022117041366850.pdf"
    let url = this.$route.query.url
    this.loadFile(url)
  }
}
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  border-bottom: 1px solid black;
}
.pdf{
    margin-top:3rem;
}
</style>
