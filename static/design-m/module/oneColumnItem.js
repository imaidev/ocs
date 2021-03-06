(function($){
    var g = {
        config: function($el){
            return moduleTool.config($el);
        },
        reset: function($el, opts){
            moduleTool.reset($el, opts, render);
        },
        run: function($el){
            moduleTool.run($el, render);
        },
        init: function($el){
            moduleTool.init($el, render);
        }
    };
    
    
    $.fn.oneColumnItem = function(oper, opts){
        if (!oper) 
            oper = "init";
        
        var operr;
        this.each(function(){
            operr = g[oper]($(this), opts);
        })
        if (operr) 
            return operr;
        
        return this;
    };
    
    
    var render = function($widget, dataval, isReset){
    
    
        if (isReset == "run") {
        
        
            if (dataval.type == "自动推荐") {
				
                autoGetItems($widget, dataval);
				if (typeof dataval.items !="undefined" && dataval.items.length > 0) {
					$widget.attr("style","display:block");
				}else{
					$widget.attr("style","display:none");
				}
            }
            else {
				if (typeof dataval.items =="undefined" || dataval.items.length == 0) {
                        $widget.attr("style","display:none")
                    }
                    else {
                        $widget.attr("style","display:block");
                        getItemIsList($widget,dataval);
                        //setItemIntoPage($widget, dataval);
                    }
            }
        }
        else 
            if (isReset == "init") {
                if (dataval.type == "自动推荐") {
					
                    autoGetItems($widget, dataval);
                    if (typeof dataval.items !="undefined" && dataval.items.length > 0) {
                        setHasData($widget);
                    }
                    else {
                        setNoData($widget);
                    }
                }
                else {
                    if (typeof dataval.items =="undefined" || dataval.items.length == 0) {
                        setNoData($widget);
                    }
                    else {
                        setHasData($widget);
                        getItemIsList($widget,dataval);
                       //setItemIntoPage($widget, dataval);
                    }
                }
                
                
                
            }
            else 
                if (isReset == "reset") {
                
                    if (dataval.type == "自动推荐") {
						
                        autoGetItems($widget, dataval);
                        if (typeof dataval.items !="undefined" && dataval.items.length > 0) {
                            setHasData($widget);
                        }
                        else {
                            setNoData($widget);
                        }
                    }
                    else {
                        if (typeof dataval.items =="undefined" || dataval.items.length == 0) {
                            setNoData($widget);
                        }
                        else {
                            setHasData($widget);
							getItemIsList($widget,dataval);//
							//setItemIntoPage($widget, dataval);
                            
                        }
                    }
                    
                }
        
        
    }
    //应用配置
    function setItemIntoPage($widget, dataval,newItem){
        if (dataval.title != "") {//若P标签中的值为“” 则会被过滤器过滤掉。
            $widget.find(".guessTit").children().text(dataval.title);//设置标题
            $widget.find(".guessTit").attr("style", "height:30px");
            $widget.find(".guessTit").children().attr("href", dataval.url);
            
        }
        else {
            $widget.find(".guessTit").children().html("&nbsp;&nbsp;");//设置标题
            $widget.find(".guessTit").attr("style", "height:0px");
        }
        var domstr = [];
        if (dataval.items == null) {
            return;
        }
        
        for (var i = 0; i < newItem.length; i++) {
            domstr.push("<div class='singleItem'>");
            domstr.push("<a href='", newItem[i].MOBILE_URL, "'>");
            domstr.push("<div class='singleItem_pic'>");
            domstr.push("<img src='", newItem[i].IMG_URL, "'>");
            domstr.push("</div>");
            domstr.push("<div>");
            domstr.push(" <span class='singleItem_title'>", newItem[i].ITEM_TITLE, "</span>");
            domstr.push("</div>");
            domstr.push("<div class='mt5'>");
            domstr.push(" <span class='fcS1'>￥", newItem[i].PRICE, "</span>");
            domstr.push("</div>");
            domstr.push("</a>");
            domstr.push("</div>");
            
        }
        var str = domstr.join("");
        $widget.find(".guessTit").next().children().remove();
        $widget.find(".guessTit").next().html(str);
    }
    function getItemIsList($widget,dataval){
        var itemId = new Array();
        for (var i = 0; i < dataval.items.length; i++) {
            itemId.push(dataval.items[i].ITEM_ID);
        }
        var url = ctx + "/design/dataAPI/item/AjaxItemInfoDataApi.do?method=getItemIsList&itemId=" + itemId.toString();
        $.ajax({
            url: url,
            type: "POST",
            success: function(data){
                //dataval.items = data.list;
                 setItemIntoPage($widget,dataval,data.list);
            },
            error: function(){
                alert("error");
            },
            dataType: "json"
        
        });
        
    }
    
    //自动推荐 ajax 
    function autoGetItems($widget, dataval){
        var keyWord = dataval.keyWord;
        var beginPrice = dataval.beginPrice;
        var endPrice = dataval.endPrice;
        var category = dataval.category;
        var itemNum = dataval.itemNum;
        var sort = dataval.sort;
        
        var url = "" + parent.ctx + "/design/dataAPI/itemList/AjaxItemListDataApi.do?method=getItemInfoSorting&vend_id=" + parent.g_vendid;
        var data = "keyWordSearch=" + keyWord + "&beginPrice=" + beginPrice + "&endPrice=" + endPrice + "&category=" + category + "&sort=" + sort + "&itemNum=" + itemNum;
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: function(data){
                if (data.list != null && data.list.length > 0) {
                   // dataval.items = data.list;
                    setItemIntoPage($widget, dataval,data.list);
                }
               
            },
            error: function(){
                alert("error");
            },
            dataType: "json",
            async: false
        
        });
    }
    
})(jQuery)
