$(document).ready(function() {
	var body = $("body");
	
	$("#getpwd_bymail_form").validate({
		rules : {
			vcode : {
				required : true
			}
		},
		messages:{
			vcode : {
				required : "请输入邮箱验证码"
			}
		}
	});
	//去掉重选找回方式的按钮
	var cancelReChoose = function(){
		var e = $("body").find("div[name='re_choose']");
		if(e[0]){
			e.remove();
		}
	}
	//清除填写的信息
	var bindClear = function(){
		body.find("input[name='checknum_mail']").val("");
	};
	//提交
	$("#verifyMail_btn").bind("click",submit);
	function submit(){
		$("#verifyMail_btn").unbind("click",submit);
		var login_name = body.find("input[name='login_name']").val();
		var submit_url = body.find("input[name='doGetByMail_url']").val()+"&user="+login_name;
		$.ajax({
			url:submit_url,
			data: null,//如果不需要传参数，传null即可
			type : "POST",
			success : function(data){
				if(data=='-1'){
					dialog.error("系统故障，请重新找回！",function(){
						window.location.href=body.find("input[name='getpwd_url']").val();
					});
				}else if(data == '1'){
					//window.location.href=body.find("input[name='activateGetPwd_url']").val();
					//dialog.success("验证码已发送至邮箱，请注意查收.");
					var color = $("#verifyOK").css("color");
					var value = $("#verifyOK")[0].firstChild.nodeValue;
					$("#verifyOK").css("color","red");
					$("#verifyOK")[0].firstChild.nodeValue = "已发送邮箱验证码，请查收并输入"
						$("#vcode").on("change",function(){
					$("#verifyOK").css("color",color);
					$("#verifyOK")[0].firstChild.nodeValue = value;
					});
					$("#verifyMail_btn").addClass('back');
					mailSettime();
					$("#verifyMail_btn").unbind("click",submit);
				}else{
					var color = $("#verifyOK").css("color");
					var value = $("#verifyOK")[0].firstChild.nodeValue;
					$("#verifyOK").css("color","red");
					$("#verifyOK")[0].firstChild.nodeValue = "已发送邮箱验证码，请查收并输入"
						$("#vcode").on("change",function(){
					$("#verifyOK").css("color",color);
					$("#verifyOK")[0].firstChild.nodeValue = value;
					});
					$("#verifyMail_btn").addClass('back');
					mailSettime();
					$("#verifyMail_btn").unbind("click",submit);
					dialog.success(data);
				}
				
			}
		});
	};
	
	var checkMail = function(){
		var vcode = body.find("input[name='vcode']").val();
		if(vcode==""){
			dialog.error("请输入邮箱验证码.");
			return;
		}
		var check_url = body.find("input[name='checkMailCode']").val();
		var data = {
				vcode : vcode
		};
		$.ajax({
			url:check_url,
			data: data,//如果不需要传参数，传null即可
			type : "POST",
			success : function(data){
				if(data == '1'){
					window.location.href=body.find("input[name='resetPwd']").val();
				}else if(data=='-1'){
					dialog.error("验证码错误，请重新输入.");
					return ;
				}else if(data=='0'){
					dialog.error("验证码失效，请重新发送.");
					return;
				}
			}
		});
	};
	
	
	var phoneTimedown=30;
	function mailSettime(){
		if (phoneTimedown == 0) {
		$("#verifyMail_btn").removeClass("back");
		$("#verifyMail_btn").attr("disabled", false);
		$("#verifyMail_btn").find("span")[0].firstChild.nodeValue="免费获取邮箱验证码";
		$("#verifyMail_btn").bind("click",submit);
		$("#verifyOK").css("color","gray");
		$("#verifyOK")[0].firstChild.nodeValue = "请输入邮箱验证码";
		phoneTimedown = 30; 
		} else {  
			$("#verifyMail_btn").attr("disabled", true);
			$("#verifyMail_btn").find("span")[0].firstChild.nodeValue=phoneTimedown+"s后重新发送";
			phoneTimedown--; 
			setTimeout(function() { 
				mailSettime();
				},1000); 
		} 
	}

	
	/*$("#verifyMail_btn").click(function() {
		submit();
	});*/
	$("#cancle_btn_mail").click(function() {
		bindClear();
	});
	$("#check_mail").click(function() {
		checkMail();
	});
	
	
});
