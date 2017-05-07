// 基于准备好的dom，初始化echarts实例
var section_one_first = echarts.init(document.getElementById('section_one_first'));

// 指定图表的配置项和数据
section_one_first.setOption({
    title: {
        text: '9981nan 用户增量'
    },
    tooltip: {},
    legend: {
        data:['用户增量'],
        left: 'right',
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {

    },
    series: [{
        name: '用户增量',
        type: 'bar',
        center: ['0%', '100%'],
        data: [5, 20, 36, 10, 10, 20],

    }],

});
// 使用刚指定的配置项和数据显示图表。


//*********************************************************
var section_one_second = echarts.init(document.getElementById('section_one_second'));
section_one_second.setOption({
    baseOption: {
    title: {
        text: '用户来源'
    },
   // backgroundColor: '#2c343c',
    /*textStyle: {//和下面同一个效果
        color: 'rgba(255, 255, 255, 0.3)'
    },*/
    label: {
        normal: {
            textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
        }
    },
    labelLine: {
        normal: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
        }
    },
    series : [//诸如阴影、透明度、颜色、边框颜色、边框宽度等
        {
            name: '访问来源',
            type: 'pie',
            radius: [0, '50%'],
            // center: ['42%', '50%'],
            data:[
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
            ],
            roseType: 'angle',
            itemStyle: {
                emphasis: {
                    // 阴影的大小
                    shadowBlur: 200,
                    // 阴影水平方向上的偏移
                    shadowOffsetX: 0,
                    // 阴影垂直方向上的偏移
                    shadowOffsetY: 0,
                    // 阴影颜色
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    // 设置扇形的颜色
                   /* color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'*/
                }
            }
        }
    ]},
   /* media: [
        {
            query: {
                maxWidth: 600,
                maxHeight: 300,
                minAspectRatio: 1.3
            },
            option: {
                legend: {
                    right: 'center',
                        bottom: 65,
                        orient: 'horizontal'
                },
                series: [{
                    radius: [30, '50%'],
                    center: ['50%', '75%']
                }
                ]
            }
         },
    ]*/
});

