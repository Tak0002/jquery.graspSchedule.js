jquery.graspSchedule.js
=======================

jQuery GraspSchedule.js supports to grasp of complex schedules.
This plugin can visualize complex schedules from time list.
You can use it for Life-log application or webpage for time schedule.


Demo
===================

See http://tak0002.github.io/jquery.graspSchedule.js/


How to use
====================

Load jQuery and this plugin.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="jquery.graspSchedule.js"></script>
```

use graspSchedule

```javascript
var schedules = [ //"schedules" is list for events which have start and end.
        {
            end: "2014/05/10 3:00",
            start: "2014/05/10 1:40",
            title: "Meeting A"
        },
        {
            end: "2014/05/10 2:41",
            start: "2014/05/10 2:30",
            title: "Conference B <br>", //You can use html tags
            css:{backgroundColor:"#f39c12",height:100px;}
           //You can use most of CSS properties.But only pixel is allow for height.
        }
    ];
var events = [ //"events" is list for events which have only one time.
        {
            date: "2014/05/10 16:00",
            title: "I tweeted at this time."
        },
        {
            date: "2014/05/10 17:00",
            title: "You can use media. <br><img src='http://wepia.biz/wlogo.png'/>",
            css:{height:"302px"}
            //You can use most of CSS properties.But only pixel is allow for height.
        };
$('#schedule').graspSchedule({
    schedules:schedules,
    events:events,
    options:{ // You can change default setting if you want. Not require.
        classnames: { //If you use this plugin many time in a page, you have to change these.
            schedule: "schedule",
            event: "event"
        },
        css:{ //Change default height.
            event:{ //Use pixel.
                height:"50px"
            },
            schedule:{
                height:"70px"
            },
            zIndexStart:0,
            marginTop:"0px",
            marginLeft:"0px",
            time:false,//show time in left side.
            timeFormat:'yyyy年MM月dd日(ddd)HH:mm',
            daysFormat:['日', '月', '火', '水', '木', '金', '土'] 
        }
    }
});
```

Style sheet

```css
.schedule{
    position: absolute; 
    width: 400px;
    background-color: #c0392b;
    border: #ecf0f1 solid 1px;
    padding: 3px;
}
.event{
    position: absolute;
    margin-left: 40px;
    width: 350px;
    background-color: #2980b9;
    padding: 3px;
}
```