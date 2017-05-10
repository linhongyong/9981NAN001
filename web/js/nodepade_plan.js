/**
 * Created by HongyongLin on 2017/4/18.
 */
(function () {
    /*************************初始化*********************************/

    /************Plan对象********************/
    function Plan(no,name,what,why,how,createTime){
        this.no=no;
        this.name=name;
        this.what=what;
        this.why=why;
        this.how=how;
        this.createTime=createTime;
    }
    Plan.prototype = {
        constructor: Plan,
        setNo:function (no) {
            this.no=no;
        },
        getNo:function () {
            return this.no;
        },
        setName:function (name) {
            this.name=name;
        },
        getName:function () {
            return this.name;
        },
        setWhat:function (what) {
            this.what=what;
        },
        getWhat:function () {
            return this.what;
        },
        setWhy:function (why) {
            this.why=why;
        },
        getWhy:function () {
            return this.why;
        },
        setHow:function (how) {
            this.how=how;
        },
        getHow:function () {
            return this.how;
        },
        setCreateTime:function (createTime) {
            this.createTime=createTime;
        },
        getCreateTime:function () {
            return this.createTime;
        },
        toString:function () {
            console.log("no: "+this.no+" name: "+this.name+" what: "+this.what+
                " why: "+this.why+" how: "+this.how);
        }
    }

    /****************************************下拉菜单************************************************/
    plans=$('<div class="planList">' +
        ' <div class="plans-block">' +
        ' <ul class="nav planUl"  id="myTab"> ' +
        '</ul> ' +
        '<a id="addPlan" class="addButton"><i class="fa fa-plus" aria-hidden="true"></i></a> ' +
        '</div> ' +
        '</div>');
    plans.prependTo("body");
   /* $(".dragDown").draggable();*/
    var planUl_height=plans.children().first().outerHeight();
    $(".planList").css("top",planUl_height*(-1));

    $(".planUl").add("#addPlan").on({//点击后收缩
        click:function (e) {
            var planUl_height=plans.children().first().outerHeight();
            $(".planList").css("top",planUl_height*(-1));
            plans.removeClass("plansDownUp");
        }
    });

    /*下拉，加条目*/
    $(".dragDown").on({
        touchstart:function (e) {
            $(".planUl").html("");

            $(".plan ").each(function (index,elem) {
                var str='<li><a href="#'+$(elem).find(".planNo").val()+'" data-toggle="tab">'+$(elem).find(".planName").text()+'</a></li>'
                $(".planUl").append($(str));
            });
            if($(".planList").hasClass("plansDownUp")){
                var planUl_height=plans.children().first().outerHeight();
                $(".planList").css("top",planUl_height*(-1));
                $(".planList").removeClass("plansDownUp");
            }else{
                $(".planList").toggleClass("plansDownUp");
            }
        }
    });


    /**************************************添加计划*************************************************/
    $(".planList #addPlan").on({
        click:function () {
            $("#editPlanModal input").val(null);
            $("#editPlanModal").modal({keyboard: true});
        }
    });
    $("#submitPlanInfo").click(function () {
        /* if(addHabitFlag){*/
        var planName=$("#planName").val();
        var planWhat=$("#planWhat").val();
        var planWhy=$("#planWhy").val();
        var planHow=$("#planHow").val();
        var createTime=getNowFormatDate();
        var newPlan=new Plan($("#myPlan .plan").size()+1,planName,planWhat,planWhy,planHow);
        var PData={plans:[]};//临时对象
        PData.plans.push(newPlan);
        $("#myPlan .plan").last().removeClass("active")
        $("#planTmpl").template(PData).appendTo("#myPlan");//显示
        $("#myPlan .plan").last().addClass("active");
        submitPlan(newPlan);//提交
        $("#editPlanModal").modal('hide');
    });


    /*编辑what*/
    (function () {
    $("#myPlan").on("mousedown",".what .section_body",touchstartWhat);
    $("#myPlan").on("mouseup",".what .section_body",touchendWhat);

        var timeOutEvent;
        function touchstartWhat(e) {
            var that=$(this);
            timeOutEvent = setTimeout(function () {
                that.attr("contenteditable",true);
                placeCaretAtEnd(that[0]);
                clearTimeout(timeOutEvent);
            },500);
            e.preventDefault();
        }
        function touchendWhat(e) {
            clearTimeout(timeOutEvent);
            return false;
        }
    })();

    /*$("#myPlan .what .section_body").on({

    });*/
    $("#myPlan").on("focusout",".what .section_body",saveWhat);
    function saveWhat(e) {
        $(this).attr("contenteditable",false);
        var planWhat=$(this).text().trim();
        var planNo=$("#myPlan .planNo").val().trim();
        subWhat(planNo,planWhat);
    }
    /*编辑why*/
    (function () {
        $("#myPlan").on("mousedown",".why .section_body",touchstartWhat);
        $("#myPlan").on("mouseup",".why .section_body",touchendWhat);

        var timeOutEvent;
        function touchstartWhat(e) {
            var that=$(this);
            timeOutEvent = setTimeout(function () {
                that.attr("contenteditable",true);
                placeCaretAtEnd(that[0]);
                clearTimeout(timeOutEvent);
            },500);
            e.preventDefault();
        }
        function touchendWhat(e) {
            clearTimeout(timeOutEvent);
            return false;
        }
    })();
    $("#myPlan").on("focusout",".why .section_body",savewhy);
    function savewhy(e) {
        $(this).attr("contenteditable",false);
        var planWhy=$(this).text().trim();
        var planNo=$("#myPlan .planNo").val().trim();
        subWhy(planNo,planWhy);
    }

    /******************************************action*****************************************/
    function Action(no,name,about,startTime,endTime,days,wdays,style,createTime){
        this.no=no;
        this.name=name;
        this.days=days || 0;
        this.wdays=wdays;
        this.about=about;
        this.startTime=startTime;
        this.createTime=createTime;
        this.endTime=endTime;
        this.style=style || 0;
    }
    Action.prototype = {
        constructor: Action,
        setNo:function (no) {
            this.no=no;
        },
        getNo:function () {
            return this.no;
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
                "no: "+this.no+
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
    var that;
    var addActionFlag=true;
    $("body").on("click"," .addAction",addAction);
    function addAction(e) {
        addActionFlag=true;
        that=$(this).parents(".plan").find(".actions");
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

        if(addActionFlag){
            var createTime=getNowFormatDate();
            var newAction=new Action(1,actionName,actionAbout,startTime,endTime,0,wdays,0,createTime);
            newAction.toString();
            var AData={actions:[]};//临时对象
            AData.actions.push(newAction);
            var newAction=$("#actionTmpl").template(AData).appendTo(that);//显示

            for(var i=1;i<=7;i++){
                j=i-1;
                if(wdays[i]=="1"){
                    newAction.find(".act_time li").eq(j).addClass("selDay");
                }else{
                    newAction.find(".act_time li").eq(j).removeClass("selDay");
                }
            }
        }
        else {
            activeAction.find(".name").text($("#actionName").val());;
            activeAction.find(".act_about").text($("#actionAbout").val());
            activeAction.find(".startTime").first().text($("#actionStartTime").val());
            activeAction.find(".endTime").first().text($("#actionEndTime").val());
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
    $("#myPlan").on("click",".how .header a[data-action=edit]",editHabit);
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

    };
    /**********Action***********/

    /***********************************button事件结束************************************/


    /********************无数据通讯相应函数***************************/
    /*折叠*/
    $("#myPlan").on("click",".how .header a[data-action=collapse]",collapseAction);
    function collapseAction(e) {
        $(this).parents(".action").find(".body").slideToggle("fast");
        if($(this).html()!='<i class="fa fa-chevron-down" aria-hidden="true"></i>'){
            $(this).html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
        }else{
            $(this).html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
        }
    };
    $("#myPlan").on("click",".section_header a[data-action=collapse]",collapseSection);
    function collapseSection(e) {
        $(this).parents("dl").find("dd").slideToggle("fast");
        if($(this).html()!='<i class="fa fa-chevron-down" aria-hidden="true"></i>'){
            $(this).html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
        }else{
            $(this).html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
        }
    };
    /*删除任务*/
    $("#myPlan").on("click",".how .header a[data-action=close]",deleteAction);
    function deleteAction(e) {
        $(this).parents(".action").remove();//显示
    };

    /******************************************提交函数*******************************************/
    function submitPlan(newPlan){
        ajaxPlan(newPlan)
        newPlan.toString();
    };
    function ajaxPlan(newPlan){//添加
        $.ajax({
            url: "",
            type: "POST",
            data: {
                //no:newPlan.getNo(),
                name:newPlan.getName(),
                what:newPlan.getWhat(),
                why:newPlan.getWhy(),
                how:newPlan.getHow(),
                createTime:newPlan.getCreateTime(),
            },
            dataType: "json",
            success: function (result) {

            }
        });
    }
    function submitNoForDelete(no){
        //删除数据库中habit.no属性值=no的记录
        //让数据库中habit.no属性值大于no的减1
        $.ajax({
            url: "",
            type: "POST",
            data: {
                no:label.no,
            },
            dataType: "json",
            success: function (result) {

            }
        });
        console.log("提交 no为: "+no+" 的habit，并删除");
    }


})();

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

/***************************action表单事件******************************/

