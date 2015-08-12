function getElementsByClassName(parent, tagname, className){

	var aEls = parent.getElementsByTagName(tagname);
	var arr = [];

	for(var i=0; i<aEls.length; i++){

		var aClassName = aEls[i].className.split(' ');
		for(var j=0; j<aClassName.length; j++){

			
			if( aClassName[j] == className){
				arr.push(aEls[i]);
				break;
			}

		}
		
	}

	return arr;

}

function addClass(obj, className) {

	if(obj.className == ''){
		obj.className = className;
	}else{
		var aClassName = obj.className.split(' ');
		var _index = aIndexOfClassName(aClassName, className);

		if(_index == -1){
			obj.className += ' ' + className;
		}
	}


}

function removeClass( obj, className ){

	if(obj.className != ''){
		var aClassName = obj.className.split(' ');
		var _index = aIndexOfClassName(aClassName, className);
		if(_index != -1){
			aClassName.splice(_index, 1);
			obj.className = aClassName.join(' ');
		}
	}

}


function drag(obj) {
		
	obj.onmousedown = function(ev) {
		var ev = ev || event;
		
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;
		
		// ie7 设置全局捕获
		if ( obj.setCapture ) {
			obj.setCapture();
		}
		
		document.onmousemove = function(ev) {
			var ev = ev || event;
			
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			
			//限制范围的拖拽  如果实现磁性吸附，只需要判断如 L < 100 这种形式就可
			if ( L < 0 ) {
				L = 0;
			} else if ( L > document.documentElement.clientWidth - obj.offsetWidth ) {
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}
			
			if ( T < 0 ) {
				T = 0;
			} else if ( T > document.documentElement.clientHeight - obj.offsetHeight ) {
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}
			
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		}
		
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			//释放全局捕获 releaseCapture();
			if ( obj.releaseCapture ) {
				obj.releaseCapture();
			}
		}
		
		//阻止事件默认行为
		return false;
		
	}
	
}

function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + t );
	document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}

function removeCookie(key) {
	setCookie(key, '', -1);
}