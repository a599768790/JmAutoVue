<template>
  <div class="pdf">
    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>

    <div class="printDiv">
      <button class="pdfBtn" @click="printPdf()">打印PDF</button>
    </div>
    <div class="returnDiv">
      <button class="pdfBtn" @click="returnhome()">返回</button>
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
    //打印pdf
    printPdf () {
      alert("准备打印")
      var landspace = "2"
      var request = "{\"typeId\": \"7\", \"templateId\": \""+landspace+"\", \"landspace\": \"2\",	\"printType\": \"A4\", \"attach\": \"打印完成请取走打印材料\", \"wordInfo\": {\"filePath\":\"http://172.17.213.145:6060/test.pdf\"}}";//反斜杠正确
      window.external.UniteMethod("OfficePrintByJs",request);
    }
  },
  mounted () {
    //"printpdf\CacheFile\2019\2\21\20190201000059_mahic7_2019022117041366850.pdf"

    let url = this.$route.query.url
    alert(url);
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
    .printDiv{
      text-align: center;
      .printBtn{

      }
    }
    .returnDiv{
      text-align: center;
      .returnBtn{

      }
    }
    .pdfBtn{
      width:6rem;
      height: 0.8rem;
      text-align: center;
      border-radius: 0.4rem;
      margin-top:0.3rem;
      font-size:0.4rem;
      border:none;
      color:#fff;
      background: #29aae3;
    }
    
    
}


</style>
