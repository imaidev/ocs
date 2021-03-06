﻿$(document).ready(function() {
	var body = $("body");
	// validate init
	$("#getpwd_form").validate({
		rules : {
			login_name : {
				required : true
			},
			checknum : {
				required : true,
				number : true,
				minlength : 4,
				maxlength : 4,
				remote : {
					url : checkNumUrl,
					type : "post",
					data : {
						"checknum" : function() {
							return $("#checknum").val()
						}
					}
				}
			}
		},
		messages : {
			login_name : {
				required : "请输入登录用户名"
			},
			checknum : {
				required : "请输入验证码",
				number : "请正确输入验证码",
				minlength : "请输入四位验证码",
				maxlength : "请输入四位验证码",
				remote : "验证码不正确"
			}

		}
	});
	// 清除填写的信息
	var bindClear = function() {
		body.find("input[name='login_name']").val("");
		body.find("input[name='checknum']").val("");
	};
	// 提交
	var submit = function() {
		var login_name = body.find("input[name='login_name']").val();
		var checknum = body.find("input[name='checknum']").val();
		var secPasswordUrl = body.find("input[name='secPasswordUrl']").val();
		var data = {
			login_name : login_name,
			checknum : checknum
		};
		$.ajax({
			type : "POST",
			url : secPasswordUrl,
			data : data,
			success : function(data) {
				if (data == '-1') {
					alert("校验码错误，请重新输入！");
					changeVerify();
				} else if (data == '0') {
					alert("登录账号不存在，请重新输入！");
					changeVerify();
				} else if (data == '1') {
					window.location.href = $("body").find("input[name='chooseSecPwdUrl']").val();
				} else {

					alert("系统错误，请稍后重试！");
				}
			},
			error : function(data) {
				alert("由于网络原因，获取验证码失败！");
			}
		});
	};

	$("#submit_btn").click(function() {
		submit();
	});
	$("#cancle_btn").click(function() {
		bindClear();
	});
});

// 点击触发更换校验码
function changeVerify() {
	var date = new Date();
	var ttime = date.getTime();
	var verifyImg = document.getElementById('verifyImg');
	var login_name = document.getElementById('login_name');
	var urlArray = verifyImg.src.split("&_=");
	verifyImg.src = urlArray[0] + '&_=' + ttime;
	document.getElementById('checknum').value = "";
	document.getElementById('checknum').focus();
	login_name.focus();
}
