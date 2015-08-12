// JavaScript Document


//function doMove(obj, attr, speed, target){
//	clearInterval(obj.timer);
//	obj.timer = setInterval(function(){
//		var attrVal = parseInt(getStyle(obj, attr)) + speed + 'px';
//		console.log(attrVal);
//		if((parseInt(attrVal) >= parseInt(target) && speed > 0) ||
//			(parseInt(attrVal) <= parseInt(target) && speed < 0)
//			 ){
//			attrVal = target;
//		}
//		
//		obj.style.top = attrVal;
//		
//	},30);	
//}

function doMove ( obj, attr, dir, target, endFn ) {
	
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target ) {
			clearInterval( obj.timer );
			
			/*
			if ( endFn ) {
				endFn();
			}
			*/
			endFn && endFn();
			
		}
		
	}, 30);
}
		
		
// function getStyle(obj, attr){
	
// 	return obj.CurrentStyle ? obj.CurrentStyle[attr] : getComputedStyle(obj)[attr];

// }

function getStyle ( obj, attr ) { 
	return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; 
}

function shake ( obj, attr, pos, len, endFn ) {
	
	//var pos = parseInt( getStyle(obj, attr) );			// 有隐患的
	
	var arr = [];			// 20, -20, 18, -18 ..... 0
	var num = 0;
	var timer = null;
		
	for ( var i=len; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);
		
	clearInterval( obj.shake );
	obj.shake = setInterval(function (){
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if ( num === arr.length ) {
			clearInterval( obj.shake );
			endFn && endFn();
		}
	}, 50);
}

function opacity(obj, num, target, endFn) {
	
	num = getStyle(obj, 'opacity')*100 < target ? num : -num;
	
	clearInterval( obj.opacity );
	
	obj.opacity = setInterval(function () {
		
		var speed = parseInt(getStyle(obj, 'opacity')*100) + num;
		
		if ( speed > target && num > 0 || speed < target && num < 0 ) {
			speed = target;
		}
		
		obj.style.opacity = speed/100;
		obj.style.filter = 'alpha(opacity='+ speed +')';
		
		if ( speed == target ) {
			clearInterval( obj.opacity );
			endFn && endFn();
		}

	}, 20);
}