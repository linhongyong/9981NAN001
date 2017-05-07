$(document).ready(
		function() {
            $(".backgrounds").css("height",$(window).height()+"px");
            makeContentCenter();
			/*  账号、密码、验证码初始状态 开始  */
			$("#tid").focus(function() {
				if ($(this).val() == '您的用户名'){
                    $(this).val("");
                    $(this).css("color", "#333333");
                }
			}).blur(function() {
				if ($(this).val() == '') {
					$(this).val("您的用户名");
					$(this).attr("style", "");
				}
			});
			$("#pwd").focus(function() {
				if ($(this).val() == '您的密码') {
					$(this).val("");
					$(this).attr("type", "password");
				}
				$(this).css("color", "#333333");
			}).blur(function() {
				if ($(this).val() == '') {
					$(this).val("您的密码");
					$(this).attr("style", "");
					$(this).attr("type", "text");
				}
			});

			$("#ident").focus(function() {
				if ($(this).val() == '验证码') {
					$(this).val("");
				}
				$(this).css("color", "#333333");
			}).blur(function() {
				if ($(this).val() == '') {
					$(this).val("验证码");
					$(this).attr("style", "");
				}
			});
			/* 账号、密码、验证码初始状态 结束 */



			/* 点击马上注册，页面处理 开始  */
			$("#goRegister").click(function() {

                $("#register_form").css("display", "block");
                $("#goLogin").css("display", "block");
                $("#login_form").css("display", "none");
                $(this).css("display", "none");
                makeContentCenter();
			});
			/* 点击马上注册，页面处理 结束 */

			/* 点击马上登录，页面处理 开始 */
			$("#goLogin").click(function() {

                $("#login_form").css("display", "block");
                $("#goRegister").css("display", "block");
                $("#register_form").css("display", "none");
                $(this).css("display", "none");
                makeContentCenter();
			});
			/* 点击马上登录，页面处理 结束  */
/******************************登录注册模块**************************************/
            /* 点击登录/注册，页面处理 开始 */
			$("#login_button").click(function() {
					login('loginForm');
					console.log("login");
			});
			$("#register_button").click(function() {
					register('loginForm');
                console.log("register");
			});
		});
/**
 * 此处是点击登录后提交的action
 * 切换到登录模式
 * @param formName 表单名称
 */
//提示：因为是共用同一个form便签所以。。。。
function login(formName) {
	if (true) {//checkLogin()
		/*var url = $("#log_reg_form").attr("action");
		var start = url.lastIndexOf("/");//lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
		var end = url.indexOf(";");
		if(end == -1)
			var newurl = url.replace(url.substring(start),"/LoginAction.jhtml");
		else
			var newurl = url.replace(url.substring(start,end),"/LoginAction.jhtml");*/
		$("#log_reg_form").attr("action", "/User/User_userRegisr");
		window.document.forms[formName].submit();
	}
}
/**
 * 此处是点击注册进入注册页面后修改表单提交的action
 * 切换到注册模式
 * @param formName 表单名称
 */
function register(formName) {
	if (true){//(checkRegister())
		/*var url = $("#log_reg_form").attr("action");
		var start = url.lastIndexOf("/");
		var end = url.indexOf(";");
		if(end == -1)
			var newurl = url.replace(url.substring(start),"/UserAction.jhtml?method=registerSave");
		else
			var newurl = url.replace(url.substring(start,end),"/UerAction.jhtml?method=registerSave");*/
		$("#log_reg_form").attr("action", "/User/User_userRegister");
		window.document.forms[formName].submit();
	}
}

/**
 * 对用户名、密码、验证码进行验证。
 * @returns {Boolean} 返回是否验证通过
 */
function checkRegister() {
		// 点击登录按钮时，对输入框的值进行验证
	    var uname = $("#uname").val().trim();
		var upassword = $("#upassword").val().trim();
		var usex = $("#usex").val().trim();
		var utel = $("#utel").val().trim();
		var uemail = $("#uemail").val().trim();
		var uqq = $("#uqq").val().trim();
		var uwechat = $("#uwechat").val().trim();
		var ujob = $("#ujob").val().trim();
		var ubirth = $("#ubirth").val().trim();

		if (!uname.
				match(/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{2,11}$/) || uname == "") {
			$("#regesits_msg").html("您的用户名格式不正确(6~12位，需包含 数字和字母，字母区分大小写)");
			return false;
		}else if (!upassword.
				match(/[a-zA-Z0-9]{6,16}/) || upassword == "") {
			$("#regesits_msg").html("您的密码格式不正确(6~16位，需包含 数字和字母，字母区分大小写)");
			return false;
		}
		else if (usex != "男" && usex != "女") {
			$("#regesits_msg").html("性别为男或女");
			return false;
		} else if (!utel.
				match(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/)) {
			$("#regesits_msg").html("您的手机号格式不正确");
			return false;
		} else if (!uemail.
				match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
			$("#regesits_msg").html("您的邮箱格式不正确");
			return false;
		} else if (!uqq.
				match() || uqq=="") {
			$("#regesits_msg").html("您的QQ格式不正确");
			return false;
		}else if (!uwechat.
				match() || uwechat=="") {
			$("#regesits_msg").html("您的微信格式不正确");
			return false;
		} else if (!ubirth.
				match() ||ubirth=="") {
			$("#regesits_msg").html("您的出生日格式不正确");
			return false;
		}else if (!ujob.
				match() || ujob=="") {
			$("#regesits_msg").html("职业不能为空");
			return false;
		}

		return true;

}

function checkLogin() {
	// 点击登录按钮时，对输入框的值进行验证
    var uname = $("#tid").val().trim();
	var upassword = $("#pwd").val().trim();

	if (!uname.
			match(/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{2,11}$/) || uname == "") {
		$("#error_msg").html("您的用户名格式不正确");
		return false;
	}else if (!upassword.
			match(/[a-zA-Z0-9]{6,16}/) || upassword == "") {
		$("#error_msg").html("您的密码格式不正确");
		return false;
	}
	return true;

}
// js获取项目根路径，如： http://localhost:8080/Qunawan
function getRootPath() {
	// 获取当前网址，如： http://localhost:8080/Qunawan/pages/index.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： Qunawan/pages/index.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8080
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/Qunawan
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
}
function makeContentCenter(){//使其在页面垂直居中显示
    var winHeight=parseInt($(".backgrounds").css("height")) ;
    var contentHeight= $(".content").outerHeight();
    $(".content").css("marginTop",(winHeight-contentHeight)/2+"px");
}
