//��ʽ������
function formatNum(num,cnt) {
	var f = parseFloat(num);
	if(cnt<0){
		cnt=0;
	}
	return f.toFixed(cnt);
}
//����Ƿ�����
function isNumberic(num){
	if (num == null || num == '' || num.length <= 0) {
		return false;
	}
	var numChar = "0123456789";
	var i;
	for( i = 0; i < num.length;i++)
	{
		if( numChar.indexOf(num.substring(i,i+1)) == -1 )
			return false;	
	}
	return true;
}

//ʵʱ��ȡ��������
function getBusiCgtLmt(url,obj,func) {
	$.ajaxLoad({
	    //�����urlΪxxx.do�������һ��method�Ĳ���
	    url:url, 
	    callback:function(data) {
	        func(data,obj);
	    },
	    dataType:"json",
	    type:"post"
	});
}
//����ʵʱ��ȡ��������
function getBusiCgtLmtPL(url,func) {
	$.ajaxLoad({
	    //�����urlΪxxx.do�������һ��method�Ĳ���
	    url:url, 
	    callback:function(data) {
	        func(data);
	    },
	    dataType:"json",
	    type:"post"
	});
}
//��ȡ�������
function getAcc(url,func){
	$.ajaxLoad({
	    //�����urlΪxxx.do�������һ��method�Ĳ���
	    url:url, 
	    callback:function(data) {
			func(data);
	    },
	    dataType:"text",
	    type:"post"
	});
}
//���»�ȡ���ۻ���������
function getCurCgtLmtPL(url,func) {
	$.ajaxLoad({
	    //�����urlΪxxx.do�������һ��method�Ĳ���
	    url:url, 
	    callback:function(data) {
	        func(data);
	    },
	    dataType:"json",
	    type:"post"
	});
}
//������̰����¼�
function doKeyDown() {
	var evt=getEvent();
	var obj = evt.srcElement || evt.target;
	var dataBox = document.getElementById("cgt");
	//��ȡ��ǰ�к�
	var row = obj.parentElement.parentElement.rowIndex;
	//������س������¼�����������һ��
	if (evt.keyCode == 13 || evt.keyCode == 40){//�س������¼�
		if (row < dataBox.rows.length-2) {
			$("input[name=req_qty]")[row].select();
			$("input[name=req_qty]")[row].focus();
		} else {//��������һ�У���ʧȥ����
			evt.keyCode = 9;
		}
	} else if (evt.keyCode == 38){//��������ϼ�����������һ��
		if (row > 1) {
			$("input[name=req_qty]")[row-2].select();
			$("input[name=req_qty]")[row-2].focus();
		}
	}
}
//��ȡ�¼�
function getEvent() {
	if(document.all) {
		return window.event;//�����ie
	}
	func=getEvent.caller;
	while(func!=null) {
		var arg0=func.arguments[0];
		if(arg0) {
			if((arg0.constructor==Event || arg0.constructor ==MouseEvent)
			||(typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation))
			{
				return arg0;
			}
		}
		func=func.caller;
	}
	return null;
}

//��ȡ�¼�����
function getEventObj() {
	var evt=getEvent();
	var obj = evt.srcElement || evt.target;
	return obj;
}

//ɾ������
function delCgt(obj) {
	var dataBox = document.getElementById("cgt");
	var i = obj.parentElement.parentElement.rowIndex;//ͼƬ��ť->td->tr->rowIndex
	//��ȡ��ǰ�о�����Ϣ
	var cgtName = dataBox.rows[i].cells[7].children[3].value;
	if( !confirm( "��ȷ��Ҫɾ�����̡�"+cgtName+"��?") ){
		return ;
	}
	//ɾ����
	var row = dataBox.rows[i];
	var par = row.parentNode;
	//dataBox.rows[i].removeNode(true);
	par.removeChild(row);
	//���¼���ϼ�
	calSum();	
}
