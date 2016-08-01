// JavaScript Document
//返回顶部
function returnTop(speed){
	$('body,html').animate({scrollTop:0},speed);
	}

/*****从语法上来开，Javascript中分号表示语句结束，在开头加上，是为了压缩的时候和别的方法分割一下，表示一个新的语句开始。所以，如果在一个单独的JS文件中，开头的分号是没有任何意义的，可以删掉。
*叹号是逻辑运算符，是"非"的意思，常见这种写法 if(!true){}；而将运算符加载函数定义的前面，则是将函数看做一个整体，然后再调用这个函数，并对返回的结构进行逻辑运算。
*说白了，此处就是构建了一个立即执行函数，建议楼主知道意思就可以，自己写的时候，可以使用更清晰的格式：
*(function(){})();*****/
$(function(){
	/*****去首页外其他页面，收起，打开商品分类****/
 	$("#category").mouseover(function(){
		$("#mainMenu").show();});
	$("#category").mouseleave(function(){
		$("#mainMenu").hide();});
	
	})
;
//收藏本站js方法begin
function AddFavorite(sURL, sTitle) {
            try {
                window.external.addFavorite(sURL, sTitle);
            }
            catch (e) {
                try {
                    window.sidebar.addPanel(sTitle, sURL, "");
                }
                catch (e) {
                    alert("加入收藏失败，请使用Ctrl+D进行添加");
                }
            }
        }
//收藏本站js方法end

/*********
*查询url后的字符串参数
*李飞
*20141126
*
**********/
function getQueryArgs(){
	//取得查询字符串并去掉开头的问号
	var qs = (location.search.length > 0 ? location.search.substring(1):""), args = {},
	items = qs.length?qs.split("&"):[],item = null, name = null,value = null,i=0, len = items.length;
	//逐个将每一项添加到args对象中
	for(i=0; i<len;i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if(name.length){
			args[name] = value;
			}
		}
		return args;
		}
//end

/*******iframe 高度自适应 begin
*(chrome浏览器在本机调试存在问题，高度无法自适应，放到服务器即可；对于ie浏览器8及以前版本，iframe所在父级div默认是隐藏的，导致所获取的iframe高度值为0，
*需要添加额外的周期执行的循环代码，window.setInterval进行循环条用，当父级div为显示状态时，可获取正常高度值；ie9及以上版本不存在此问题)
*怎对ie存在的问题添加次代码：<!--[if IE]> <script>window.setInterval("iFrameHeight('itemDealRecords')", 300);</script> <![endif]-->
*****/
function iFrameHeight(id) {
var ifm= document.getElementById(id); 

var subWeb = document.frames ? document.frames[id].document : ifm.contentDocument;
if(ifm != null && subWeb != null && subWeb.body!=null) {
/*******
IE : document.documentElement.scrollHeight = document.body.scrollHeight + marginTop bottom高度 + 上下border宽度
 chrome : document.documentElement.scrollHeight = document.body.scrollHeight + marginTop bottom高度
当动态改变iframe内部src连接地址时：
chrome下：如果初始内容高度是500,设置的iframe高度是500，改变连接时，1）如果新的内容是300，这时候iframe高度不变，还是原来的500，但此时bHeight>dHeight，dHeight是新内容的高度；
2）如果新的内容是600，iframe的高度会被动态设置为600；此时，bHeight==dHeight，都是新内容的高度；
ie下：如果初始内容高度是500,设置的iframe高度是500，改变连接时，1）如果新的内容是300，这时候iframe高度不变，还是原来的500，但此时bHeight<dHeight，bHeight是新内容的高度；
2）如果新的内容是600，iframe的高度会被动态设置为600；此时，bHeight<dHeight,差距不大，均可作为新内容的高度;
总结：设置两者中的最小值基本都没问题
*********/
var bHeight = subWeb.body.scrollHeight;
var dHeight = subWeb.documentElement.scrollHeight;
ifm.height = Math.min(bHeight, dHeight);
} 
}  
//iframe 高度自适应 end



(function($, window, document, undefined) {
	var $window = $(window);
	/*
	 * lifei
	 *20141015
	 * 放大镜效果
	 *比例关系：大图/显示大图的外框=小图/放大镜（mark）
	 */
	 //放大镜方法begin
	$.fn.magnifyGlass = function(options){
		//支持匹配的第一个元素，宽度高度值是按照对应比例计算出来的高度
		var element = $(this[0]);
		var settings = {
            mark  : "mark",//放大镜的id
            specBig  : "specBig",//大图片所在div的id
			imgWidth: 800,//大图片宽度
			imgHeight:800//大图片高度
        };
		if(options){$.extend(settings, options);}
		var mouseX = 0;		//鼠标移动的位置X
		var mouseY = 0;		//鼠标移动的位置Y
		var maxLeft = 0;	//最右边
		var maxTop = 0;		//最下边
		var markLeft = 0;	//放大镜移动的左部距离
		var markTop = 0;	//放大镜移动的顶部距离
		var perX = 0;	//移动的X百分比
		var perY = 0;	//移动的Y百分比
		var bigLeft = 0;	//大图要移动left的距离
		var bigTop = 0;		//大图要移动top的距离
		
		//添加放大镜mark
		element.append('<span '+'id=\"'+settings.mark+'\"></span>');
		
		
		//改变放大镜的位置
		function updateMark($mark){
		//通过判断，让小框只能在小图区域中移动		
		if(markLeft<0){
			markLeft = 0;
		}else if(markLeft>maxLeft){
			markLeft = maxLeft;
		}
		
		if(markTop<0){
			markTop = 0;
		}else if(markTop>maxTop){
			markTop = maxTop;
		}
		
		//获取放大镜的移动比例，即这个小框在区域中移动的比例
		perX = markLeft/element.outerWidth();
		perY = markTop/element.outerHeight();
		
		bigLeft = -perX*$("#"+settings.specBig+ " img").outerWidth();
		bigTop = -perY*$("#"+settings.specBig+ " img").outerHeight();
		
		//设定小框的位置
		$mark.css({"left":markLeft,"top":markTop,"display":"block"});
		}
	
	
		//改变大图的位置
		function updateBig(){
		$("#"+settings.specBig).css({"display":"block"});
		$("#"+settings.specBig+ " img").css({"left":bigLeft,"top":bigTop});
		}
	
		//鼠标移出时
		function cancle(){
		$("#"+settings.mark).css({"display":"none"});
		$("#"+settings.specBig).css({"display":"none"});
		}
		
		//鼠标移入时，更新大图片的连接
		function imgMouseEnter(){
		//获取图片链接
		var imgSrc = element.children('img').attr('src');
		//添加新图片前，先删除原有图片
		var objSpecBig = element.find('#'+settings.specBig);
		if(objSpecBig){objSpecBig.remove();}
		//添加大图片
		element.append('<div '+'id=\"'+settings.specBig+'\">'+'<img '+'width=\"'+settings.imgWidth+'\" '+' height=\"'+settings.imgHeight+'\" '+' src=\"'+imgSrc+''+' \"/></div>');
			}
	
		//鼠标小图上移动时
		function imgMouseMove(event){
		var $this = $(this);
		var $mark = $(this).children("#"+settings.mark);
		
		//鼠标在小图的位置
		mouseX = event.pageX-$this.offset().left - $mark.outerWidth()/2;
		mouseY = event.pageY-$this.offset().top - $mark.outerHeight()/2;
		
		
		//最大值
		maxLeft =$this.width()- $mark.outerWidth();
		maxTop =$this.height()- $mark.outerHeight();
		markLeft = mouseX;
		markTop = mouseY;
		
		updateMark($mark);
		updateBig();
		}
	
		element.bind("mouseenter",imgMouseEnter).bind("mousemove",imgMouseMove).bind("mouseleave",cancle);
	
		return this;
		};
		//放大镜方法end
		
		/*
		 * lifei
		 *20141015
		 * 选中切换,商品明细下的小图，鼠标经过时,默认选中图片变化,同事主图的连接也同时变化
		 *对象需要是img
		 *供商品明细页使用
		 */
		$.fn.imgSelectedTab = function(options){
			var settings = {
			mainImgId : "mainImg",//商品主图img的id
            eventType  : "mouseenter",//切换的时间类型，默认是鼠标移入事件
			defaultStyle : "hover"  //默认的样式类，选中状态样式为hover
        };
		if(options){$.extend(settings, options);}
		 	var elements = this;//dom元素，调用jQuery扩展方法的对象数组
			var $elements = $(this);//jquery对象数组
			function selTab(){
				$element = $(this);//调用方法的对像
				$elements.removeClass(settings.defaultStyle);//移除所有元素默认样式
				$element.addClass(settings.defaultStyle);//给事件源对象添加默认样式
				if($element.attr('data-url')){$('#'+settings.mainImgId).attr('src',$element.attr('data-url'));}//更新主图片的连接
				}
			$elements.bind(settings.eventType,selTab);
			return this;
			};
			/*end*/
			
		/*
		 * lifei
		 *20141015
		 * 选中切换,针对任何对象
		 *
		 */
		$.fn.selectedTab = function(options){
			var settings = {
            eventType  : "mouseenter",
			defaultStyle : "hover"
        };
		if(options){$.extend(settings, options);}
		 	var elements = this;
			var $elements = $(this);
			function selTab(){
				$elements.removeClass(settings.defaultStyle);
				$(this).addClass(settings.defaultStyle);
				}
			$elements.bind(settings.eventType,selTab);
			return this;
			};
		/*end*/
		
		/*
		 * lifei
		 *20141015
		 * 类似购物车数量自增减方法
		 *
		 */
		$.fn.plusOrMinus = function(){
			var elements = this;//dom元素，调用jQuery扩展方法的对象数组
			var $elements = $(this);//jquery对象数组
			//正整数正则表达式
			var r = /^\+?[1-9][0-9]*$/;
			$elements.each(function(){
				var element = $(this);
				//数量输入框添加时间，判断是否是正整数
				element.find('input').blur(function(){
					var sum = $(this).val();
					if(!r.test(sum)){
					$(this).val(1);
						}
					});
				//给增减按钮添加事件
				element.find('a').click(function(){
					var className = this.className;
					var count = element.find('input').val();
					var objInput = element.find('input');
					if(r.test(count)){
					if(className.indexOf("minus")!=-1&&count>1){
			 		objInput.val(--count);
						}
						if(className.indexOf("plus")!=-1){
						 objInput.val(++count);
						}
						}else{objInput.val(1);}
					});
				});
				
			return this;
			}
	
		/*end*/
		
		/*
	 * lifei
	 *20141015
	 * 鼠标滚动到某个位置时，设置元素固定不动，可灵活定制
	 *距离上，下多少距离是定位
	 *需要定位的元素自身的id，元素父级的parentId（位置固定，不会随滚动改变自身定位属性，作为何时改变子元素为fixed的依据）
	 */
	$.fn.setFixed = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
            //parentId  : "parentId",//父级元素id
			//targetId : "targetId",//需要定位的元素id
			distance :0,//偏离距离
			direction : 'up',//支持up 或 below两种状态
			position: 'fixed'
        };
		if(options){$.extend(settings, options);}
		
		$window.scroll(function(){
			$elements.each(function(){
				var self = this;
           		var $self = $(self);//目标元素
				if(settings.direction=='up'){
					var fold = $window.scrollTop();
					if(fold >= $self.parent().offset().top + settings.distance){
								$self.css({'position':settings.position});
								}else{
								$self.css({'position':'static'});
								}
					}else if(settings.direction=='below'){
							var fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
							if(fold <= $self.parent().offset().top + settings.distance){
								$self.css({'position':settings.position});
								}else{
								$self.css({'position':'static'});
								}
						}
				});
			});

		
		return this;
		}
	/*end*/
	
	
		
		/*
	 * lifei
	 *20141020
	 * 超出时显示横向或纵向滚动条，内部内容宽度需要动态设置宽度和高度
	 *
	 */
	 $.fn.setOverflowXY = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			shaft :'x',//支持x 或 y两种状态,横向或纵向
			tagName : 'li'//标签名称，默认是li，也可以是div或者其他html标签
        };
		if(options){$.extend(settings, options);}
		//宽度或者高度值
		var wh = 0;
		var targetSum = 0;
		$elements.each(function (){
			var $targetObj = $(this).children(settings.tagName);
			if(settings.shaft=='x'){
				$targetObj? wh = $targetObj.outerWidth():0;//元素宽度值
				$targetObj? targetSum = $targetObj.length:0;//元素个数
				$(this).width(wh*targetSum);
				}
			 if(settings.shaft=='y'){
				$targetObj? wh = $targetObj.outerHeight():0;//元素宽度值
				$targetObj? targetSum = $targetObj.length:0;//元素个数
				$(this).height(wh*targetSum);
				}
 			//alert($(this).children(settings.tagName).outerWidth());
			});
		
		return this;
	 }
	 //end	
		
		
	/*
	 * lifei
	 *20141020
	 * 二级下拉菜单toggle
	 *展开的内容元素要在事件标签元素的父级标签元素内
	 */
	  $.fn.toggleMenu = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			hover :'hover',//展开时的样式类名，注意：根据事件标题对象的样式判断内容是展开还是隐藏，内容展开的样式类名
			hoverT:'show',//事件对象样式类名
			styleClass:'.showOrhide',//收起或展开内容的标签样式类,样式级别要低于hover
			only:'more',
			eventType : 'click'//jQuery的事件类型
        };
		if(options){$.extend(settings, options);}
		
		$elements.each(function(){
			var className;
			$(this).bind(settings.eventType,function(){
				//当对象没有设置样式类时，给变了className设置为'',调用indexOf方法时不会报错;
				this.className ? className = this.className: className='';
				if(settings.only=='more'){
					if(className.indexOf(settings.hoverT)!=-1){
						$(this).parent().find(settings.styleClass).removeClass(settings.hover);
						$(this).removeClass(settings.hoverT);
					//$(this).parent().find(settings.styleClass).hide();当用hide隐藏元素时会存在问题，当用show()显示出来时，块元素的高度值等属性会不起作用
						}else{
							$(this).parent().find(settings.styleClass).addClass(settings.hover);
							$(this).addClass(settings.hoverT);
							}
					}else{
						$(this).parent().parent().find(settings.styleClass).removeClass(settings.hover);
						$(this).parent().parent().find('.'+settings.hoverT).removeClass(settings.hoverT);
						$(this).parent().find(settings.styleClass).addClass(settings.hover);
						$(this).addClass(settings.hoverT);
						}
				});
			});
		}
	 //end
	 
	 /*
	 * lifei
	 *20141023
	 * checkbox复选框级联选中,最多支持3级，如果需要可在进行扩展
	 *IE10，Chrome,FF中，对于选中状态，第一次$('#checkbox').attr('checked',true)可以实现
	 *但是当通过代码清除选中，下次再通过代码 $('#checkbox').attr('checked',true) 去选中时
	 *虽然代码中有checked='checked',但是画面表现都没有打勾。
	 *IE8，IE6下无此问题。后来调查了相关的资料，发现在jquery1.9.1中，attr('checked',true)都换成prop('checked',true)
	 */
	  $.fn.cascadeCheckbox = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			selector:'[data-name^=grand]:checkbox',//选择器
			mark : '-',//分隔符
			dataPro : 'data-name',//自定义属性名称，复选框自定义属性名称需要按照指定规则，否则方法调用无效，例：顶级（1个）：grand  中间级（多个）：grand-parent1、grand-parent2  末级（多个，同父级下命名相同）：grand-parent1-child、grand-parent2-child
			eventType : 'click',//事件类型
			styleClass : 'hover',//选中行的样式类
			flag : false,//是否需要设置选中时的背景样式
			pStyleClass : '.default',//需要设置背景颜色的父级样式类
			FUNC:function(){}//函数，执行完全选相应操作后执行的函数
        };
		if(options){$.extend(settings, options);}
		$elements.delegate(settings.selector,settings.eventType,function(){
			var str = $(this).attr(settings.dataPro);
			var arr =  str.split(settings.mark);
			var len = arr.length;
			var flag;
			if(len==1){//顶级,只需要管理下级是否选中
				$("["+settings.dataPro+"^='"+arr[0]+"']:checkbox").prop("checked", this.checked);
				if(settings.flag){
						if(this.checked){
						$("["+settings.dataPro+"^='"+arr[0]+"']:checkbox:checked").parents(settings.pStyleClass).addClass(settings.styleClass);
						}else{
							$("["+settings.dataPro+"^='"+arr[0]+"']:checkbox:not(:checked)").parents(settings.pStyleClass).removeClass(settings.styleClass);
							}
					}
				
			}
			if(len==2){//中间级，需要管理子级及父级，当中间级选中数与本身复选框数目相同时设置父级选中，父级状态即$("["+settings.dataPro+"^='"+arr[0]+settings.mark+"']:checked").length==$("["+settings.dataPro+"^='"+arr[0]+settings.mark+"']:checkbox").length返回值
				$("["+settings.dataPro+"^='"+arr[0]+settings.mark+arr[1]+settings.mark+"']:checkbox").prop("checked", this.checked);
				
				$("["+settings.dataPro+"='"+arr[0]+"']:checkbox").prop("checked", $("["+settings.dataPro+"^='"+arr[0]+settings.mark+"']:checked").length==$("["+settings.dataPro+"^='"+arr[0]+settings.mark+"']:checkbox").length);	
				
				if(settings.flag){
						if(this.checked){
						$("["+settings.dataPro+"^='"+arr[0]+settings.mark+arr[1]+settings.mark+"']:checkbox:checked").parents(settings.pStyleClass).addClass(settings.styleClass);
						}else{
							$("["+settings.dataPro+"^='"+arr[0]+settings.mark+arr[1]+settings.mark+"']:checkbox:not(:checked)").parents(settings.pStyleClass).removeClass(settings.styleClass);
							}
					}
	
				}
			if(len==3){//末级，只需要管理父级状态，先设置父级状态，在依次设置顶级状态
				$("["+settings.dataPro+"='"+arr[0]+settings.mark+arr[1]+"']:checkbox").prop("checked", $("["+settings.dataPro+"^='"+arr[0]+settings.mark+arr[1]+settings.mark+"']:checked").length==$("["+settings.dataPro+"^='"+arr[0]+settings.mark+arr[1]+settings.mark+"']:checkbox").length);
				$("["+settings.dataPro+"='"+arr[0]+"']:checkbox").prop("checked", $("["+settings.dataPro+"^='"+arr[0]+settings.mark+"']:checked").length==$("["+settings.dataPro+"^='"+arr[0]+settings.mark+"']:checkbox").length);
				if(settings.flag){
						if(this.checked){
						$(this).parents(settings.pStyleClass).addClass(settings.styleClass);
						}else{
							$(this).parents(settings.pStyleClass).removeClass(settings.styleClass);
							}
					}
				
				}
				if(typeof settings.FUNC =='function'){
				settings.FUNC();
				}
			});
			if(typeof settings.FUNC =='function'){
				settings.FUNC();
				}
		return this;
		}
	 //end
	 
	 /*
	 * lifei
	 *20141030
	 * 单选按钮选中设置背景色
	 *
	 */
	  $.fn.setStyleRadio = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			selector:'input:radio',//选择器
			hover :'hover',//背景样式类
			styleClass:'.parent',//父级具有的样式属性,通过此属性选择父级
			eventType : 'click'//jQuery的事件类型
        };
		if(options){$.extend(settings, options);}
		$elements.delegate(settings.selector,settings.eventType,function(){
			if(settings.styleClass==".parent"){
				$elements.find(settings.selector).parent().removeClass(settings.hover);
				$(this).parent().addClass(settings.hover);
				}else{
					$elements.find(settings.selector).parents(settings.styleClass).removeClass(settings.hover);
					$(this).parents(settings.styleClass).addClass(settings.hover);
					}
			
			});
		}
	 //end
	 
	
	 
	  /*
	 * lifei
	 *20141103
	 * 星级评价
	 *规则：五角星与显示评分的元素需要在事件源对象下面，星的默认样式是灰色的，只需控制彩色的样式类即可
	 */
	  $.fn.starComment = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			styleClass:'star',//五角星的样式类
			defaultStar:5,//默认的星级评价,全星评价为整数，半星级可以是小数4.5这种(基本可以满足电商需要)0-5
			scale:1,//星级与分值间的比例关系
			defineAttr : 'data-level',//自定义属性
			defineClass : 'data-class',//自定义属性,存放激活后五角星的样式类，每个星的样式可以通过自身的自定义属性 defineClass 获取
			score :'score',//显示分值元素样式类边即可
			isHalf: 1 //1：时候是不支持半颗星，2：时候支持半颗星
        };
		if(options){$.extend(settings, options);}
		$elements.each(function(){
			var temp = settings.defaultStar*settings.isHalf;//临时变量，点击星级时改变其值，必须通过each这种方式在函数中定义的变量，temp之间才互不影响。$elements.bind();这种方式绑定的函数中，变量不是独立的
			var $targetObj = $(this);//事件对象
			var $starsObjs = $targetObj.find('.'+settings.styleClass);//星级对象
			$($starsObjs[temp-1]).addClass($($starsObjs[temp-1]).attr(settings.defineClass));
			$($starsObjs[temp-1]).prevAll('.'+settings.styleClass).each(function(){
				$(this).addClass($(this).attr(settings.defineClass));
				});
			$($starsObjs[temp-1]).nextAll('.'+settings.styleClass).each(function(){
				$(this).removeClass($(this).attr(settings.defineClass));
				});
				//初始化评分数据
				$targetObj.find("input[class*='"+settings.score+"']").val(temp*settings.scale/settings.isHalf+'');
				$targetObj.find('.'+settings.score+':not(input)').html(temp*settings.scale/settings.isHalf+'');		
			$targetObj.bind('mouseleave',function(){
				$starsObjs.each(function(){
				$(this).removeClass($(this).attr(settings.defineClass));
				});
				$($starsObjs[temp-1]).addClass($($starsObjs[temp-1]).attr(settings.defineClass));
				$($starsObjs[temp-1]).prevAll('.'+settings.styleClass).each(function(){
				$(this).addClass($(this).attr(settings.defineClass));
				});
				$targetObj.find("input[class*='"+settings.score+"']").val(temp*settings.scale/settings.isHalf+'');
				
				$targetObj.find('.'+settings.score+':not(input)').html(temp*settings.scale/settings.isHalf+'');	
				});
				
			$starsObjs.bind('mouseenter',function(){
				$starsObjs.each(function(){
				$(this).removeClass($(this).attr(settings.defineClass));
				});
				
				$(this).addClass($(this).attr(settings.defineClass));
				$(this).prevAll('.'+settings.styleClass).each(function(){
				$(this).addClass($(this).attr(settings.defineClass));
				});
				$targetObj.find("input[class*='"+settings.score+"']").val($(this).attr(settings.defineAttr)*settings.scale+'');
				
				$targetObj.find('.'+settings.score+':not(input)').html($(this).attr(settings.defineAttr)*settings.scale+'');
				
				}).bind('click',function(){
					temp=$(this).attr(settings.defineAttr)*settings.isHalf;
					});
								
			});
		}
	 //end
	 
	 
	  /*
	 * lifei
	 *20141105
	 * input文本输入框，鼠标聚焦离开时设置默认值
	 *
	 */
	  $.fn.placeholder = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			defaultColor :'999',//默认字体颜色
			activeColor:'666'//输入时的字体颜色
        };
		
		if(options){$.extend(settings, options);}
		$elements.each(function(){
			var $targetObj = $(this);
			var temp=$targetObj.val();//每个绑定的函数有单独的temp变了，互不影响
			$targetObj.css('color','#'+settings.defaultColor);//调用了此方法的input设置默认字体颜色值，可不用在样式表里在设置默认字体样式，直接条用js传入对应的字体颜色值即可。
			$targetObj.bind('focus',function(){
				if(temp==$targetObj.val()){
					$targetObj.val('');
					$targetObj.css('color','#'+settings.activeColor);
					}
				}).bind('blur',function(){
					if($targetObj.val().trim()==''||$targetObj.val().trim()==null){
						$targetObj.val(temp);
						$targetObj.css('color','#'+settings.defaultColor);
						}
					});
			 
			});
		}
	 //end
	 
	  /*
	 * lifei
	 *20141201
	 * input文本输入框,针对邮箱输入，根据信息内容动态提示
	 *
	 */
	  $.fn.inputPrompt = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var $element = $(this[0]);//获取一个jquery对象
		var settings = {
			title:'请选择邮箱后缀',
			titleSty:'AutoComplete_title',
			hzArr:['@qq.com','@163.com','@126.com','@sohu.com','@sina.com'],
			promptId:'AutoComplete',
			hover:'hover'
        };
		if(options){$.extend(settings, options);}
		
		var autoComplete,autoLi;
		var strHtml = [];
		strHtml.push('<div id=\"'+settings.promptId+'\">');
		strHtml.push('	<ul>');
		strHtml.push('		<li class=\"'+settings.titleSty+'\">'+settings.title+'</li>');
		for(var i=0;i<settings.hzArr.length;i++){
			strHtml.push('		<li hz=\"'+settings.hzArr[i]+'\"></li>');
			}
		strHtml.push('	</ul>');
		strHtml.push('</div>');
		$('body').append(strHtml.join(''));
		
		autoComplete = $('#'+settings.promptId);
		//查询不是标题的li标签
		autoLi = autoComplete.find('li:not('+'.'+settings.titleSty+')');
		autoLi.mouseover(function(){
		//移除当前元素同级其他元素的hover选择样式类
		$(this).siblings().filter('.'+settings.hover).removeClass(settings.hover);
		//给当前元素添加选中样式类
		$(this).addClass(settings.hover);
		}).mouseout(function(){
			$(this).removeClass(settings.hover);
		}).mousedown(function(){
			//将当前li标签的值付给输入框
			$element.val($(this).text()).change();
			autoComplete.hide();
		});
		
		//邮箱名补全+翻动,同时绑定keyup事件，focus事件，当鼠标移开时提示会隐藏，文本框这时再次获取焦点，提示不显示，只能再次输入才能触发
		$element.bind("keyup focus",function(e){
			//13:enter   38:up   40:down  116:F5
			if(/13|38|40|116/.test(e.keyCode) || this.value == ''){
				return false;
			}
			var username = this.value;
			//当输入的用户名中不含@符时，不显示提示信息，这表示用户还没有输入完邮箱名称
			if(username.indexOf('@') == -1){
				autoComplete.hide();
				return false;
			}
			autoLi.each(function(){
				//@符之前的有效内容+邮箱后缀
				this.innerHTML = username.replace(/\@+.*/,'') + $(this).attr('hz');
				//当用户输入的邮箱后缀不在邮箱后缀列表范围内时，不显示提示信息例：用户输入：1111@125.com，此时拼接的提示是1111@163.com等已包含的邮箱后缀提示信息，而用户的输入不在提示信息内，不做提示，执行else代码内容
				if(this.innerHTML.indexOf(username) >= 0&&this.innerHTML!=username){
					$(this).show();
				}else{
					$(this).hide();	
				}
			}).filter('.'+settings.hover).removeClass(settings.hover);
			//设置提示信息的位置
			autoComplete.show().css({
				left: $(this).offset().left,
				top: $(this).offset().top + $(this).outerHeight(true) - 1,
				position: 'absolute',
				zIndex: '99999'
			});
			if(autoLi.filter(':visible').length == 0){
				autoComplete.hide();
			}else{
				//默认匹配第一个
				autoLi.filter(':visible').eq(0).addClass(settings.hover);			
			}
			}).keydown(function(e){
				if(e.keyCode == 38){ //上
					autoLi.filter('.'+settings.hover).prev().not('.'+settings.titleSty).addClass(settings.hover).next().removeClass(settings.hover);
				}else if(e.keyCode == 40){ //下
					autoLi.filter('.'+settings.hover).next().addClass(settings.hover).prev().removeClass(settings.hover);
				}else if(e.keyCode == 13){ //Enter
					//mousedown()会触发之前绑定到li标签上的鼠标按下函数
					autoLi.filter('.'+settings.hover).mousedown();
					e.preventDefault();	//如有表单，阻止表单提交
				}
			}).blur(function(){
				autoComplete.hide();
			});
		}
	 //end
	 
	 
	 /*
	 * lifei
	 *20150129
	 * 限时抢购，倒计时扩展插件，事件元素上具有data-beginT，data-endT自定义属性，用于存放开始与结束时间
	 *
	  $.fn.countDown = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			dataBegin:'data-beginT',//活动开始时间自定义属性,格式："2014-10-01 00:00:21"
			dataEnd:'data-endT',//活动结束时间自定义属性
			auto:true,//是否自动触发，现在无用
			parentClass:'limit',//限时抢购组件父级样式类名
			btnClass:'btnS',//限时抢购对应的按钮样式类，活动结束置不可用
			dtClass:'countDownDt',//标题类名
			ddClass:'countDownDd'//显示内容类名
        };
		if(options){$.extend(settings, options);}
		var beginT=0,endT=0;//变量均为公用变量，不单独存在
		//补零
			nol = function(h){
					return h>9?h:'0'+h;
				};
			reflash = function($ddObj,range){
				if(range>0){
					days 	= parseInt(range/86400),
					hours	= parseInt((range%86400)/3600),
					mins	= parseInt(((range%86400)%3600)/60),
					sec		= parseInt(((range%86400)%3600)%60); 
					$ddObj.find(".days").html(nol(days));
					$ddObj.find(".hours").html(nol(hours));
					$ddObj.find(".mins").html(nol(mins));
					$ddObj.find(".sec").html(nol(sec));
					
					}else{
						$ddObj.parent().html("活动结束！");
						$ddObj.parents('.'+settings.parentClass).find('.'+settings.btnClass).css({'background-color':'#f7f7f7 !important','cursor':'default !important','color':'#999 !important'}).attr("disabled", true);
						clearInterval(TIMER);
						}
				}
			$elements.each(function(){
			var $targetObj = $(this);
			var $ddObj = $targetObj.find('.'+settings.ddClass);
			var $dtObj = $targetObj.find('.'+settings.dtClass);
			 var TIMER;//结束间歇执行函数变量。
			 var range=0;//此处变量均是独立存在的，不同对象调用方法时，均会有自己的变量，互不影响
			beginT = $targetObj.attr(settings.dataBegin).replace(/-/g,"/");
			endT = $targetObj.attr(settings.dataEnd).replace(/-/g,"/");
			beginT = Math.round((new Date(beginT)).getTime()/1000);
			endT = Math.round((new Date(endT)).getTime()/1000);
			range = endT - beginT;
			$ddObj.append("<ul><li class='days'></li><li class='split'>天</li><li class='hours'></li><li class='split'>:</li><li class='mins'></li><li class='split'>:</li><li class='sec'></li></ul>");
			//初始化
			reflash($ddObj,range);
			//setInterval(reflash(),1000)这么写是错误的，函数reflash不能加"()"(即不能给这种调用传参数),加了只执行一次，并且跟后面的时间无关；正确写法：setInterval(reflash,1000);
			//可以使用匿名函数包装，如下所示，在匿名函数里面调用函数，传递参数
			TIMER = setInterval(function(){
				range--;
				reflash($ddObj,range);
					}
					,1000);
					
			});
		}
	 //end
	 
	 ***/
	 
	 /*
	 * lifei
	 *20150129
	 * 限时抢购，倒计时扩展插件，事件元素上具有data-nowT,data-beginT，data-endT自定义属性，用于存放开始与结束时间
	 *
	 */
	$.fn.countDown = function(options){
		var elements = this;//dom元素，调用jQuery扩展方法的对象数组
		var $elements = $(this);//jquery对象数组
		var settings = {
			dataNow:'data-nowT',//当前时间,格式："2014-10-01 00:00:21"
			dataBegin:'data-beginT',//活动开始时间自定义属性,格式："2014-10-01 00:00:21"
			dataEnd:'data-endT',//活动结束时间自定义属性
			flag:true,//表示支持开始结束时间，false表示支持现在，开始，结束三个时间
			parentClass:'limit',//限时抢购组件父级样式类名
			btnClass:'btnS',//限时抢购对应的按钮样式类，活动结束置不可用
			dtClass:'countDownDt',//标题类名
			ddClass:'countDownDd'//显示内容类名
        };
		if(options){
			$.extend(settings, options);
		}
		var nowT=0, beginT=0,endT=0;//变量均为公用变量，不单独存在
		//补零
		nol = function(h){
			return h>9?h:'0'+h;
		};
		reflash = function($ddObj,$dtObj,range,status,TIMER){
			if(status=='1'){$dtObj.html('距活动结束：');}
			if(status=='2'){$dtObj.html('距活动开始：');}
			if(status=='3'){$dtObj.html('距活动结束：');}
			if(range>0){
				days 	= parseInt(range/86400),
				hours	= parseInt((range%86400)/3600),
				mins	= parseInt(((range%86400)%3600)/60),
				sec		= parseInt(((range%86400)%3600)%60); 
				$ddObj.find(".days").html(nol(days));
				$ddObj.find(".hours").html(nol(hours));
				$ddObj.find(".mins").html(nol(mins));
				$ddObj.find(".sec").html(nol(sec));				
			}else{
				if(status=='1'){$ddObj.parent().html("活动结束！");}
				if(status=='2'){}
				if(status=='3'){$ddObj.parent().html("活动结束！");}
				$ddObj.parents('.'+settings.parentClass).find('.'+settings.btnClass).css({'background-color':'#f7f7f7 !important','cursor':'default !important','color':'#999 !important'}).attr("disabled", true);
				clearInterval(TIMER);
			}
		}				
		$elements.each(function(){
			var $targetObj = $(this);
			var $ddObj = $targetObj.find('.'+settings.ddClass);
			var $dtObj = $targetObj.find('.'+settings.dtClass);			 
			var range1=0,range2=0,range3=0;//此处变量均是独立存在的，不同对象调用方法时，均会有自己的变量，互不影响
			nowT = $targetObj.attr(settings.dataNow).replace(/-/g,"/");
			beginT = $targetObj.attr(settings.dataBegin).replace(/-/g,"/");
			endT = $targetObj.attr(settings.dataEnd).replace(/-/g,"/");
			nowT = Math.round((new Date(nowT)).getTime()/1000);
			beginT = Math.round((new Date(beginT)).getTime()/1000);
			endT = Math.round((new Date(endT)).getTime()/1000);
			range1 = beginT - nowT;
			range2 = endT - beginT;
			range3=endT-nowT;			
			$ddObj.append("<ul><li class='days'></li><li class='split'>天</li><li class='hours'></li><li class='split'>时</li><li class='mins'></li><li class='split'>分</li><li class='sec'></li><li class='split'>秒</li></ul>");
			if(settings.flag){
				reflash($ddObj,$dtObj,range2,'1');
				var TIMER2 = setInterval(
					function(){
						range2--;
						reflash($ddObj,$dtObj,range2,'1',TIMER2);
					},1000
				);
			}else{
				if(range3<=0){
					//抢购已经结束
					$ddObj.parent().html("活动结束！");
				}else{
					if(range1>0 & range2>0){
						reflash($ddObj,$dtObj,range1,'2');
						var TIMER = setInterval(function(){
							range1--;
							if(range1<=0){
								reflash($ddObj,$dtObj,range2,'3');
								var TIMER2 = setInterval(
									function(){
										range2--;
										reflash($ddObj,$dtObj,range2,'3',TIMER2);
									},1000
								);
							}				
							reflash($ddObj,$dtObj,range1,'2',TIMER);
						},1000);
					}else if(range1==0 & range2>0){
						reflash($ddObj,$dtObj,range2,'3');
						var TIMER2 = setInterval(
							function(){
								range2--;
								reflash($ddObj,$dtObj,range2,'3',TIMER2);
							},1000
						);
					}else if(range1<0 & range2>0){ 
						reflash($ddObj,$dtObj,range3,'3');
						var TIMER2 = setInterval(
							function(){
								range3--;
								reflash($ddObj,$dtObj,range3,'3',TIMER2);
							},1000
						);
					}				
				}				
			}					
		});
	}
	 //end
	
	 
	 
	 
	 
	})(jQuery, window, document);
