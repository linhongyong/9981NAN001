/**
 * Created by hongyonglin on 2017/4/17.
 */
var habitData;
(function () {
    var activeHabit;
    function Habit(no,name,about,startTime,days,style){
        this.no=no;
        this.name=name;
        this.days=days || 0;
        this.about=about;
        this.startTime=startTime;
        this.style=style || 0;
    }
    Habit.prototype = {
        constructor: Habit,
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
        getDays:function () {
            return this.days;
        },
        setStartTime:function (startTime) {
            this.startTime=startTime;
        },
        getStartTime:function () {
            return this.startTime;
        },
        setStyle:function (style) {
            this.style=style;
        },
        getStyle:function () {
            return this.style;
        },
        toString:function () {
           console.log("no: "+this.no+" days: "+this.days+" about: "+this.about+
               " startTime: "+this.startTime+" style: "+this.style);
        }
    }
    habitData={
        habits:[]
    };
   /* var template=$("#habitTmpl").template(habitData).appendTo("#myHabit");*/
    $("<span id='addHabit' style='color:#fff;'><i class='fa fa-plus' aria-hidden='true'></i></span>").appendTo("#myHabit");
    $(".myHabit").each(function (index, elem) {
        var no=$(elem).find(".section_one .no").text();
        var name=$(elem).find(".section_one .name").text();
        var days=$(elem).find(".section_one .days").text();
        var about=$(elem).find(".section_two .habitAbout").text();
        var style=0;
        var startTime=$(elem).find(".section_two .startTime").text();
        var oldHabit=new Habit(no,name,about,startTime,days,style);
        habitData.habits.push(oldHabit);
    });

    /***********************************button事件**************************************/
    /*
    * 需要提交数据的地方：
    * 1.提交添加、修改habit后；2.deleteHabit；3.saveAbout；4.editAbout（暂未实现）；5.saveAbout；
    * 6.upDays；7.downDays  实现分为三步：显示、更新habitData.habits、提交数据
    * */

    /****************添加、修改habit*************/
    /*添加habit*/
    var addHabitFlag=true;
    $("#myHabit").on("click","#addHabit",addHabit);
    function addHabit(e) {
        addHabitFlag=true;
        $(this).remove();
        $("#habitName").val("");
        $("#habitAbout").val("");
        $("#editHabitModal").modal({keyboard: true});
    };
    /*修改Habit*/
    $("#myHabit").on("click",".actionIcons a[data-action=edit]",editHabit);
    function editHabit(e) {
        addHabitFlag=false;
        $("#editHabitModal").modal({keyboard: true});
        $("#habitName").val($(this).parents(".myHabit").find(".habitName").text());
        $("#habitAbout").val($(this).parents(".myHabit").find(".habitAbout").text());
        activeHabit=$(this).parents(".myHabit");
    };
    /*提交添加、修改后*/
    $("#submitHabitInfo").click(function () {
        if(addHabitFlag){
            var habitName=$("#habitName").val();
            var habitAbout=$("#habitAbout").val();
            var newHabit=new Habit(habitData.habits.length+1,habitName,habitAbout,getNowFormatDate());
            newHabit.toString();
            var HData={habits:[]};//临时对象
            HData.habits.push(newHabit);
            $("#habitTmpl").template(HData).appendTo("#myHabit");//显示
            habitData.habits.push(newHabit);//更新habitData.habits
            submitHabit(newHabit);//提交
            $("<span id='addHabit' style='color:#fff;'>" +
                "<i class='fa fa-plus' aria-hidden='true'></i></span>").appendTo("#myHabit");
        }else{
            var name=$("#habitName").val();
            var about=$("#habitAbout").val();
            activeHabit.find(".habitName").text(name);//显示
            activeHabit.find(".habitAbout").text(about);//显示
            var oldHabit=findObjByNo(activeHabit);
            oldHabit.setName(name);
            oldHabit.setAbout(about);
            habitData.habits[parseInt(jObj.find(".section_one .no").text())-1]=newHbit;//更新habitData.habits
            submitHabit(oldHabit);//提交
            activeLabel=null;
        }
        $("#editHabitModal").modal('hide');
    });

    /*editAbout*/
    /*$("#myHabit").on("click",".section_two a[data-action=editAbout]",editAbout);
    function editAbout(e) {
        var jObj= $(this).parents(".myHabit").find(".section_two .habitAbout");
        jObj.attr("contenteditable",true);
        placeCaretAtEnd( jObj[0]);
    };*/
    /*saveAbout*/
   /* $("#myHabit").on("click",".section_two a[data-action=saveAbout]",saveAbout);
    function saveAbout(e) {
        var jObj= $(this).parents(".myHabit").find(".section_two .habitAbout");
        jObj.attr("contenteditable",false);
        jObj.blur();
    };*/
    /*deleteHabit*/
    $("#myHabit").on("click",".actionIcons a[data-action=close]",deleteHabit);
    function deleteHabit() {
        $(this).parents(".myHabit").remove();//显示
        $(".myHabit").each(function (index, elem) {//显示
            var no=parseInt($(elem).find(".section_one .no").text());
            $(elem).find(".section_one .no").text(no-1)
        });
        var no=parseInt($(this).parents(".myHabit").find(".section_one .no").text());
        deleteObjByNo(no);//更新habitData.habits
        submitNoForDelete(no);//提交
    };
    /*upDays*/
    $("#myHabit").on("click",".daysCla a[data-action=up]",upDays);
    function upDays() {
        var days=parseInt($(this).parents(".myHabit").find(".days").text())+1;
        $(this).parents(".myHabit").find(".days").text(days);//显示
        var no=parseInt($(this).parents(".myHabit").find(".section_one .no").text());
        habitData.habits[no-1].setDays(habitData.habits[no-1].getDays()+1);//更新habitData.habits
        submitNoForDaysUp(no);//提交
    }
    /*downDays*/
    $("#myHabit").on("click",".daysCla a[data-action=down]",downDays);
    function downDays() {
        var days=parseInt($(this).parents(".myHabit").find(".days").text())-1;
        if(days<0){return;}
        $(this).parents(".myHabit").find(".days").text(days);
        var no=parseInt($(this).parents(".myHabit").find(".section_one .no").text());
        habitData.habits[no-1].setDays(habitData.habits[no-1].getDays()-1);//更新habitData.habits
        submitNoForDaysDown(no);//提交
    }
    /*collapseHabit*/
    $("#myHabit").on("click",".actionIcons a[data-action=collapse]",collapseHabit);
    function collapseHabit(e) {
        // console.log(index);
        $(this).parents(".myHabit").find(".section_two").slideToggle("fast");
        if($(this).html()!='<i class="fa fa-chevron-down" aria-hidden="true"></i>'){
            $(this).html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
        }else{
            $(this).html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
        }
    };
    /***********************************button事件结束**************************************/


    /***********************操作habits数组的函数***********************/
    function findObjByNo(jObj){
        var len=habitData.habits.length;
        for (var i=0; i < len; i++){
            if(habitData.habits[i].getNo()==parseInt(jObj.find(".section_one .no").text())){
                return habitData.habits[i];
            }
        }
        console.log("**errot:findObjByNo:没有找到相应高度的habit对象");
    }
    function deleteObjByNo(no){
        habitData.habits.splice(no,1);
        console.log("no："+no+" 的habit删除成功");
    }
    /***********************提交函数***********************/
    function submitHabit(habit){
        //新增或者修改habit
        //no已存在：修改
        //no不存在：添加
        $.ajax({
            url: "/Habit/Habit_save",
            type: "POST",
            data: {
                no:habit.getNo(),
                name:habit.getName(),
                days:habit.getDays(),
                about:habit.getAbout(),
                startTime:habit.getStartTime(),
                style:habit.getStyle(),
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
            url: "/Habit/Habit_delete",
            type: "POST",
            data: {
                no:no,
            },
            dataType: "json",
            success: function (result) {

            }
        });
        console.log("提交 no为: "+no+" 的habit，并删除");
    }
    function submitNoForDaysUp(no){
        $.ajax({
            url: "/Habit/Habit_daysUp",
            type: "POST",
            data: {
                no:no,
            },
            dataType: "json",
            success: function (result) {
				
            }
        });
        console.log("提交 no为: "+no+" 的habit，使days+1");
    }
    function submitNoForDaysDown(no){
        $.ajax({
            url: "/Habit/Habit_daysDown",
            type: "POST",
            data: {
                no:no,
            },
            dataType: "json",
            success: function (result) {

            }
        });
        console.log("提交 no为: "+no+" 的habit，使days-1");
        
    }
    $(function (){
    	$.ajax({
            url: "/Habit/Habit_getAllHabits",
            type: "POST",
            dataType: "json",
            success: function (result) {
            	if(result.code == 1){
            		var data = result.allHabits; //为Habit列表集合
            		for(var i=0;i<data.length;i++){
            			console.log(data[i].no+","+data[i].about);
            		}
            	}
            }
        });
    })


})();
/*******************************独立函数*********************************************/
/*能使光标在内容后面*/
function placeCaretAtEnd(el) {
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

