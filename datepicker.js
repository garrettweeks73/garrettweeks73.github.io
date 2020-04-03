var today=new Date();
var day=today.getUTCDate();
var month=today.getUTCMonth();
var year=today.getUTCFullYear();
var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
var monthDaysArray={'January':'31','February':'28','March':'31','April':'30','May':'31','June':'30','July':'31','August':'31','September':'30','October':'31','November':'30','December':'31'};
var input={'year':'','month':'','day':''};

$('.calendar-body').on('click','.day-select',function(){
    $('.active-day').each(function(){$(this).removeClass('active-day');});
    $(this).addClass('active-day');
    var day=$(this).text();
    input['day']=day;
});

function buildDays(year,month){
    var out='';
    var mod=months.indexOf(month);
    var prev=(mod-1==-1?11:mod-1);
    var next=(mod+1==12?0:mod+1);
    var endPrevMonth=new Date(year,prev,monthDaysArray[months[prev]]);
    var firstThisMonth=new Date(year,mod);
    var endThisMonth=new Date(year,mod,monthDaysArray[month]);
    var firstNextMonth=new Date(year,next);
    if(year%4==0){
        if(mod==1){
            endThisMonth=new Date(year,mod,monthDaysArray[month]+1);
        }else if(prev==1){
            endPrevMonth=new Date(year,prev,monthDaysArray[months[prev]]+1);
        }
    }
    var firstDay=firstThisMonth.getUTCDay();
    var endDay=endThisMonth.getUTCDay();
    var beginningOffset=monthDaysArray[months[prev]]-firstDay+1;
    var endingOffset=days.length-endDay;
    for(var x=beginningOffset;x<=endPrevMonth.getUTCDate();x++){
        out+="<div class='day-ghost'>"+x+"</div>";
    }
    for(var x=firstThisMonth.getUTCDate();x<=endThisMonth.getUTCDate();x++){
        if(year==today.getUTCFullYear() && month==today.getUTCMonth() && x==today.getUTCDate()){
            out+="<div class='day-select active-day'>"+x+"</div>";
        }else{
            out+="<div class='day-select'>"+x+"</div>";
        }
    }
    for(var x=1;x<endingOffset;x++){
        out+="<div class='day-ghost'>"+x+"</div>";
    }
    /*
    $('.calendar-body').animate({opacity:'0'},400,'swing',function(){
        $(this).empty().append(out).animate({opacity:'1'},400,'swing');
    });
    */
    $('.calendar-body').css({opacity:'0'}).empty().append(out).animate({opacity:'1'},400,'swing');
}

$('.month-current').click(function(){
    if($('.year-current').hasClass('active-year-current')){
        $('.year-menu').animate({height:'0'},400,'swing');
        $('.year-current').toggleClass('active-year-current');
    }
    if(!$(this).hasClass('active-month-current')){
        $('.month-current').toggleClass('active-month-current');
        if($('.month-current').text()==''){$(this).text(months[month]);}
        var here=$(this).parents('.calendar-top').siblings('.month-menu').find('.month-list');
        var selected=$('.month-current').text();
        buildMonth(selected,here);
        $('.month-menu').animate({height:$('.month-menu').get(0).scrollHeight},400,'swing',function(){
            $(this).css({height:'auto'});
        });
    }else{
        $('.month-menu').animate({height:'0'},400,'swing',function(){
            $('.month-current').toggleClass('active-month-current');
        });
    }
});

$('.month-list').on('click','.month-select',function(){
    $('.active-month').each(function(){$(this).removeClass('active-month');});
    $(this).addClass('active-month');
    var month=$(this).text();
    input['month']=months.indexOf(month)+1;
    var year='';
    $('.datepicker .year-current').each(function(){
        if($(this).is(':visible')){
            year=$(this).text();
        }
    });
    buildDays(year,month);
    $('.month-current').text(month).removeClass('active-month-current');
    $('.month-menu').animate({height:'0'},400,'swing');
});

$('.month-previous').click(function(){
    var here=$(this).siblings('.month-current'),month=$(this).siblings('.month-current').text();
    previousMonth(month,here);
    var year2,month2;
    $('.datepicker .year-current').each(function(){
        if($(this).is(':visible')){
            year2=$(this).text();
        }
    });
    $('.datepicker .month-current').each(function(){
        if($(this).is(':visible')){
            month2=$(this).text();
        }
    });
    buildDays(year2,month2);
});

$('.month-next').click(function(){
    var here=$(this).siblings('.month-current'),month=$(this).siblings('.month-current').text();
    nextMonth(month,here);
    var year2,month2;
    $('.datepicker .year-current').each(function(){
        if($(this).is(':visible')){
            year2=$(this).text();
        }
    });
    $('.datepicker .month-current').each(function(){
        if($(this).is(':visible')){
            month2=$(this).text();
        }
    });
    buildDays(year2,month2);
});

function previousMonth(month,location) {
    var prev=months.indexOf(month)-1;
    console.log(prev);
    if(prev<0){
        prev=11;
        var year;
        $('.datepicker .year-current').each(function(){
            if($(this).is(':visible')){
                year=parseInt($(this).text(),10)-1;
            }
        });
        //var year=parseInt($('.year-current').text(),10)-1;
        $('.year-current').text(year);
        input['year']=year;
    }
    //input['month']=months[prev];
    input['month']=prev+1;
    $('.month-select').each(function(){if($(this).text()==months[prev]){$(this).addClass('active-month');}else{$(this).removeClass('active-month');}});
    $(location).text(months[prev]);
}

function nextMonth(month,location) {
    var next=months.indexOf(month)+1;
    console.log(next);
    if(next>11){
        next=0;
        var year;
        $('.datepicker .year-current').each(function(){
            if($(this).is(':visible')){
                year=parseInt($(this).text(),10)+1;
            }
        });
        //var year=parseInt($('.year-current').text(),10)+1;
        $('.year-current').text(year);
        input['year']=year;
    }
    //input['month']=months[next];
    input['month']=next+1;
    $('.month-select').each(function(){if($(this).text()==months[next]){$(this).addClass('active-month');}else{$(this).removeClass('active-month');}});
    $(location).text(months[next]);
}

function buildMonth(month,location){
    var mod = months.indexOf(month);
    var out='';
    for(var x=0;x<12;x++){
        out+="<div class='month-select"+(x==mod?' active-month':'')+"'>"+months[x]+"</div>";
    }
    $(location).empty().append(out);
}

$('.year-current').click(function(){
    if($('.month-current').hasClass('active-month-current')){
        $('.month-menu').animate({height:'0'},400,'swing');
        $('.month-current').toggleClass('active-month-current');
    }
    if(!$(this).hasClass('active-year-current')){
        if($(this).text()==''){$(this).text(year);}
        $(this).toggleClass('active-year-current');
        var here=$(this).parents('.calendar-top').siblings('.year-menu').find('.year-list');
        var temp=parseInt($(this).text(),10);
        buildYear(temp-6,temp+5,temp,here);
        $('.year-menu').animate({height:$('.year-menu').get(0).scrollHeight},400,'swing',function(){
            $(this).css({height:'auto'});
        });
    }else{
        $('.year-menu').animate({height:'0'},400,'swing',function(){
            $('.year-current').toggleClass('active-year-current');
            //$('.year-current').text(year);
        });
    }
});

$('.year-list').on('click','.year-select',function(){
    $('.active-year').each(function(){$(this).removeClass('active-year');});
    $(this).addClass('active-year');
    console.log($(this));
    var year=$(this).text();
    input['year']=year;
    var month='';
    $('.datepicker .month-current').each(function(){
        if($(this).is(':visible')){
            month=$(this).text();
        }
    });
    buildDays(year,month);
    $('.year-current').text(year).removeClass('active-year-current');
    $('.year-menu').animate({height:'0'},400,'swing');
});

$('.year-previous').click(function(){
    var min=$('.year-list').children('.year-select').eq(0).text();
    var here=$(this).siblings('.year-list');
    buildYear(min-11,min,year,here);
});

$('.year-next').click(function(){
    var max=$('.year-list').children('.year-select').eq(-1).text();
    var here=$(this).siblings('.year-list');
    buildYear(max,parseInt(max)+11,year,here);
});

function buildYear(start,end,year,location){
    var out='';
    if(start>end){
        for(var x=end;x>=start;x--){
            out+="<div class='year-select"+(x==year?' active-year':'')+"'>"+x+"</div>";
        }
    }else{
        for(var x=start;x<=end;x++){
            out+="<div class='year-select"+(x==year?' active-year':'')+"'>"+x+"</div>";
        }
    }
    $(location).empty().append(out);
}

function setDays(){
    var out='';
    var first=days[new Date(year,month).getUTCDay()];
    var begin=months[month-1];
    var beginCount=monthDaysArray[begin]-(days.indexOf(first));
    var current=months[month];
    var currentCount=monthDaysArray[current];
    var endCount=days.indexOf(first);
    if(year%4==0){
        if(begin==1){
            beginCount++;
            currentCount++;
            endCount--;
        }else if(current==1){
            currentCount++;
            endCount--;
        }
    }
    for(var x=days.indexOf(first);x>=0;x--){
        out+="<div class='day-ghost'>"+beginCount+"</div>";
        beginCount++;
    }
    for(var x=1;x<=currentCount;x++){
        //out+="<div class='"+(x<=day?'day-select':'day-ghost')+""+(x==day?' active-day':'')+"'>"+x+"</div>";
        out+="<div class='day-select"+(x==day?' active-day':'')+"'>"+x+"</div>";
    }
    for(var x=0;x<=endCount;x++){
        var y=x+1;
        out+="<div class='day-ghost'>"+y+"</div>";
    }
    //output
    input['day']=day;
    /*
    $('.calendar-body').animate({opacity:'0'},400,'swing',function(){
        $(this).empty().append(out).animate({opacity:'1'},400,'swing');
    });
    */
    $('.calendar-body').css({opacity:'0'}).empty().append(out).animate({opacity:'1'},400,'swing');
}

function setMonth(){
    $('.month-current').text(months[month]);
    input['month']=month+1;
}

function setYear(){
    $('.year-current').text(year);
    input['year']=year;
}

$(document).ready(function(){
    setYear();
    setMonth();
    setDays();
});