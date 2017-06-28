

	function jump(option){
		//最外层容器
		var wrap = document.getElementById(option.wrapId)
		//创建显示多张图片的容器
		var item = document.createElement('div')
		item.setAttribute('id',option.itemId);
		wrap.appendChild(item)
		// var H =  wrap.currentStyle['height']
		// var H = parseInt(window.getComputedStyle(wrap, null)['height']) || 
		//创建a
		for(var i = 0 ; i < option.imgsArr.length; i++){
			var  newImg = document.createElement('img');
			newImg.setAttribute('class','smallImg');
			newImg.src = option.imgsArr[i];
			item.appendChild(newImg);
		}
		//创建弹出层
		var zoom = document.createElement('div');
		zoom.setAttribute('id',option.zoomId);
		//设置弹出层样式
		setGroupCss(zoom,{
			"background":"rgba(0,0,0,.2)",
			"position":"fixed",
			"left":"0",
			"top":"0",
			"width":window.innerWidth,
			"height":window.innerHeight,
			"display":"none"
		})
		wrap.appendChild(zoom)
		//创建轮播图边界
		var zoomWrap = document.createElement('div');
		zoomWrap.setAttribute('class','zoomWrap');
		setGroupCss(zoomWrap,{
			"position":"absolute",
			"left":"50%",
			"top":"50%",
			"marginLeft":-option.width/2,
			"marginTop":-option.height/2 ,
			"width":option.width,
			"height":option.height,
			"background":"#fff",
			"overflow":"hidden",	
		})
	
		zoom.appendChild(zoomWrap);
		//创建轮播图容器
		var zoomCon = document.createElement('div');
		zoomCon.setAttribute('class','zoomCon');
		setGroupCss(zoomCon,{
			"position":"absolute",
			"left":0,
			"top":0,
			"width":option.width*7,
			"height":option.height,
			"overflow":"hidden"
		})
	
		zoomWrap.appendChild(zoomCon);
		//创建图片
		for(var i = 0 ; i < option.bigImgsArr.length; i++){
			var  newBigImg = document.createElement('img');
			newBigImg.src = option.bigImgsArr[i];
			newBigImg.setAttribute('class','bigImg');
			newBigImg.style.float = 'left';
			zoomCon.appendChild(newBigImg);
		}
		//克隆第一张大图片放到最后
		var bigImgs = document.querySelectorAll('.bigImg');
		var firstBigImg = bigImgs[0].cloneNode(true);
		zoomCon.appendChild(firstBigImg)

		//创建右箭头
		var arrowR = document.createElement('span');
		arrowR.innerHTML = "&gt;";
		setGroupCss(arrowR,{
			"position":"absolute",
			"right":10,
			"top":"50%",
			"marginTop":-30,
			"width":40,
			"height":60,
			"fontSize":"40px",
			"fontFamily":"宋体",
			"textAlign":"center",
			"lineHeight":"60px",
			"fontWeight":"bold",
			"cursor":"pointer",
			"background":"rgba(0,0,0,.1)",
			"color":"#fff",
			"zIndex":9999
		})
		
		zoomWrap.appendChild(arrowR)
		//创建左箭头
		var arrowL = document.createElement('span');
		arrowL.innerHTML = "&lt;";
		setGroupCss(arrowL,{
			"position":"absolute",
			"left":10,
			"top":"50%",
			"marginTop":-30,
			"width":40,
			"height":60,
			"fontSize":"40px",
			"fontFamily":"宋体",
			"textAlign":"center",
			"lineHeight":"60px",
			"fontWeight":"bold",
			"cursor":"pointer",
			"background":"rgba(0,0,0,.2)",
			"color":"#fff",
			"zIndex":9999
		})
		zoomWrap.appendChild(arrowL)

		var Imgs = document.querySelectorAll('.smallImg');

		var num = 0;
		for(var i = 0 ; i < Imgs.length; i++){
			Imgs[i].index = i;
			//鼠标移入事件
			Imgs[i].onmouseover = function(){
				console.log(1111)
				for(var j = 0 ; j < Imgs.length; j++){
					Imgs[j].className = 'smallImg';
				}
				this.className += 'cur';
			}
			//鼠标移除事件
			Imgs[i].onmouseout = function(){
				this.className = 'smallImg';
			}
			//点击事件
			Imgs[i].onclick = function(e){
				var e = e || window.event;
				e.stopPropagation()
				zoom.style.display = 'block';
				zoomCon.style.left = -option.width * this.index + 'px';
				num = this.index;
				console.log(num)
			}
		}
		//右箭头点击事件
	
		arrowR.onclick = function(e){
			var e = e || window.event;
			e.stopPropagation()
			num++;	
			if(num > bigImgs.length){
				num = 1;
				zoomCon.style.left = 0;
			}
			go(zoomCon,-option.width * num)
		}
		arrowL.onclick = function(e){
			var e = e || window.event;
			e.stopPropagation()
			num--;
			if(num <0){
				num = bigImgs.length-1;
				zoomCon.style.left = -option.width * (bigImgs.length) + 'px';
			}
			go(zoomCon,-option.width * num)
		}

		//点击图片外关闭遮罩层
		document.onclick = function(e){
			if(e.target.id != option.wrapId  || e.srcElement.id){
				zoom.style.display = 'none';
			}
		}

		//运动函数
		function go(obj,target){
			clearInterval(obj.timer)
	        var speed = obj.offsetLeft < target? 30 : -30;
	        obj.timer=setInterval(function(){
	            var result = obj.offsetLeft - target;
	            obj.style.left=obj.offsetLeft + speed +"px"
	            if(Math.abs(result) <= 30){
	                clearInterval(obj.timer);
	                obj.style.left = target +"px"
	            }
	        },10)
		}
		
		//设置多个css样式
		function setGroupCss(ele,options){
			//判断json是否是对象类型
			if(Object.prototype.toString.call(options) !=='[object Object]'){
				console.log('aaaa')
				return;
			}
			//遍历options的么一项，使用setCss()一一设置
			for(var key in options){

				if(options.hasOwnProperty(key)){
					setCss(ele,key,options[key])
				}
			}
		}
		//设置单个css样式
		function setCss(ele,attr,value){
			 //设置float
			 if(attr === 'float'){
			 	ele['style']['cssFloat'] = value;
			 	ele['style']['styleFloat'] = value;
			 	return;
			 };
			 //设置opacity
			 if(attr === 'opacity'){
			 	console.log(111)
			 	ele['style']['opacity'] = value;
			 	ele['style']['filter'] = 'alpha(opacity='+ value*100+')';
			 	return;
			 };
			//传递的value需要加单位的自动补充上；
			var reg = /^(width|height|top|bottom|left|right|((margin|pading)(Top|Bottom|Left|Right)?))$/;
			if(reg.test(attr)){
				//如果传递的value没有加单位就补充上单位；如果加了单位就不再处理
				if(!isNaN(value)){  //判断value是否是一个有效数字，如果是有效数字，就加单位
					value += 'px'; 
				}
			}
			ele['style'][attr] = value;
		}


	}
