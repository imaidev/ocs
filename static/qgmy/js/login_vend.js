var xmlD;
$().ready(function() {
    getAddrKids('-1', 1 , 'license_province');
    getAddrKids('-1', 1 , 'company_province');
    /* getAddrKids('-1', 1 , 'bank_province'); */
    document.getElementById("counter").innerHTML = 300 - document.getElementById("company_info").value.length;
})

/*function a (){
	var spans = $("span");
	alert(spans.length);
	for(var i=0; i<spans.length; i++){
		alert(spans[i].for);
	}
	
}*/
function getAddrKids(zoneId, level, adr) {
		    var url = "vendFactory.do?method=getAddrKids&zoneId=" + zoneId;
		    $.ajaxLoad({
		        url: url,
		        async: false,
		        callback: function(json) {
		            var zone = json.zone;
		            $.each(zone,
		            function(i, zzone) {
		                if (level == 1) {
		                    $("#"+adr).append("<option id='" + zzone.ZONE_ID + "' value='" + zzone.ZONE_ID + "'>" + zzone.ZONE_NAME + "</option>");

		                }
		                if (level == 2) {
		                    $("#"+adr).append("<option id='" + zzone.ZONE_ID + "' value='" + zzone.ZONE_ID + "'>" + zzone.ZONE_NAME + "</option>");
		                }
		                if (level == 3) {
		                	$("#"+adr).append("<option id='" + zzone.ZONE_ID + "' value='" + zzone.ZONE_ID + "'>" + zzone.ZONE_NAME + "</option>");}	             
		            });
		        },
		        dataType: "json",
		        type: "post"
		    });

		}
	function selectCountry2() {

	    var license_province = $("#license_province").val();
	    var license_city = $("#license_city").val();
	    var license_county = $("#license_county").val();
	    var company_province = $("#company_province").val();
	    var company_city = $("#company_city").val();
	    var company_county = $("#company_county").val();
	    var bank_province = $("#bank_province").val();
	    var bank_city = $("#bank_city").val();
	    var bank_county = $("#bank_county").val();
	}
	
	function changeCity(province, city , county) { 
	    $("#"+city).find("option").remove();

	    $("#"+city).append("<option value=''>请选择市</option>");

	    $("#"+county).find("option").remove();

	    $("#"+county).append("<option value=''>请选择区</option>");

	    var selectvalue = $("#"+province).val();
	    var id = $("#"+province+"  option:selected").attr("id"); // 获取当前省的id
	    $('#provinceId').val(id);
	    getAddrKids(id, 2 , city);
	    selectCountry2();

	}
	function changeZone(city, county) {
		
	    $("#"+county).find("option").remove();

	    $("#"+county).append("<option value=''>请选择区</option>");
	    var selectvalue = $("#city").val();
	    var id = $("#"+city+"  option:selected").attr("id");
	    $('#cityId').val(id);
	    getAddrKids(id, 3 ,county);
	    selectCountry2();
	    //changeTown();

	}
	
	$("#contact_save").on("click", function() {
		var validate = $("#contact_form").valid();	
		if (!validate) {
			return false;
		}
		var user_id = $("#user_id").val();
		var VEND_ID = $("#VEND_ID").val();
		var contact_name = $("#contact_name").val();
		var contact_phone = $("#contact_phone").val();
		var contact_email = $("#contact_email").val();
		var contact_weixin = $("#contact_weixin").val();		
		var COM_NAME_CN = $("#COM_NAME_CN").val();	
		var url = "vendFactory.do?method=contactSave";
		var data = {
				user_id : user_id,
				VEND_ID : VEND_ID,
				contact_name : contact_name,
				contact_phone : contact_phone,
				contact_email : contact_email,
				contact_weixin : contact_weixin,
				COM_NAME_CN : COM_NAME_CN
	    };
		$.ajax({
			url:url,
			data : data,
			type : "POST",
			success : function(data){
				if(data=='true'){
					alert("保存完毕！");
					$("#com_info").show();
				}else{
					alert("保存失败！");
					return;
				}
				
			}
		})		
	});
	
	$("#company_save").on("click", function() {
		var englishTest=new RegExp("^[a-zA-Z 0-9 \,\.\;\:\"\'!@$#*(\)-_?\&]+$");
		if($("#main_product1").val()=="" 
			 && $("#main_product2").val()=="" 
			 && $("#main_product3").val()==""
			 && $("#main_product4").val()==""
			 && $("#main_product5").val()==""){
		 alert("请填写主营产品！"); 	return ;
	 }
	 else if($("#main_product1").val()!="" && !englishTest.test($("#main_product1").val())){
		 alert("主营产品只能输入英文或数字！"); 	return ;
	 }else if($("#main_product2").val()!="" && !englishTest.test($("#main_product2").val())){
		 alert("主营产品只能输入英文或数字！"); 	return ;
	 }else if($("#main_product3").val()!="" && !englishTest.test($("#main_product3").val())){
		 alert("主营产品只能输入英文或数字！"); 	return ;
	 }else if($("#main_product4").val()!="" && !englishTest.test($("#main_product4").val())){
		 alert("主营产品只能输入英文或数字！"); 	return ;
	 }else if($("#main_product5").val()!="" && !englishTest.test($("#main_product5").val())){
		 alert("主营产品只能输入英文或数字！"); 	return ;
	 }
	 else if($("#detailed_product1").val()!="" && !englishTest.test($("#detailed_product1").val())){
		 alert("详细产品只能输入英文或数字！"); 	return ;
	 }else if($("#detailed_product2").val()!="" && !englishTest.test($("#detailed_product2").val())){
		 alert("详细产品只能输入英文或数字！"); 	return ;
	 }else if($("#detailed_product3").val()!="" && !englishTest.test($("#detailed_product3").val())){
		 alert("详细产品只能输入英文或数字！"); 	return ;
	 }else if($("#detailed_product4").val()!="" && !englishTest.test($("#detailed_product4").val())){
		 alert("详细产品只能输入英文或数字！"); 	return ;
	 }else if($("#detailed_product5").val()!="" && !englishTest.test($("#detailed_product5").val())){
		 alert("详细产品只能输入英文或数字！"); 	return ;
	 }
		var validate = $("#company_form").valid();	
		if (!validate) {
			return false;
		}
		var user_id = $("#user_id").val();
		var VEND_ID = $("#VEND_ID").val();
		var company_name = $("#company_name").val();
		var company_legal_person = $("#company_legal_person").val();
		var company_legal_person_id = $("#company_legal_person_id").val();
		var company_regist_time = $("#company_regist_time").val();		
		var license_province = $("#license_province").val();
		var license_city = $("#license_city").val();
		var license_county = $("#license_county").val();
		var company_creat_time = $("#company_creat_time").val();
		var last_sales = $("#last_sales").val();
		var company_tel = $("#company_tel").val();
		var company_province = $("#company_province").val();
		var company_city = $("#company_city").val();
		var company_county = $("#company_county").val();
		var company_addr = $("#company_addr").val();
		var mainProduct = $("#main_product1").val()+$("#main_product2").val()+$("#main_product3").val()+$("#main_product4").val()+$("#main_product5").val();
		var detailedProduct = $("#detailed_product1").val()+$("#detailed_product2").val()+$("#detailed_product3").val()+$("#detailed_product4").val()+$("#detailed_product5").val();
		var legal_upload_a = $("#legal_upload_a").val();
		var legal_upload_b = $("#legal_upload_b").val();
		var license_upload = $("#license_upload").val();
		var main_product = document.getElementsByName("main_product");
		var object = main_product.length;
		var product = "";
		for(var i=0;i<object;i++){
			if(main_product[i].value!="" && main_product[i].value!=null){
				product += main_product[i].value+",";
			}			
		}
		var mlen = product.length;
		var mainpro = product.substring(0,mlen-1);
		$("#main_product").val(mainpro);
		
		var detailed_product = document.getElementsByName("detailed_product");
		var obj = detailed_product.length;
		var pro = "";
		for(var j=0;j<obj;j++){
			if(detailed_product[j].value!="" && detailed_product[j].value!=null){
				pro += detailed_product[j].value+",";
			}
		}
		var dlen = pro.length;
		var detailpro = pro.substring(0,dlen-1);
		$("#detailed_product").val(detailpro);
		var main_hidden = $("#main_product").val();
		var detailed_hidden = $("#detailed_product").val();
		var url = "vendFactory.do?method=companySave";
		var data = {
				user_id : user_id,
				VEND_ID : VEND_ID,
				company_name : company_name,
				company_legal_person : company_legal_person,
				company_legal_person_id : company_legal_person_id,
				company_regist_time : company_regist_time,
				license_province : license_province,
				license_city : license_city,
				license_county : license_county,
				company_creat_time : company_creat_time,
				last_sales : last_sales,
				company_tel : company_tel,
				company_province : company_province,
				company_city : company_city,
				company_county : company_county,
				company_addr : company_addr,
				mainProduct : mainProduct,
				detailedProduct : detailedProduct,
				legal_upload_a : legal_upload_a,
				legal_upload_b : legal_upload_b,
				license_upload : license_upload,
				main_hidden : main_hidden,
				detailed_hidden : detailed_hidden
	    };
		$.ajax({
			url:url,
			data : data,
			type : "POST",
			success : function(data){
				if(data=='true'){
					alert("保存完毕！");
					$("#company_extra").show();
				}else{
					alert("保存失败！");
					return;
				}
				
			}
		})		
	});
	
	$("#com_extra_save").on("click", function() {
		var validate = $("#company_extra_form").valid();	
		if (!validate) {
			return false;
		}
		var user_id = $("#user_id").val();
		var VEND_ID = $("#VEND_ID").val();
		var staff_num = $("#staff_num").val();
		var developers_num = $("#developers_num").val();
		var checkpersonnel_num = $("#checkpersonnel_num").val();
		var factory_area = $("#factory_area").val();		
		var foreign_Office = $("#foreign_Office").val();
		var company_info = $("#company_info").val();
		var com_logo_upload = $("#com_logo_upload").val();
		var com_show_upload1 = $("#com_show_upload1").val();
		var com_show_upload2 = $("#com_show_upload2").val();
		var com_show_upload3 = $("#com_show_upload3").val();
		var com_show_upload4 = $("#com_show_upload4").val();
		var certificate_show_upload1 = $("#certificate_show_upload1").val();
		var certificate_show_upload2 = $("#certificate_show_upload2").val();
		var certificate_show_upload3 = $("#certificate_show_upload3").val();
		var certificate_show_upload4 = $("#certificate_show_upload4").val();
		var url = "vendFactory.do?method=companyExtSave";
		var data = {
				user_id : user_id,
				VEND_ID : VEND_ID,
				staff_num : staff_num,
				developers_num : developers_num,
				checkpersonnel_num : checkpersonnel_num,
				factory_area : factory_area,
				foreign_Office : foreign_Office,
				company_info : company_info,
				com_logo_upload : com_logo_upload,
				com_show_upload1 : com_show_upload1,
				com_show_upload2 : com_show_upload2,
				com_show_upload3 : com_show_upload3,
				com_show_upload4 : com_show_upload4,
				certificate_show_upload1 : certificate_show_upload1,
				certificate_show_upload2 : certificate_show_upload2,
				certificate_show_upload3 : certificate_show_upload3,
				certificate_show_upload4 : certificate_show_upload4
	    };
		$.ajax({
			url:url,
			data : data,
			type : "POST",
			success : function(data){
				if(data=='true'){
					window.location.href="/ecweb/qgmyvend/vendselectcategory/vendSelectCategory.htm";
				}else{
					alert("保存失败！");
					return;
				}
				
			}
		})		
	});
	
$().ready(function(){
		$("#contact_form").validate({
			rules:{
				contact_name:{
					required : true,
					maxlength : 35
				},
				contact_phone : {
					required : true,
					phone_rule : true
				},	
				contact_email : {
					required : true,
					maxlength : 30,
					email : true
				},
				contact_weixin:{
					maxlength : 30
				}			
			},
			messages:{
				contact_name:{
					required : "请输入联系人姓名",
					maxlength : "联系人姓名超长"
				},
				contact_phone : {
					required : "请输入联系人手机号",
					phone_rule : "请输入正确的手机号"
				},	
				contact_email : {
					required : "请输入联系人邮箱",
					maxlength : "联系人邮箱超长",
					email : "请输入正确的邮箱"
				},
				contact_weixin:{
					maxlength : "微信号超长"
				}		
			}
	});
		
		$("#company_form").validate({
			rules:{
				company_name:{
					required : true,
					maxlength : 60,
					englishTest : true
				},
				company_legal_person : {
					required : true,
					maxlength : 20
				},	
				company_legal_person_id : {
					maxlength : 20
				},
				license_province : {
					required : true
				},
				license_city : {
					required : true
				},
				license_county : {
					required : true
				},
				company_creat_time : {
					required : true
				},
				last_sales : {
					required : true,
					number : true
				},
				company_tel : {
					required : true,
					maxlength : 20,
					qgmytele_rule : true
				},
				company_addr : {
					required : true,
					maxlength : 60
				},
				main_product : {
					englishTest : true
				}
			},
			messages:{
				company_name:{
					required : "请输入公司英文名称",
					maxlength : "公司名称超长",
					englishTest : "请正确输入公司英文名称"
				},
				company_legal_person : {
					required : "请输入法定代表人姓名",
					maxlength : "法定代表人姓名超长"
				},	
				company_legal_person_id : {
					maxlength : "输入超长"
				},
				license_province : {
					required : "请选择省"
				},
				license_city : {
					required : "请选择市"
				},
				license_county : {
					required : "请选择区/县"
				},
				company_creat_time : {
					required : "请选择公司成立日期"
				},
				last_sales : {
					required : "请输入上一年销售额",
					number : "销售额只能输入数字"
				},
				company_tel : {
					required : "请输入公司电话",
					maxlength : "公司电话超长",
					qgmytele_rule : "请输入正确的电话"
				},
				company_addr : {
					required : "请输入公司详细地址",
					maxlength : "公司详细地址超长"
				},
				main_product : {
					englishTest : "请正确输入"
				}
			}
	});
		
		$("#company_extra_form").validate({
			rules:{
				staff_num:{
					maxlength : 9,
					digits : true
				},
				developers_num : {
					maxlength : 9,
					digits : true
				},	
				checkpersonnel_num : {
					maxlength : 9,
					digits : true
				},
				factory_area : {
					maxlength : 9,
					number : true
				}		
			},
			messages:{
				staff_num:{
					maxlength : "输入超长",
					digits : "请输入整数"
				},
				developers_num : {
					maxlength : "输入超长",
					digits : "请输入整数"
				},	
				checkpersonnel_num : {
					maxlength : "输入超长",
					digits : "请输入整数"
				},
				factory_area : {
					maxlength : "输入超长",
					number : "请输入数字"
				}
			}
	});
});
		
	/*function  insert(){
		var englishTest=new RegExp("^[a-zA-Z 0-9 \,\.\;\:\"\'!@$#*(\)-_?\&]+$");
		var numTest =new RegExp("^\\d+$");
		var telyanzheng = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)/;
		var mobileyanzheng = /^1[34578]\d{9}$/;
		var eMailyanzheng = /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
		var idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		var mainProduct = $("#main_product1").val()+$("#main_product2").val()+$("#main_product3").val()+$("#main_product4").val()+$("#main_product5").val();
		var detailedProduct = $("#detailed_product1").val()+$("#detailed_product2").val()+$("#detailed_product3").val()+$("#detailed_product4").val()+$("#detailed_product5").val();
		var comTel = "0"+$("#company_tel").val();
		if($("#contact_name").val()==""){
			 alert("请输入联系人姓名！");	return ;
		 }else if($("#contact_name").val()!="" && ($("#contact_name").val()).length>35){
			 alert("联系人姓名超长！"); 	return ;
		 }else if($("#contact_phone").val()==""){
			 alert("请输入联系人手机！"); 	return ;
		 }else if($("#contact_phone").val()!="" && !mobileyanzheng.test($("#contact_phone").val())){
			 alert("联系人手机号格式不正确！"); 	return ;
		 }else if($("#contact_email").val()==""){
			 alert("请输入联系人邮箱！"); 	return ;
		 }else if($("#contact_email").val()!="" && ($("#contact_email").val()).length>30){
			 alert("联系人邮箱超长！"); 	return ;
		 }else if($("#contact_email").val()!="" && !eMailyanzheng.test($("#contact_email").val())){
			 alert("联系人邮箱格式不正确！"); 	return ;
		 }else if($("#contact_weixin").val()!="" && ($("#contact_weixin").val()).length>30){
				 alert("联系人微信号超长！"); 	return ;
			 }else if($("#company_name").val()==""){
			 alert("请输入公司英文名称！"); 	return ;
		 }else if($("#company_name").val()!="" && !englishTest.test($("#company_name").val())){
			 alert("公司名称格式不正确！"); 	return ;
		 }else if($("#company_name").val()!="" && ($("#company_name").val()).length>60){
				 alert("公司名称超长！"); 	return ;
			 }else if($("#company_legal_person").val()==""){
			 alert("请输入法定代表人姓名！"); 	return ;
		 }else if($("#company_legal_person").val()!="" && ($("#company_legal_person").val()).length>20){
				 alert("法定代表人姓名超长！"); 	return ;
		 }else if($("#company_legal_person_id").val()!="" && !idCard.test($("#company_legal_person_id").val())){
			 alert("法人身份证号格式不正确！"); 	return ;
		 }else if($("#license_province").val()==""){
			 alert("请选择营业执照所在省份！"); 	return ;
		 }else if($("#license_city").val()==""){
			 alert("请选择营业执照所在城市！"); 	return ;
		 }else if($("#license_county").val()==""){
			 alert("请选择营业执照所在区！"); 	return ;
		 }else if($("#company_creat_time").val()==""){
			 alert("请选择公司成立日期！"); 	return ;
		 }else if($("#last_sales").val()==""){
			 alert("请填写上一年销售额！"); 	return ;
		 }else if($("#last_sales").val()<0){
			 alert("销售额不能为负数！"); return ;
		 }else if(isNaN($("#last_sales").val())){
				alert("销售额只能为数字！");
				return;
			 }else if($("#last_sales").val()!="" && ($("#last_sales").val()).length>18){
					 alert("上一年销售额超长！"); 	return ;
				 }else if($("#company_tel").val()==""){
				 alert("请输入公司电话！"); 	return ;
	     }else if($("#company_tel").val()!="" && ($("#company_tel").val()).length>13) {
	    	 alert("公司电话超出长度限制！"); 	return ;
	     }else if($("#company_tel").val()!="" && !telyanzheng.test(comTel)){
			 alert("公司电话格式不正确！"); 	return ;
		 }else if($("#company_province").val()==""){
			 alert("请选择公司所在省份！"); 	return ;
		 }else if($("#company_city").val()==""){
			 alert("请选择公司所在城市！"); 	return ;
		 }else if($("#company_county").val()==""){
			 alert("请选择公司所在区！"); 	return ;
		 }else if($("#company_addr").val()==""){
			 alert("请填写公司详细地址！"); 	return ;
		 }else if($("#company_addr").val()!="" && ($("#company_addr").val()).length>60){
			 alert("公司详细地址超长！"); 	return ;
		 }else if($("#main_product1").val()=="" 
				 && $("#main_product2").val()=="" 
				 && $("#main_product3").val()==""
				 && $("#main_product4").val()==""
				 && $("#main_product5").val()==""){
			 alert("请填写主营产品！"); 	return ;
		 }
		 else if($("#main_product1").val()!="" && !englishTest.test($("#main_product1").val())){
			 alert("主营产品只能输入英文或数字！"); 	return ;
		 }else if($("#main_product2").val()!="" && !englishTest.test($("#main_product2").val())){
			 alert("主营产品只能输入英文或数字！"); 	return ;
		 }else if($("#main_product3").val()!="" && !englishTest.test($("#main_product3").val())){
			 alert("主营产品只能输入英文或数字！"); 	return ;
		 }else if($("#main_product4").val()!="" && !englishTest.test($("#main_product4").val())){
			 alert("主营产品只能输入英文或数字！"); 	return ;
		 }else if($("#main_product5").val()!="" && !englishTest.test($("#main_product5").val())){
			 alert("主营产品只能输入英文或数字！"); 	return ;
		 }else if(mainProduct!="" && mainProduct.length>100){
			 alert("主营产品超长！"); 	return ;
		 }

		 else if($("#detailed_product1").val()!="" && !englishTest.test($("#detailed_product1").val())){
			 alert("详细产品只能输入英文或数字！"); 	return ;
		 }else if($("#detailed_product2").val()!="" && !englishTest.test($("#detailed_product2").val())){
			 alert("详细产品只能输入英文或数字！"); 	return ;
		 }else if($("#detailed_product3").val()!="" && !englishTest.test($("#detailed_product3").val())){
			 alert("详细产品只能输入英文或数字！"); 	return ;
		 }else if($("#detailed_product4").val()!="" && !englishTest.test($("#detailed_product4").val())){
			 alert("详细产品只能输入英文或数字！"); 	return ;
		 }else if($("#detailed_product5").val()!="" && !englishTest.test($("#detailed_product5").val())){
			 alert("详细产品只能输入英文或数字！"); 	return ;
		 }else if(detailedProduct!="" && detailedProduct.length>100){
			 alert("详细产品超长！"); 	return ;
		 }
		 
		 else if($("#staff_num").val()<0){
			 alert("公司员工数不能为负数！"); return ;
		 }
		 else if($("#staff_num").val()!="" && !numTest.test($("#staff_num").val())){
			 alert("公司员工数只能为整数！"); 	return ;
		 }else if($("#staff_num").val()!="" && ($("#staff_num").val()).length>9){
				 alert("公司员工数超长！"); 	return ;
			 }else if($("#developers_num").val()<0){
			 alert("研发人员数不能为负数！"); return ;
		 }else if($("#developers_num").val()!="" && !numTest.test($("#developers_num").val())){
			 alert("研发人员数只能为整数！"); 	return ;
		 }else if($("#developers_num").val()!="" && ($("#developers_num").val()).length>9){
				 alert("研发人员数超长！"); 	return ;
			 }else if($("#checkpersonnel_num").val()<0){
			 alert("质检人员数不能为负数！"); return ;
		 }else if($("#checkpersonnel_num").val()!="" && !numTest.test($("#checkpersonnel_num").val())){
			 alert("质检人员数只能为整数！"); 	return ;
		 }else if($("#checkpersonnel_num").val()!="" && ($("#checkpersonnel_num").val()).length>9){
				 alert("质检人员数超长！"); 	return ;
			 }else if($("#factory_area").val()<0){
			 alert("厂房面积不能为负数！"); return ;
		 }else if(isNaN($("#factory_area").val())){
			 alert("厂房面积只能填写数字！"); 	return ;
		 }else if($("#factory_area").val()!="" && ($("#factory_area").val()).length>9){
				 alert("厂房面积超长！"); 	return ;
			 }else if($("#company_info").val()!="" && ($("#company_info").val()).length>300){
					 alert("公司简介超长！"); 	return ;
				 }
		  else if ($("#company_info").val()!="" && !englishTest.test($("#company_info").val())) {
			alert('公司简介请输入英文或数字！');
			return;
		} 
		var main_product = document.getElementsByName("main_product");
		var object = main_product.length;
		var product = "";
		for(var i=0;i<object;i++){
			if(main_product[i].value!="" && main_product[i].value!=null){
				product += main_product[i].value+",";
			}			
		}
		var mlen = product.length;
		var mainpro = product.substring(0,mlen-1);
		$("#main_product").val(mainpro);
		
		var detailed_product = document.getElementsByName("detailed_product");
		var obj = detailed_product.length;
		var pro = "";
		for(var j=0;j<obj;j++){
			if(detailed_product[j].value!="" && detailed_product[j].value!=null){
				pro += detailed_product[j].value+",";
			}
		}
		var dlen = pro.length;
		var detailpro = pro.substring(0,dlen-1);
		$("#detailed_product").val(detailpro);
		
		 document.getElementById("vendFactory").submit();
	}*/
		
		function uploadImg(flag){
			$.layer({
		        type : 2,
		        iframe : {
		            src :  "/ecweb/resUpload.res?method=init&dir=vend&type=image&callback=imageCallBack"+flag
		        },
		        title : "上传资源",
		        closeBtn : false,
		        shadeClose: true,
		        offset:['50px' , ''],
		        area : ['550px','450px']
		    });
		}

		//回调函数
		function imageCallBack0(path) { 
			$("#legal_upload_a").val(path);
			$("#legal_img_a").attr("src",path);
			$("#legal_img_a").show("fast");
		}
		function imageCallBack1(path) { 
			$("#legal_upload_b").val(path);
			$("#legal_img_b").attr("src",path);
			$("#legal_img_b").show("fast");
		}
		function imageCallBack2(path) { 
			$("#license_upload").val(path);
			$("#company_license_img_show").attr("src",path);
			$("#company_license_img_show").show("fast");
		}
		function imageCallBack3(path) { 
			$("#com_logo_upload").val(path);
			$("#com_logo_show").attr("src",path);
			$("#com_logo_show").show("fast");
		}
		function imageCallBack4(path) { 
			$("#com_show_upload1").val(path);
			$("#com_show_pic1").attr("src",path);
			$("#com_show_pic1").show("fast");
		}
		function imageCallBack5(path) { 
			$("#com_show_upload2").val(path);
			$("#com_show_pic2").attr("src",path);
			$("#com_show_pic2").show("fast");
		}
		function imageCallBack6(path) { 
			$("#com_show_upload3").val(path);
			$("#com_show_pic3").attr("src",path);
			$("#com_show_pic3").show("fast");
		}
		function imageCallBack7(path) { 
			$("#com_show_upload4").val(path);
			$("#com_show_pic4").attr("src",path);
			$("#com_show_pic4").show("fast");
		}
		function imageCallBack8(path) { 
			$("#certificate_show_upload1").val(path);
			$("#certificate_show1").attr("src",path);
			$("#certificate_show1").show("fast");
		}
		function imageCallBack9(path) { 
			$("#certificate_show_upload2").val(path);
			$("#certificate_show2").attr("src",path);
			$("#certificate_show2").show("fast");
		}
		function imageCallBack10(path) { 
			$("#certificate_show_upload3").val(path);
			$("#certificate_show3").attr("src",path);
			$("#certificate_show3").show("fast");
		}
		function imageCallBack11(path) { 
			$("#certificate_show_upload4").val(path);
			$("#certificate_show4").attr("src",path);
			$("#certificate_show4").show("fast");
		}
		
		//删除图片
		function delImg(id,pic){
			var imgPath = $("#"+id).val();
			var option = {
					url : "/ecweb/resUpload.res?method=delete&path=" + imgPath,
					type : "POST",
					dataType : "text",
					contentType : "application/x-www-form-urlencoded; charset=UTF-8",
					success : function(data) {
						alert(data);
						$("#"+id).val("");
						$("#"+pic).attr("src","${fn:getResource('/static/qgmy/images/grey.png')}");
					}
				}
			$.ajax(option);
			
		}
		
		function countChar(textareaName,spanName) 
		{ 
			document.getElementById(spanName).innerHTML = 300 - document.getElementById(textareaName).value.length; 
		} 