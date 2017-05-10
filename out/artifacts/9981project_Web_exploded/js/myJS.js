/**
 * Created by Administrator on 2017/3/19.
 */

$(".container-five .list img").eq(3).addClass("cur-item");
$(".container-five .list img").each(function (index, elem) {
    $(elem).mouseenter(function () {

        $(".container-five .list img").filter("[class=cur-item]").removeClass("cur-item");
        $(this).addClass("cur-item");
    })
});
$(".text-wrap,.device-wrap").hide();
$(".section-four").mouseenter(function () {
    $(".text-wrap,.device-wrap").show();
    $(".text-wrap").addClass("text-wrap-animate");
})
$(".section-four").mouseenter(function () {
    $(".text-wrap,.device-wrap").show();
    $(".device-wrap").addClass("device-wrap-animate");
})
