jquery.graspSchedule.js
=======================

jQuery graspSchedule.js is a simple jQuery calendar plugin used to visualize complex schedules & events loading from JSON data, a little similar to the timeline or event calendar.
You can use it for Life-log application or webpage for time schedule.


Demo
===================

See http://tak0002.github.io/jquery.graspSchedule.js/


How to use
====================

Load jQuery and this plugin.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="jquery.graspSchedule.js"></script>
```

Create your custom schedules & events. The data structure should be like this:

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
        css:{backgroundColor:"#f39c12",height:"100px"}
        //You can use most of CSS properties.But only pixel is allow for height.
    }
];
var events = [ //"events" is list for events which have only one time.
        {
            date: "2014/05/10 16:00",
            title: "tweeted at this time."
        },
        {
            date: "2014/05/10 17:00",
            title: "You can use media. &lt;br&gt;&lt;img src=&#039;http://wepia.biz/wlogo.png&#039;/&gt;",
            css:{height:"302px"}
            //You can use most of CSS properties.But only pixel is allow for height.
        };
    ];
```

Create an empty container element for the plugin.

```html
<div id="schedule"></div>
```

Initialize the plugin.

```javascript
$('#schedule').graspSchedule({
    schedules:schedules,
    events:events
});
```

Add custom CSS to style the schedules & events.

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
.time {
    min-width: 50px;
}
```

Available Options.

```javascript
$('#schedule').graspSchedule({
    schedules:schedules,
    events:events,
    options:{ // You can change default setting. Not require.
        classnames: { //If you use this plugin many time in a page, you have to change these.
            schedule: "schedule",
            event: "event",
            time: "time"
        },
        css:{
            event:{
                height:"50px"
            },
            schedule:{
                height:"70px"
            },
            zIndexStart:0,
            marginTop:"0px",
            marginLeft:"0px",
        },
        time:true,//show time on left side
        insideTime:true,//show time inside
        timeFormat:'yyyy/MM/dd(ddd)HH:mm',
        daysFormat:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
}
```


License
====================

The MIT License (MIT)

Contact
====================
http://wepia.biz
