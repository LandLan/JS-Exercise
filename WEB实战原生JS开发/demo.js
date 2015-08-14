window.onload = function(){

	var oNav = $('nav');
	var aLiNav = oNav.getElementsByTagName('li');
	var oArrow = $('arrow');
	var oHeader = $('header');
	var oContent = $('content');
	var oList = $('list');
	var aLiList = getByClass(oList, 'liList');
	var aDivList = getByClass(oList, 'divList');
	var iContentHeight = 0;
	var iNow = 0;

	var oWorskContent = $('worksContent');
	var oWorskContent2 = getByClass(oWorskContent, 'worksContent2')[0];

	contentAuto();
	listContentAuto();
	bindNav();
	mouseScroll();

	window.onresize = fnResize;

	worksContentInit();


	function bindNav(){

		var oDivUp = aLiNav[0].getElementsByTagName('div')[0];
		oDivUp.style.width = '100%';
		oArrow.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';

		for(var i=0; i<aLiNav.length; i++){

			aLiNav[i].index = i;
			aLiNav[i].onmousedown = function(){
				toMove(this.index);
				iNow = this.index;
			}

		}

	}
	
// toMove(2);
	function toMove(index){

		for(var i=0; i<aLiNav.length; i++){
			var oDivUp = aLiNav[i].getElementsByTagName('div')[0];
			oDivUp.style.width = ''; // 为什么不能写0%，bug是点击后hover不起作用了
		}

		var oDivUp = aLiNav[index].getElementsByTagName('div')[0];
		oDivUp.style.width = '100%';
		oArrow.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth/2 - oArrow.offsetWidth/2 + 'px';
		oList.style.top = -index * iContentHeight + 'px';
	}


	function contentAuto(){
		iContentHeight = viewHeight() - oHeader.offsetHeight;
		oContent.style.height = iContentHeight + 'px';
		for(var i=0; i<aLiList.length; i++){
			aLiList[i].style.height = iContentHeight + 'px';
		}
		oList.style.top = -iNow * iContentHeight + 'px';

	}

	function listContentAuto(){
		var iT = (iContentHeight - 520) / 2 ;
		var iL = (viewWidth() - 1100) / 2;
		for(var i=0; i<aDivList.length; i++){
			aDivList[i].style.top = iT + 'px';
			aDivList[i].style.left = iL + 'px';
		}

	}

	function fnResize(){
		contentAuto();
		listContentAuto();
	}

	function mouseScroll(){
		var bDirect = false;
		var timer = null;

		if(oContent.addEventListener){
			oContent.addEventListener('DOMMouseScroll', function(ev){
				var ev = ev || window.event;
				
				// alert(ev.detail);
				bDirect = ev.detail > 0 ? true : false;

				clearTimeout(timer);
				timer = setTimeout(function(){
					// alert(bDirect);
					toChange(bDirect);
				},200);

				if(ev.preventDefault){
					ev.preventDefault();
				}
				else{
					return false;
				}

			}, false);
		}

		oContent.onmousewheel = function(){
			var ev = ev || window.event
			// alert(ev.wheelDelta);

			bDirect = ev.wheelDelta < 0 ? true : false;
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				// alert(bDirect);
				toChange(bDirect);
			},200);

			if(ev.preventDefault){
				ev.preventDefault();
			}
			else{
				return false;
			}
		};


		function toChange(bDirect){
			// alert(bDirect); // true --> 下

			if(bDirect){
				iNow++;
				if(iNow > aLiList.length-1){
					iNow = aLiList.length-1;
				}
				
			}else{
				iNow--;
				if(iNow < 0){
					iNow = 0;
				}
			}
			toMove(iNow);
		}

	}


	function worksContentInit(){
		//oWorskContent2
		var arrImg = ['img/worksimg1.jpg', 'img/worksimg2.jpg', 'img/worksimg3.jpg', 'img/worksimg4.jpg'];
		
		for(var i=0; i<arrImg.length; i++){
			var oDivParent = document.createElement('div');
			oDivParent.className = 'worksImgParent';
			oDivParent.innerHTML = '<img class="worksImg" src="'+arrImg[i]+'" alt=""><div class="worksImgMark"><div></div></div>';
			oWorskContent2.appendChild(oDivParent);
		}

	}


}

function $(id) {
	return document.getElementById(id);
}

function viewWidth(){
	return window.innerWidth || document.documentElement.clientWidth;
}

function viewHeight(){
	return window.innerHeight || document.documentElement.clientHeight;
}

function getByClass(oParent, className){
	var arr = [];
	var aEle = oParent.getElementsByTagName('*');

	for(var i=0; i<aEle.length; i++){
		if(aEle[i].className == className) {
			arr.push(aEle[i]);
		}
	}
	return arr;
}