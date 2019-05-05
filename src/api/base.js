
export function aa() {
  alert("测试export");
}

//js填充表单
export function loadData(jsonStr){
	//var obj = eval("("+jsonStr+")");
  var obj = jsonStr;
  var key,value,tagName,type,arr;
	for(var x in obj){
		key = x;
		value = obj[x];
		$("[name='"+key+"'],[name='"+key+"[]']").each(function(){
			tagName = $(this)[0].tagName;
			type = $(this).attr('type');
			if(tagName=='INPUT'){
				if(type=='radio'){
					$(this).attr('checked',$(this).val()==value);
				}else if(type=='checkbox'){
					arr = value.split(',');
					for(var i =0;i<arr.length;i++){
						if($(this).val()==arr[i]){
							$(this).attr('checked',true);
							break;
						}
					}
				}else{
					$(this).val(value);
				}
			}else if(tagName=='SELECT' || tagName=='TEXTAREA'){
				$(this).val(value);
			}
			
		});
	}
}

  //读取身份证
  export function IDCardResultToJs(response){
    alert("开始读取身份证");
    alert(response);
    var person = eval('(' + response + ')');
    var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
    list.unshift(person);
    localStorage.setItem('PrintList',JSON.stringify(list))
  }

  //打印
  // export function IDCardResultToJs(response){
  //   // var pesson = eval('(' + response + ')');
  //   // var list = JSON.parse(localStorage.getItem("PrintList") || '[]')
  //   // list.unshift(pesson);
  //   // localStorage.setItem('PrintList',JSON.stringify(list))
  //   var request = {

  //   }
  //   window.external.UniteMethod("OfficePrintByJs",request)
  // }

  // export default {aa}