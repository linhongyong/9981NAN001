/**
 * Created by hongyonglin on 2017/3/29.
 * prompt 01: submitLabel():提交label数据（每个操作完成都要提交）
 * submitDate()：提交日期（刷新页面、日期更改后提交，因为是根据日期显示相应数据）
 */
var itemHeight = 32;
function Label(startTime,totalTime,content,style){
    this.no=0;
    this.startTime=startTime;
    this.totalTime=totalTime;
    this.style=style;
    this.content=content;
    this.label=$("<div class='myLabel' style='position:absolute;>" +
        "<p class='labelContent' style='margin:0px;'></p>" +
        "<p class='noSelect'>" +
        "<span >=</span></p></div>");
}
Label.prototype = {
    constructor : Label,
    getLabel:function () {
        this.label.css("top",this.startTime*itemHeight*2+"px");
        this.label.children().first().text(this.content);
        return this.label;
    },
    setNo:function (no) {
        this.no = no;
    },
    getNo:function () {
        return this.no;
    },
    setStartTime:function (startTime) {
        this.startTime = startTime;
    },
    getStartTime:function () {
        return this.startTime;
    },
    setTotalTime:function (totalTime) {
        this.totalTime = totalTime;
    },
    getTotalTime:function () {
        return this.totalTime;
    },
    setStyle:function (style) {
        this.style = style;
    },
    getStyle:function () {
        return this.style;
    },

    setTime:function (time) {
        this.time = time;
    },
    setHeight:function (height) {
        this.height = height;
        this.label.css("height",this.height+"px");
    },
    setContent:function(content){
        this.content=content;
    },
    getContent:function(){
        return this.content;
    },
    mousedown:function () {
        console.log("mousedown");
    },
    toString:function () {
        return "no:"+this.no+"  startTime:"+this.startTime+"  totalTime:"+this.totalTime+"  " +
            "content:"+this.content+"  style:"+this.style;
    }
}
function sortByStartTime(labels) {//对labels按top属性值从小到大排序并设置no属性值
    var len=labels.length;
    for (var i=0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            if (labels[i].getStartTime() < labels[j].getStartTime()) {
                var d = labels[j];
                labels[j] = labels[i];
                labels[i] = d;
            }
        }
    }
    for (var k=0; k < len; k++) {
        labels[k].setNo(k);
    }
    return labels;
}

$(function () {
    var clickedIntext;//点击的是哪个.intext

    var activeLabel = null;//被单击的label
    var onlyClickNotMove=true;
    var labels=[];
    var actionSyle=0;//操作类型用于传到后台作判断
    var preNo//移动前的no属性值

    function addDragAction(jObj){
        var labelObj;
        jObj.draggable({
            axis:"y",
            grid:[1,itemHeight],
            snap:".inText",
            start:function(){
                labelObj= findObjByTop(this);
                preNo=labelObj.getNo();
                console.log("移动前的$(.myLabel)对象 "+labelObj.toString());
            },
            stop:function () {
                var startTime= parseInt($(this).css("top"))/(itemHeight*2);
                labelObj.setStartTime(startTime);
                labels=sortByStartTime(labels)
                /*submitLabel(labelObj,2,preNo);*/
                console.log("移动后的$(.myLabel)对象 "+labelObj.toString());
            }
        });
    }
    function findObjByTop(htmlDom){
        var len=labels.length;
        for (var i=0; i < len; i++){
            if(labels[i].getStartTime()==parseInt($(htmlDom).css("top"))/(itemHeight*2)){
                return labels[i];
            }
        }
        console.log("**errot:findObjByTop:没有找到相应高度的label对象");
    }
    function deleteObjByTop(htmlDom){
        var len=labels.length;
        var flag=false;
        var no;
        for (var i=0; i < len; i++){
            if(labels[i].getStartTime()==parseInt($(htmlDom).css("top"))/(itemHeight*2) || flag){
                no=labels[i].getNo();
                if(i+1<len){
                    labels[i]=labels[i+1];
                }else{
                    labels.length=len-1;
                }
                flag=true;
            }
        }
        for (var k=0; k < len-1; k++) {
            labels[k].setNo(k);
        }
        return no;
    }

    $(".myLabel").each(function(index,elem){//初始化labels
        var labelObj=new Label();
        labelObj.setNo(index);
        labelObj.setStartTime(parseInt($(elem).css("top"))/(itemHeight*2));
        labelObj.setTotalTime(parseInt($(elem).css("height"))/(itemHeight*2));
        labelObj.setContent($(elem).children().first().text());
        labelObj.setStyle(0);
        labels.push(labelObj);
        addDragAction($(elem))
    });
    labels=sortByStartTime(labels);

    function alertMyModal(){
        if(activeLabel){
            $("#deleteLabel").text("删除");
        }else{
            $("#deleteLabel").text("关闭");
        }
        $("#myModal").modal({keyboard: true});
        $("#mycontent").val("");
    }
    /*弹出模态框*/
    $(".dayTable .inText").each(function (index, elem) {
        $(elem).click(function () {
            clickedIntext = index;
            alertMyModal();
        });
    });

    /****************************提交更改后*************************/
    $("#submitLabel").click(function () {
        var labelObj;
        var labelContent=$("#mycontent").val();
        //判断是新增还是修改。
        if(!activeLabel){//新增
            /*新建label七步骤*/
            labelObj=new Label((clickedIntext/2),0.5,labelContent,0);
            label=labelObj.getLabel();
            addDragAction(label);
            $(".dayTable").append(label);
            labels.push(labelObj);
            labels=sortByStartTime(labels);//再优化
            /*submitLabel(labelObj,0);*/
        }
        else{
            activeLabel.children().first().text(labelContent);
            var labelObj=findObjByTop(activeLabel);
            labelObj.setContent(labelContent);
            /*submitLabel(labelObj,1);*/

        }
        activeLabel=null;
        $("#myModal").modal('hide');
    });

    /****************************删除*************************/
    $("#deleteLabel").click(function () {
        if(activeLabel){
            activeLabel.remove();
            var no=deleteObjByTop(activeLabel);
            submitDeleteNo(no);
        }
        activeLabel=null;
        /*for(var i=0;i<labels.length;i++){
            console.log(labels[i].toString());
        }*/
    });
    /*******************************************label鼠标事件***************************************/
    /*label单击事件绑定*/
    (function label_event() {
        $(".dayTable").on("click",".myLabel",click_event);
        function click_event(e) {
            activeLabel=$(this);
            if(onlyClickNotMove){
                alertMyModal();
                $("#mycontent").val($(this).children().eq(0).text())

            }else{
                onlyClickNotMove=true;
            }
        };
    })();
    /*功能：改变标签大小*/
    (function sesizeLabel_event() {
        var y0,y1;//鼠标点击、释放的位置
        var isMousedown_resize=false;//用于判断是否是改变大小的操作
        $(".dayTable").on("mousedown",".noSelect",mousedown_event);
        function mousedown_event(e) {
            isMousedown_resize=true;
            y0 = e.originalEvent.y || e.originalEvent.layerY;
            activeLabel=$(this);
            $(this).parent().draggable("destroy");//防止产生拖拽
        };
        $("body").bind("mousemove",mousemove_event);
        function mousemove_event(e) {
            if(isMousedown_resize){
                onlyClickNotMove=false;
                y1 = e.originalEvent.y || e.originalEvent.layerY;
                if(y1-y0 < -itemHeight/2 && parseInt(activeLabel.parent().css("height"))>itemHeight){//向下移动
                    activeLabel.parent().css("height","-=15");
                    y0=y1;
                }
                else if(y1-y0 > itemHeight/2){//向上移动
                    activeLabel.parent().css("height","+=15");
                    y0=y1;
                }
            }else{}
        };
        $("body").bind("mouseup",mouseup_event);
        function mouseup_event(){
            if(isMousedown_resize){
                isMousedown_resize=false;
                activeLabel.parent().css("height",Math.round(parseInt(activeLabel.parent().css("height"))/itemHeight)*itemHeight+"px");
                var labelObj= labels[$(".dayTable .myLabel").index(activeLabel.parent())];
                //console.log("no: "+$(".dayTable .myLabel").index(activeLabel.parent())+"  labelObj:"+labelObj.getNo());
                var totalTime=parseInt(activeLabel.parent().css("height"))/(itemHeight*2);
                labelObj.setTotalTime(totalTime);
               // console.log("mouseup_event  "+labelObj.toString());
                /*submitLabel(labelObj,1);*/
                addDragAction(activeLabel.parent());
            }else{}
        }
    })();

    /*************************************My Event拖拽、接收********************************************/
    (function () {
        var flag=true;//用于出去遮挡.intext部分影响
        var signDragNew=false;
        $(".external-event").draggable({
            helper:"clone",
            snap:".inText",
            snapMode:"both",
            snapTolerance:10,
            start:function () {
                signDragNew=true;
            },
        });
        $(".dayTable .inText").each(function (index,elem) {
            $(elem).droppable({
                drop:function () {
                    if(signDragNew){//labelObj=new Label((clickedIntext/2),0.5,labelContent,0);
                        /*新建label七步骤*/
                        labelObj=new Label((index/2) ,0.5,"My Event:",0);
                        label=labelObj.getLabel();
                        addDragAction(label);
                        $(".dayTable").append(label);
                        labels.push(labelObj);
                        labels=sortByStartTime(labels);//再优化
                        /*submitLabel(labelObj,0);*/

                        label.draggable({
                            axis:"y",
                            grid:[1,itemHeight],
                            snap:".inText"
                        })
                        signDragNew=false;
                    }else{}//不用新建

                }
            })
        })
    }())
    function submitLabel(label,actionSyle,preNo){
        //actionSyle（0：增加；1：修改内容；2：修改大小；）;preNo:移动时移动前的|no属性
        $.ajax({
            url: "",
            type: "POST",
            data: {
                no:label.getNo(),
                startTime:label.getStartTime(),
                totalTime:label.getTotalTime(),
                content:label.getContent(),
                style:label.getStyle(),
                actionSyle:actionSyle,
                preNo:preNo,
                date:date,//全局
            },
            dataType: "json",
            success: function (result) {

            }
        });
    }

    function submitDeleteNo(no){
        //actionSyle（0：增加；1：修改内容；2：修改大小；）;preNo:移动时移动前的|no属性
        $.ajax({
            url: "",
            type: "POST",
            data: {
                no:no,
            },
            dataType: "json",
            success: function (result) {

            }
        });
    }

    /*时间拾取器*/
    $("#inline").datepicker({
        altField: "#datep"
    });
    $("#inline").hide();
    $("#datep").datepicker();
    $("#datep").datepicker("hide");
    var date;
    $("#datep").change(function(){//日期有变化
        date=$("#datep").val();
        $(".myLabel").remove();
        submitDate();
    });
    /*submitDate();*///刷新页面
    function submitDate(){
        date=$("#datep").val();
        console.log("显示的为："+date+" 的信息");
        $.ajax({
            url: "",
            type: "POST",
            data: {
                date:$("#datep").val(),
            },
            dataType: "json",
            success: function (result) {

            }
        });

    }
});
