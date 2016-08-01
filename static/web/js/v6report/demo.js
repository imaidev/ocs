$(document).ready(function(){
	var options={
		reportInfo:{
			title:"公司进销存",//不填的话取页面的$(".pageLable").text()
			parms:"单元：元、条",//一些报表的相关信息，显示在右上
			info:"济南市烟草公司、2013年1月-8月"//一些报表的相关信息，显示在左上
		},
		tableHead:{
			widthArr:[5,5,5,8,8,8,8,8,8],//20的整数倍//用于设置列宽，不设默认值为5,即100px
			data:[//表头数据，相邻的两个单元格如果名字相同会自动合并
				[{text:'公司',sortBy:'aaa'},{text:'销量',sortBy:'bbb'},{text:'销量',sortBy:'ccc'},{text:'商品',sortBy:'ddd'},{text:'销额',sortBy:'fff'},{text:'销额',sortBy:'eee'},{text:'价类',sortBy:'ggg'},{text:'毛利',sortBy:'hhh'},
						{text:'毛利'}],
				[{text:'公司',sortBy:'aaa'},{text:'今年',sortBy:'bbb'},{text:'去年',sortBy:'ccc'},{text:'商品',sortBy:'ddd'},{text:'今年',sortBy:'fff'},{text:'去年',sortBy:'eee'},{text:'价类',sortBy:'ggg'},{text:'今年',sortBy:'hhh'},
						{text:'去年',sortBy:'hhh'}]
				]
		},
		tableBody:{
			dimCloumn:[1,1,1,1,1,1,1,1,1],//1数值，0文本//用于EXCEL导出
			style:{//单元格的文字样式
				textAlign:['center','center','left','left','right','left','left','right','left']
			},
			dataUrl:"data10.txt",//通过ajax获取数据的URL
			data:"[]"//当dataUrl未设置时此参数起作用，用于非ajax取数方式
		},
		colSort:{
			defaultSortCol:{//默认第[colNum]列排序，排序方式为[type],可以不设
				colNum:1,
				type:"asc"//asc:正序，desc:倒序
			},
			canSort:[1,1,1,1,1,1,1,1,1]//设置用户可以通过点击列头进行排序的列，未设置时默认tableBody.dimCloumn中的数值列排序
		},
		colHeadFixed:{//设置表体中前[number]列进行列头锁定
			fixed:true,
			number:1
		},
		colHeadMerge:{//设置表体中前[number]列进行合并行操作，如果单元格的下方存在相同值的单元格将自动合并
			merge:false,
			number:0
		}
	}
	$("#demo").v6report(options);
})
function showDetail(key){
	alert(key);
}