(function (doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = (clientWidth / 7.5) + 'px';
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// fnResize()
//   window.onresize = function () {
//     fnResize()
//   }
//     function fnResize() {
//     var deviceWidth = document.documentElement.clientWidth || window.innerWidth
//     if (deviceWidth >= 750) {
//       deviceWidth = 750
//     }
//     if (deviceWidth <= 320) {
//       deviceWidth = 320
//     }
//     document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
//   }

  //读取身份证
  function IDCardResultToJs(response){
    var pesson = eval('(' + response + ')');
    var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
    list.unshift(pesson);
    localStorage.setItem('PrintList',JSON.stringify(list))
  }

  //打印
  function IDCardResultToJs(response){
    // var pesson = eval('(' + response + ')');
    // var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
    // list.unshift(pesson);
    // localStorage.setItem('PrintList',JSON.stringify(list))
    var request = {

    }
    window.external.UniteMethod("OfficePrintByJs",request)
  }