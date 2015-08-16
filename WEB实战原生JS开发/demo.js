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

	var oHomeContent = $('homeContent');
	var oHomeContent1 = getByClass(oHomeContent, 'homeContent1')[0];
	var oHomeContent2 = getByClass(oHomeContent, 'homeContent2')[0];

	var oAboutContent = $('aboutContent');
	var oAboutContent3 = getByClass(oAboutContent, 'aboutContent3')[0];

	contentAuto();
	listContentAuto();
	bindNav();
	mouseScroll();

	window.onresize = fnResize;

	worksContentInit();
	homeContentInit();


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
	
toMove(3);
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

	function homeContentInit(){
		var aLi1 = oHomeContent1.getElementsByTagName('li');
		var aLi2 = oHomeContent2.getElementsByTagName('li');
		var oldIndex = 0;

		var arr = [
			{"text": "One layer"},
			{"text": "Two layer"},
			{"text": "Three layer"}
		];

		for(var i=0; i<arr.length; i++){

			var oLi1 = document.createElement('li');
			oLi1.innerHTML = '<h1 class="commonTitle">'+arr[i].text+'</h1>';

			var oLi2 = document.createElement('li');

			if(i == 0) {
				oLi1.className = 'active';
				oLi2.className = 'active';
			}

			oHomeContent1.appendChild(oLi1);
			oHomeContent2.appendChild(oLi2);

		}

		for(var i=0; i<aLi2.length; i++){
			aLi2[i].index = i;
			aLi2[i].onclick = function(){
				
				for(var i=0; i<aLi2.length; i++){
					aLi2[i].className = '';
				}

				this.className = 'active';
				
				if(this.index > oldIndex){ // 向右
					aLi1[this.index].className = 'rightShow';
					aLi1[oldIndex].className = 'leftHide';
				}else if(this.index < oldIndex){
					aLi1[this.index].className = 'leftShow';
					aLi1[oldIndex].className = 'rightHide';
				}

				oldIndex = this.index;
			}
		}

	}

	aboutContent();
	
	// var aAboutImg = getByClass(oAboutContent3, 'aboutImg');

	function aboutContent(){
		var aUl = oAboutContent3.getElementsByTagName('ul');
		var aSpan = oAboutContent3.getElementsByTagName('span');

		for(var i=0; i<aUl.length; i++){

			change(aUl[i], aSpan[i]);

		}

		function change(oUl, oSpan){
			var w = oUl.offsetWidth / 2;
			var h = oUl.offsetHeight / 2;
			var oImgUrl = oUl.dataset.src;
			// aUl[i].index = i;

			for(var j=0; j<4; j++){

				var oLi = document.createElement('li');
				var oImg = document.createElement('img');

				oLi.style.width = w + 'px';
				oLi.style.height = h + 'px';

				oLi.style.left = j%2 * w + 'px';
				oLi.style.top = Math.floor(j/2) * h + 'px';

				oImg.src = oImgUrl;
				oImg.style.left = -j%2 * w + 'px';
				oImg.style.top = - Math.floor(j/2) * h + 'px';
				oImg.oldleft = -j%2 * w;
				oImg.oldtop = - Math.floor(j/2) * h;

				oLi.appendChild(oImg);
				oUl.appendChild(oLi);
			}


			var data = [
				{'name':'top', 'value' : h },
				{'name':'left', 'value' : -w * 2},
				{'name':'left', 'value': w },
				{'name':'top', 'value' : -h * 2}
			];



			oUl.onmouseover = function(){

				var aImg = this.getElementsByTagName('img');

				for(var i=0; i<aImg.length; i++){
					aImg[i].style[data[i].name] = data[i].value + 'px';
				}

				oSpan.style.transform = 'scale(1)';

			}

			oUl.onmouseout = function(){
				var aImg = this.getElementsByTagName('img');

				for(var i=0; i<aImg.length; i++){
					aImg[i].style[data[i].name] = aImg[i]['old'+data[i].name] + 'px';
				}
				oSpan.style.transform = 'scale(1.5)';
			}
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