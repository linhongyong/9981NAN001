/**
 * Created by hongyonglin on 2017/4/17.
 */
/*action*/
function Action(opt){//id,name,about,startTime,endTime,days,wdays,style,createTime
    opt=opt ||{};
    this.id=opt.id;
    this.name=opt.name;
    this.days=opt.days || 0;
    this.wdays=opt.wdays;
    this.about=opt.about;
    this.startTime=opt.startTime;
    this.createTime=opt.createTime;
    this.endTime=opt.endTime;
    this.style=opt.style || 0;
}
Action.prototype = {
    constructor: Action,
    setId:function (opt) {
        this.opt=opt;
    },
    getId:function () {
        return this.opt;
    },
    setName:function (name) {
        this.name=name;
    },
    getName:function () {
        return this.name;
    },
    setAbout:function (about) {
        this.about=about;
    },
    getAbout:function () {
        return this.about;
    },
    setDays:function (days) {
        this.days=days;
    },
    getWdays:function () {
        return this.wdays;
    },
    setWdays:function (wdays) {
        this.wdays=wdays;
    },
    getDays:function () {
        return this.days;
    },
    setStartTime:function (startTime) {
        this.startTime=startTime;
    },
    getStartTime:function () {
        return this.startTime;
    },

    setEndTime:function (endTime) {
        this.endTime=endTime;
    },
    getEndTime:function () {
        return this.endTime;
    },
    setCreateTime:function (createTime) {
        this.createTime=createTime;
    },
    getCreateTime:function () {
        return this.createTime;
    },
    setStyle:function (style) {
        this.style=style;
    },
    getStyle:function () {
        return this.style;
    },
    toString:function () {
        console.log(
            "id: "+this.id+
            " days: "+this.days+
            " about: "+this.about+
            " startTime: "+this.startTime+
            " endTime: "+this.endTime+
            " createTime: "+this.createTime+
            " wdays: "+this.wdays+
            " style: "+this.style);
    }
}

/******************************action事件************************************/

/********添加、修改action事件******/
/*编辑表单星期*/
$("#editActionModal .modal-body li").on("click",editInputActWeek);
function editInputActWeek() {
    $(this).toggleClass("selDay");
};
var that=$(".actions");
var addActionFlag=true;
$("body").on("click"," .addAction",addAction);
function addAction(e) {
    addActionFlag=true;
    //that=$(this).parents(".plan").find(".actions");//---对应父元素------//
    $("#editActionModal input").val(null);
    $("#editActionModal .modal-body li").removeClass("selDay");
    $("#editActionModal").modal({keyboard: true});
};

/*提交*/
$("#submitActionInfo").click(function () {
    var actionName=$("#actionName").val();
    var actionAbout=$("#actionAbout").val();
    var wdays="";
    $("#editActionModal .modal-body li").each(function (index,elem) {
        if($(elem).hasClass("selDay")){wdays+=",1";}else{wdays+=",0";}
    });
    var wdays=wdays.split(",");
    var startTime=$("#actionStartTime").val() || "24:00";
    var endTime=$("#actionEndTime").val() || "24:00";
    var opt={
        /*id:id,*/
        name:actionName,
        days:0,
        wdays:wdays,
        about:actionAbout,
        startTime:startTime,
       /* createTime:createTime,*/
        endTime:endTime,
        /*style:style || 0,*/
    }
    var newAction=new Action(opt);
    newAction.toString();
    if(addActionFlag){
        var createTime=getNowFormatDate();
        newAction.setCreateTime(createTime);
        var AData={actions:[]};//临时对象
        AData.actions.push(newAction);
        if( submitAction(newAction)){
            var newActionElem=$("#actionTmpl").template(AData).appendTo(that);//显示
            console.log("添加成功");
        }else{
            console.log("添加失败");
        }

        for(var i=1;i<=7;i++){
            j=i-1;
            if(wdays[i]=="1"){
                newActionElem.find(".act_time li").eq(j).addClass("selDay");
            }else{
                newActionElem.find(".act_time li").eq(j).removeClass("selDay");
            }
        }
    }
    else {
        var id=activeAction.find(".actionNo").val();
        var createTime=activeAction.find(".createTime").text();
        newAction.setCreateTime(createTime);
        newAction.setId(id);
        if(modifyAction(newAction)){
            activeAction.find(".name").text($("#actionName").val());;
            activeAction.find(".act_about").text($("#actionAbout").val());
            activeAction.find(".startTime").first().text($("#actionStartTime").val());
            activeAction.find(".endTime").first().text($("#actionEndTime").val());
            console.log("修改成功");
        }else{
            console.log("修改失败");
        }
        for(var i=1;i<=7;i++){
            j=i-1;
            if(wdays[i]=="1"){
                activeAction.find(".act_time li").eq(j).addClass("selDay");
            }else{
                activeAction.find(".act_time li").eq(j).removeClass("selDay");
            }
        }
    }
    $("#editActionModal").modal('hide');
});
/*修改action*/
var activeAction;
$(".actions").on("click",".header a[data-action=edit]",editHabit);
function editHabit(e) {
    addActionFlag=false;
    activeAction=$(this).parents(".action");
    $("#actionName").val(activeAction.find(".name").text());
    $("#actionAbout").val(activeAction.find(".act_about").text());
    $("#actionStartTime").val(activeAction.find(".startTime").first().text());
    $("#actionEndTime").val(activeAction.find(".endTime").first().text());
    $("#editActionModal").modal({keyboard: true});
    for(var i=0;i<7;i++){
        if(activeAction.find(".act_time li").eq(i).hasClass("selDay")){
            $("#editActionModal .modal-body li").eq(i).addClass("selDay");
        }else{
            $("#editActionModal .modal-body li").eq(i).removeClass("selDay");
        }
    }
    /*折叠*/
    $(".actions").on("click",".header a[data-action=collapse]",collapseAction);
    function collapseAction(e) {
        $(this).parents(".action").find(".body").slideToggle("fast");
        if($(this).html()!='<i class="fa fa-chevron-down" aria-hidden="true"></i>'){
            $(this).html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
        }else{
            $(this).html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
        }
    };
    /*删除任务*/
    $(".actions").on("click",".header a[data-action=close]",deleteAction);
    function deleteAction(e) {
        console.log("asd");
        var id=$(this).parents(".action").find(".actionNo").val();
        if(deleteActionById(id)){
            $(this).parents(".action").remove();//显示
            console.log("删除成功");
        }else{
            console.log("删除失败");
        }
    };
};
/**********Action***********/

function submitAction(newAction){
    return true;
    $.ajax({
        url: "",
        type: "POST",
        data: {//id,name,about,startTime,endTime,days,wdays,style,createTime
           /* id:newAction.getId(),*/
            name:newAction.getName(),
            days:newAction.getDays(),
            about:newAction.getAbout(),
            wdays:newAction.getWdays(),
            startTime:newAction.getStartTime(),
            endTime:newAction.getEndTime(),
            createTime:newAction.getCreateTime(),
            style:newAction.getStyle(),
        },
        dataType: "json",
        success: function (result) {
            //成功需要返回true否则false;
        }
    });
}
function modifyAction(newAction){
    return true;
    $.ajax({
        url: "",
        type: "POST",
        data: {//id,name,about,startTime,endTime,days,wdays,style,createTime
            id:newAction.getId(),
            name:newAction.getName(),
            days:newAction.getDays(),
            about:newAction.getAbout(),
            wdays:newAction.getWdays(),
            startTime:newAction.getStartTime(),
            endTime:newAction.getEndTime(),
            createTime:newAction.getCreateTime(),
            style:newAction.getStyle(),
        },
        dataType: "json",
        success: function (result) {
          //成功需要返回true否则false;
        }
    });
}
function deleteActionById(id){
    return true;
    $.ajax({
        url: "",
        type: "POST",
        data: {
            id:newAction.getId(),
        },
        dataType: "json",
        success: function (result) {
            //成功需要返回true否则false;
        }
    });
}
function listAction(username){

}


/*******************************独立函数*********************************************/
/*能使光标在内容后面*/
function placeCaretAtEnd(el) {//参数必须是HTMLDOM
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
/*获得当前日期和时间*/
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
