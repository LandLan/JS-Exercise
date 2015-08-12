function startMove(obj, json) {

	clearInterval(obj.timer);
	var iCur = 0;

	
	obj.timer = setInterval(function() {
		var b = true; //用来判断是否所有的属性都已改变
		for( var attr in json ) {
			console.log(attr);
			if( attr == 'opacity' ){
				iCur = Math.round(getCss(obj, 'opacity') * 100);
			}else{
				iCur = parseInt( getCss(obj, attr) );
			}
			var target = json[attr];
			
			var speed = ( target - iCur ) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if( iCur !=  target) {
				if( attr == 'opacity' ){
					obj.style.opacity = ( iCur + speed ) / 100;
					obj.style.filter = "alpha(opacity="+ iCur + speed +")";
				}else{
					obj.style[attr] = iCur + speed + 'px';
				}
				b = false;
			}
			
		}

		if( b ) {
			clearInterval(obj.timer);
		}

	}, 30);

}

function getCss(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}


// function startMove(obj, json) {

// 	clearInterval(obj.timer);
// 	var iCur = 0;
// 	var iPosTmp = 0;
	
// 	obj.timer = setInterval(function() {
// 		var b = true; //用来判断是否所有的属性都已改变
// 		for( var attr in json ) {
// 			// console.log(attr);
// 			if( attr == 'opacity' ){
// 				iCur = Math.round(getCss(obj, 'opacity') * 100);
// 			}else{
// 				console.log(getCss(obj, attr));
// 				iCur = parseInt( getCss(obj, attr) );
// 			}
// 			var target = json[attr];

// 			var speed = ( target - iCur ) / 8;
// 			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

// 			if( attr == 'opacity' ){
// 				iPosTmp = ( iCur + speed ) / 100;
// 			}else{
// 				iPosTmp = iCur + speed;
// 			}

// 			console.log(iCur + '=' +speed + '-' +iPosTmp + '-' + target);

// 			if( iPosTmp >=  target && speed < 0 || iPosTmp<=target && speed > 0) {
// 				if( attr == 'opacity' ){
// 					obj.style.opacity = ( iCur + speed ) / 100;
// 					obj.style.filter = "alpha(opacity="+ iCur + speed +")";
// 				}else{
// 					obj.style[attr] = iCur + speed + 'px';
// 				}
// 				b = false;
// 			}else{
// 				if( attr == 'opacity' ){
// 					obj.style.opacity = target / 100;
// 					obj.style.filter = "alpha(opacity="+ target +")";
// 				}else{
// 					obj.style[attr] = target + 'px';
// 				}
// 			}
			
// 		}

// 		if( b ) {
// 			clearInterval(obj.timer);
// 		}

// 	}, 30);

// }