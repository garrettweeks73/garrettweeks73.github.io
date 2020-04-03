/* variables */
var filt;
var all = [];
var selected = [];
var xhr;
var scroll;
var DEFAULT_URL;
/* start */
$(document).ready(function () {
    if($('#initialize-rod').val()=='1'){
        $('#rod-menu-button').click();
        $('#rod-submit-search').delay(500).click();
    }else if($('#initialize-inst').val()=='1'){
        $('#rod-menu-button').click();
        $('#rod-submit-search').delay(500).click();
    }
    $('#popup-bottom').show().animate({
        bottom: '0'
    }, 400, 'swing').delay(4200).animate({
        bottom: '-48px'
    }, 400, 'swing', function () {
        $(this).hide();
    });
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function (searchElement, fromIndex) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (len === 0) {
                    return false;
                }
                var n = fromIndex | 0;
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                function sameValueZero(x, y) {
                    return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                }
                while (k < len) {
                    if (sameValueZero(o[k], searchElement)) {
                        return true;
                    }
                    k++;
                }
                return false;
            }
        });
    }
});
$("#unofficialDocViewFrame").on("load", function() {
    $('#unofficialDocViewFrame').contents().on("keydown", function(e) {
  
         if(e.ctrlKey && e.which==80 || e.metaKey && e.which==80 || e.which==224 && e.which==80 || e.which==17 && e.which==80 || e.which==91 && e.which==80 || e.which==93 && e.which==80){
             if($('#unofficialDocViewFrame').is(':visible')){
                 e.preventDefault();
                 e.stopPropagation();
                 PrintJS();
             }
         }
 });
})

$(document).on('keydown',function(e){
    /*
    console.log('which: '+e.which);
    console.log('meta: '+e.metaKey);
    var mac=['Mac OS','Mac_PowerPC','Macintosh'];
    //console.log(!mac.includes(window.navigator.oscpu));
    if(!mac.includes(window.navigator.oscpu)){
        if(e.ctrlKey && e.which==80){
            if($('#unofficialDocViewFrame').is(':visible')){
                e.preventDefault();
                e.stopPropagation();
                PrintJS();
            }
        }
    }else{
    */
        // if(e.ctrlKey && e.which==80 || e.metaKey && e.which==80 || e.which==224 && e.which==80 || e.which==17 && e.which==80 || e.which==91 && e.which==80 || e.which==93 && e.which==80){
        //     if($('#unofficialDocViewFrame').is(':visible')){
        //         e.preventDefault();
        //         e.stopPropagation();
        //         PrintJS();
        //     }
        // }
        if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'p') ) {
            // console.log( "You pressed CTRL + P" );
            if($('.pdf-viewer').is(":visible")){
              window.frames["unofficialDocViewFrame"].focus();
              window.frames["unofficialDocViewFrame"].print();
            }
        }
    //}
});
/*
(function () {
    var hideEl = document.getElementById("hideThis");
    // HTML5 spec, IE 5.5+, Firefox 6.0+
    if ("onbeforeprint" in window) {
        window.onbeforeprint = function () {
            hideEl.style.display = 'none';
        }
        window.onafterprint = function () {
            hideEl.style.display = '';
        }
    }
    // Chrome 9+, Opera 12.1+, Safari 5.1+
    else if (window.matchMedia) {
        var mqList = window.matchMedia("print");

        mqList.addListener(function (mql) {
            hideEl.style.display = mql.matches ? 'none' : '';
        });
    }
    // Your fallback method, only working for JS initiated printing
    else {
        (function (oldPrint) {
            window.print = function () {
                hideEl.style.display = 'none';
                oldPrint();
            }
        })(window.print);
    }
})();
*/
/* keypress */
$('#index-login-container').keypress(function(e){
    if(e.which===13){
        e.preventDefault();
        login();
    }
});

$('#rod-menu-container,#ucc-menu-container').keypress(function(e){
    if(e.which===13){
        e.preventDefault();
        Search(1,0,0);
    }
});

/* hover */
$('.header-dropdown').on({
    'mouseenter': function () {
        var id = $(this).children('.header-menu-button').attr('id') + '-dropdown';
        $('#' + id).css({
            visibility: 'visible',
            height: $('#' + id).get(0).scrollHeight
        });
    },
    'mouseleave': function () {
        var id = $(this).children('.header-menu-button').attr('id') + '-dropdown';
        $('#' + id).css({
            visibility: 'hidden',
            height: '0'
        });
    }
});

/* change */
$('#index-language').change(function(){
    var lang=$(this).val();
    switch(lang){
        case 'en-US':
            window.location='https://www.okcc.online/index.php?l=en-US';
            break;
        case 'es-419':
            window.location='https://www.okcc.online/index.php?l=es-419';
            break;
        case 'vi':
            window.location='https://www.okcc.online/index.php?l=vi';
            break;
    }
});

$('#plats-select').change(function () {
    var key = $(this).val();
    loadPlats(key);
    $('.loading-overlay').show();

});

/* click */
$('#header-admin').on('click', function () {
    window.location = 'https://www.okcc.online/admin.php';
});

$('#header-log-in').click(function () {
    if ($('.login-container').hasClass('active-login-container')) {
        $('.login-container').animate({
            top: '0'
        }, 400, 'swing', function () {
            $(this).removeClass('active-login-container');
        });
    } else {
        $('.login-container').animate({
            top: '114px'
        }, 400, 'swing', function () {
            $(this).addClass('active-login-container');
        });
    }
});

$('#header-logout').click(function () {
    logout();
});

$('#header-account').click(function () {
    window.location = 'user.php?s=account&l=' + $('#index-language').val();
});

$('.login-function-button').click(function () {
    var id = $(this).attr('id');
    if (id == 'login-submit-button') {
        login();
    } else {
        window.open('user.php?s='+(id=='register-button'?'register':'recover')+'&l='+$('#index-language').val(),'_blank');
    }
});

$('.popup-text').click(function () {
    var lang=$(this).attr('id');
    if(lang=='popup-spanish'){
        window.location='https://www.okcc.online/index.php?l=es-419';
    }else if(lang=='popup-vietnamese'){
        window.location='https://www.okcc.online/index.php?l=vi';
    }
});

$('.cart-trigger').click(function () {
    if ($(this).hasClass('close')) {
        $(this).removeClass('close');
        $(this).addClass('cart');
        $('.cart-container').animate({
            width: '4px'
        }, 400, 'swing');
    } else {
        $(this).removeClass('cart');
        $(this).addClass('close');
        $('.cart-overlay').show();
        $('.cart-container').animate({
            width: '360px'
        }, 400, 'swing', function () {
            loadCart();
        });
    }

});

$('#cart-checkout-button').click(function () {
    window.location = 'https://www.okcc.online/checkout.php?l='+$('#index-language').val();
});

$('#alert-menu-button').click(function () {
    window.location.href="http://alert.okcc.online";
});

$('.menu-flex-button').click(function () {
    var id=$(this).attr('id').replace('button','container');
    $('#search-type').val((id=='rod-menu-container'?'rod':'ucc'));
    var id2=id.replace('menu-container','table');
    $('.menu-container2').each(function(){
        if($(this).attr('id')==id){
            $('#'+id).css({opacity:'0',display:'flex'}).animate({opacity: '1'},400,'swing').addClass('active-container2');
        }else{
            $(this).animate({opacity:'0'},400,'swing').hide().removeClass('active-container2');
        }
    });
    $('html,body').delay(400).animate({scrollTop:$('#'+id).offset().top},400,'swing');
    var resultHeight = 0;
    if (id == 'rod-menu-container') {
        $('#ucc-page-container').hide();
        $('#ucc-page-container-bot').hide();
        $('#ucc-filter-list').hide();
        $('#rod-page-container').show();
        $('#rod-page-container-bot').show();
        $('#rod-filter-list').show();
        $('#result-modify-table').show();
        $('#result-print').show();
        $('#result-csv').show();
        $('#result-grow-shrink').show();
        resultHeight = $('#rod-table').css('height').slice(0, -2);
        resultHeight = (parseInt(resultHeight, 10) + 64) + 'px';
    } else if (id == 'ucc-menu-container') {
        $('#rod-page-container').hide();
        $('#rod-page-container-bot').hide();
        $('#rod-filter-list').hide();
        $('#ucc-page-container').show();
        $('#ucc-page-container-bot').show();
        $('#ucc-filter-list').show();
        $('#result-modify-table').show();
        $('#result-print').show();
        $('#result-csv').show();
        $('#result-grow-shrink').show();
        resultHeight = $('#ucc-table').css('height').slice(0, -2);
        resultHeight = (parseInt(resultHeight, 10) + 64) + 'px';
    } else {
        $('#rod-page-container').hide();
        $('#rod-page-container-bot').hide();
        $('#ucc-page-container').hide();
        $('#ucc-page-container-bot').hide();
        $('#rod-filter-list').hide();
        $('#ucc-filter-list').hide();
        $('#result-modify-table').hide();
        $('#result-print').hide();
        $('#result-csv').hide();
        $('#result-grow-shrink').hide();
        loadPlats($('#plats-select').val());
        resultHeight = $('#plats-table').css('height').slice(0, -2);
        resultHeight = (parseInt(resultHeight, 10) + 64) + 'px';
    }
    //$('.result-container').show().animate({height:$('.result-container').get(0).scrollHeight},400,'swing');
    $('.result-container').show().css({
        height: resultHeight
    });
    $('.result-table').each(function () {
        if ($(this).attr('id') == id2) {
            $('#' + id2).css({
                opacity: '0'
            }).show().animate({
                opacity: '1'
            }, 400, 'swing').addClass('active-table');
        } else {
            $(this).animate({
                opacity: '0'
            }, 400, 'swing', function () {
                $(this).hide().removeClass('active-table');
            });
        }
    });
});

$('.menu-flex-button2').click(function () {
    var id = $(this).attr('id').replace('button', 'menu');

});

$('.checkbox-with-slider').click(function () {
    if (!$(this).hasClass('checkbox-active')) {
        $(this).addClass('checkbox-active');
        $('.checkbox-text').text('YES');
    } else {
        $(this).removeClass('checkbox-active');
        $('.checkbox-text').text('NO');
    }
});

$('.menu-toggle-button').click(function () {
    var id = $(this).attr('id').replace('-toggle', '');
    if ($(this).hasClass('active-menu-toggle-button')) {
        $(this).removeClass('active-menu-toggle-button');
        $('#' + id).animate({
            height: '0'
        }, 200, 'swing', function () {
            $(this).hide();
        });
    } else {
        if (id == 'lot-block-subd') {
            $('#legTypeSels').val('platted');
            $('#sec-town-range-toggle').removeClass('active-menu-toggle-button');
            $('#sec-town-range').animate({
                height: '0'
            }, 200, 'swing', function () {
                $(this).hide();
            });
        } else if (id == 'sec-town-range') {
            $('#legTypeSels').val('unplatted');
            $('#lot-block-subd-toggle').removeClass('active-menu-toggle-button');
            $('#lot-block-subd').animate({
                height: '0'
            }, 200, 'swing', function () {
                $(this).hide().removeClass('active-menu-toggle-button');
            });
        }
        $('#' + id).show().animate({
            height: $('#' + id).get(0).scrollHeight
        }, 200, 'swing', function () {
            $(this).css({
                height: 'auto'
            });
        });
        $(this).addClass('active-menu-toggle-button');
    }
});

function lookupAddress() {
        $.getJSON( "ajax/assessorsearch.php", { address: $('#rodAddSrch').val() } )
            .done( function( json ) {
                if (json.failed == "1") {
                    $('.page-overlay').hide();
                    $('.loading-overlay').hide();
                    errmsg = 'Address Not Found';
                    $(window).scrollTop(0);
                    statusBar("Address Not Found")
                    return;
                }
                if (json.type == "platted") {
                    $('#legTypeSels').val('platted');
                    $.each( json , function( key,val ) {
                        $('#rodSecTxt').val("");
                        $('#rodTownTxt').val("");
                        $('#rodRangeTxt').val("");
                        $('#rodLotTxt').val(json.lot);
                        $('#rodBlockTxt').val(json.block);
                        $('#rodSubDivTxt').val(json.subdivision);
                    })
                 
                    $('#sec-town-range-toggle').removeClass('active-menu-toggle-button');
                    $('#sec-town-range').animate({
                        height: '0'
                    }, 200, 'swing', function () {
                        $(this).hide();
                    });
                    $('#sec-town-range-toggle').removeClass('active-menu-toggle-button');
                
                    var id = $('#lot-block-subd').attr('id').replace('-toggle', '');
                    if (!$('#lot-block-subd').hasClass('active-menu-toggle-button')) {
                        $('#' + id).show().animate({
                            height: $('#' + id).get(0).scrollHeight
                        }, 200, 'swing', function () {
                            $('#lot-block-subd').css({
                                height: 'auto'
                            });
                        });
                        $('#lot-block-subd-toggle').addClass('active-menu-toggle-button');
                    }
                    

                } else {
                    $('#legTypeSels').val('unplatted');
                    $.each( json , function( key,val ) {
                        $('#rodLotTxt').val("");
                        $('#rodBlockTxt').val("");
                        $('#rodSubDivTxt').val("");
                        $('#rodSecTxt').val(json.section);
                        $('#rodTownTxt').val(json.township);
                        $('#rodRangeTxt').val(json.range);
                        $('#rodCall4Txt').val(json.call4);

                    })
                    
                    $('#lot-block-subd').removeClass('active-menu-toggle-button');
                    $('#lot-block-subd').animate({
                        height: '0'
                    }, 200, 'swing', function () {
                        $(this).hide();
                    });
                    $('#lot-block-subd-toggle').removeClass('active-menu-toggle-button');
                
                    var id = $('#sec-town-range').attr('id').replace('-toggle', '');
                    if (!$('#sec-town-range').hasClass('active-menu-toggle-button')) {
                        $('#' + id).show().animate({
                            height: $('#' + id).get(0).scrollHeight
                        }, 200, 'swing', function () {
                            $('#sec-town-range').css({
                                height: 'auto'
                            });
                        });
                        $('#sec-town-range-toggle').addClass('active-menu-toggle-button');
                    }

                }
            })
}

$('#rod-addr-search-button').click(function () {
    lookupAddress();
})

$('#rodAddSrch').focus(function(){
   $(this).removeAttr('placeholder');
});

$('#rodLotTxt').focus(function(){
   $(this).removeAttr('placeholder');
});

$('#rodAddSrch').keypress(function(event){
  if(event.keyCode == 13){
      lookupAddress();
      return false;
  }
});


$('.function-button').click(function () {
    switch ($(this).attr('id')) {
        case 'rod-submit-search':
        case 'ucc-submit-search':
            stopAJ();
            Search(1, 0, 0);
            break;
        case 'rod-clear-search':
        case 'ucc-clear-search':
            Clear();
            break;
    }
});

$('#result-modify-table').click(function () {
    if ($(this).hasClass('active-modify-table')) {
        if ($('#result-grow-shrink').hasClass('shrink')) {
            $('#result-grow-shrink').click();
        }
        $('#result-table-columns').empty();
        $(this).removeClass('active-modify-table');
    } else {
        if ($('#result-grow-shrink').hasClass('grow')) {
            $('#result-grow-shrink').click();
        }
        var data = "<div class='table-modify-button reset-table'>Reset</div>";
        $('.active-table').find('.table-header-button').each(function () {
            if (!$(this).hasClass('search-icons') && !$(this).hasClass('plat-icons')) {
                var temp;
                        temp = $(this).text();
                var column = $(this).children().attr('class');
                data += "<div class='table-modify-button"+($('.'+column).css('display')=='block'?' active-modify-button':'')+"' data-class='" + column + "'>" + temp + "</div>";
            }
        });
        $(this).addClass('active-modify-table');
        $('#result-table-columns').empty();
        $('#result-table-columns').append(data);
    }
});
/*
$('.table-function').on('click','.table-modify-button',function(){
    console.log($(this).attr('data-class'));
    if($(this).hasClass('reset-table')){
        $('.active-table .table-header-button').each(function(){
            var header=$(this).find('div').attr('class')+'-column';
            $('.'+header).css({visibility:'visible'});
        });
        $('.table-function .table-modify-button').each(function(){
            if(!$(this).hasClass('reset-table')){
                if(!$(this).hasClass('active-modify-button')){
                    $(this).addClass('active-modify-button');
                }
            }
        });
    }else{
        $(this).toggleClass('active-modify-button');
        var column=$(this).attr('data-class')+'-column';
        $('.'+column).css({visibility:($('.'+column).css('visibility')=='visible'?'collapse':'visible')});
    }
});
*/
$('.table-function').on('click', '.table-modify-button', function () {
    if ($(this).hasClass('reset-table')) {
        $('.active-table .table-header-button').each(function () {
            var header = $(this).find('div').attr('class');
            $('.' + header).css({
                display: 'block'
            });
            $('.' + header + '-column').css({
                display: 'block'
            });
        });
        $('.table-function .table-modify-button').each(function () {
            if (!$(this).hasClass('reset-table')) {
                if (!$(this).hasClass('active-modify-button')) {
                    $(this).addClass('active-modify-button');
                }
            }
        });
    } else {
        $(this).toggleClass('active-modify-button');
        var column = $(this).attr('data-class');
        $('.' + column).css({
            display: ($('.' + column).css('display') == 'block' ? 'none' : 'block')
        });
    }
});

$('#result-back').click(function () {
    $('html,body').animate({
        scrollTop: $('.menu-container').offset().top
    }, 200, 'swing');
});

$('#result-print').click(function () {
    var type = $('#search-type').val();
    $('.search-icons').css({
        visibility: 'collapse'
    });
    $('.search-feedback').css({
        visibility: 'collapse'
    });
    $('a').css({
        visibility: 'collapse'
    });
    var fieldNames={
        'rodGrantorTxt':'Grantor',
        'rodBookTxt':'Book',
        'rodPageTxt':'Page',
        'rodDocTypeTxt':'Document Type',
        'rodPIDTxt':'PID',
        'rodAddSrch':'Address',
        'rodDateFromTxt':'Date From',
        'rodToDateTxt':'Date To',
        'rodLotTxt':'Lot',
        'rodBlockTxt':'Block',
        'rodSubDivTxt':'Subdivision',
        'rodUnitTxt':'Unit/Tract',
        'rodSecTxt':'Section',
        'rodTownTxt':'Township',
        'rodRangeTxt':'Range',
        'rodCall4Txt':'Quarter 1',
        'rodCall3Txt':'Quarter 2',
        'rodCall2Txt':'Quarter 3',
        'rodCall1Txt':'Quarter 4',
        'rodDetailTxt':'Detail',
        'rodInstTxt':'Instrument Number',
        'uccDebtorTxt':'Debtor/Secured Party',
        'uccDocTypeTxt':'Document Type',
        'ucccollatTxt':'Collateral',
        'uccLegacyTxt':'Legacy Number',
        'uccInstTxt':'Instrument Number',
        'uccFromDateTxt':'Date From',
        'uccToDateTxt':'Date To'
    };
    var form='<table>';
    $('#'+type+'-form :input').each(function(){
        if($(this).val()!=''&&$(this).attr('type')!='hidden'){
            if($(this).attr('name')!='excludeQs'){
                form+="<tr><td>"+fieldNames[$(this).attr('name')]+":</td><td>"+$(this).val()+"</td></tr>";
            }
        }
    });
    form+="</table><br>";
    var data = "<table id='" + type + "-table' class='result-table'>";
    data += $('#' + type + '-table-header').html();
    $('.' + type + '-result').each(function () {
        data += $(this).html();
    });
    data += "</table>";
    newWin = window.open("");
    newWin.document.write(form+data);
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
    $('.search-icons').css({
        visibility: 'visible'
    });
    $('.search-feedback').css({
        visibility: 'visible'
    });
    $('a').css({
        visibility: 'visible'
    });
});

$('#result-csv').click(function () {
    generateCSV();
});

$('#result-grow-shrink').click(function () {
    if ($('#result-modify-table').hasClass('active-modify-table')) {
        $('#result-modify-table').toggleClass('active-modify-table');
        $('#result-table-columns').empty();
    }
    var id = $('.active-table').attr('id').replace('-table', '');
    if ($(this).hasClass('shrink')) {
        $(this).removeClass('shrink');
        $(this).addClass('grow');
        $('.table-function').animate({
            width: '120px'
        }, 400, 'swing');
        $('#' + id + '-filter-list').animate({
            opacity: '0'
        }, 200, 'swing', function () {
            $('#' + id + '-filter-list .filter-list-button').each(function () {
                var key = $(this).attr('id').split('_')[1];
                $(this).find('label').eq(0).text(key);
            });
        }).animate({
            opacity: '1'
        }, 400, 'swing');
    } else {
        $(this).removeClass('grow');
        $(this).addClass('shrink');
        $('.table-function').animate({
            width: '360px'
        }, 400, 'swing');
        $('#' + id + '-filter-list').animate({
            opacity: '0'
        }, 200, 'swing', function () {
            $('#' + id + '-filter-list .filter-list-button').each(function () {
                var title = $(this).attr('title');
                $(this).find('label').eq(0).text(title);
            });
        }).animate({
            opacity: '1'
        }, 400, 'swing');;
    }
});

$('.page-buttons').on('click', '.page-button', function () {
    var page=parseInt($(this).text(),10)-1;
    $('.active-table').find('tbody').each(function(index){
        $(this).css({display:(index==page?'table-row-group':'none')});
    });
    var type = $('#search-type').val();
    var x = $(this).closest('.page-button').index() + 1;
    $('#' + type + '-page-container').find('.page-button').each(function () {
        $(this).removeClass('active-page-button');
    });
    $('#' + type + '-page-container-bot').find('.page-button').each(function () {
        $(this).removeClass('active-page-button');
        $(window).scrollTop(935);
    });
    $('.page-buttons .page-button:nth-child('+x+')').addClass('active-page-button');
    var resultHeight = $('#' + type + '-table').css('height').slice(0, -2);
    resultHeight = (parseInt(resultHeight, 10) + 64);
    var functionHeight = $('.table-function').css('height').slice(0, -2);
    functionHeight = parseInt(functionHeight, 10);
    $('.result-container').css({
        height: (resultHeight > functionHeight ? resultHeight + 'px' : functionHeight + 'px')
    });
});

$('.pdf-close').click(function () {
    $('.pdf-viewer').hide();
    $('.body').show();
    $('.result-container').css({
        height: $('.result-container').get(0).scrollHeight
    });
    $('.footer').show();
    $(window).scrollTop(scroll);
});

$('.clear-form').click(function () {
    Clear();
});

/* functions */
function Clear() {
    stopAJ();
    var type=$('#search-type').val();
    if(type=='rod'){
        var legType=$('#legTypeSels').val();
        $('#'+type+'-form :input').not('#sub-exact').val('');
        $('#legTypeSels').val(legType);
    }else{
        $('#'+type+'-form :input').val('');
    }
    $((type='rod'?'#rodDocTypeData':'#uccDocTypeData')).val('');
    $('.page-overlay').hide();
    $('.loading-overlay').hide();
}

function DataPaging(x, type, pass) {
    var errmsg = '';
    var err = "<tbody class='error-result'><tr><td colspan='5'>" + errmsg + "</td></tr></tbody>";
    var mult = 50;
    var surl = (type == 'rod' ? '../ajax/search-rod.php' : '../ajax/search-ucc.php');
    var data = $('#' + type + '-form').serialize() + '&' + $.param({
        t: type,
        s: x,
        p: pass,
        sort: $('#sort').val()
    });
    xhr = $.post({
        url: surl,
        data: data,
        success: function (msg) {
            if (msg.trim() == "-1" || x + mult > 1000 || msg.trim() == "") {
                $('.page-overlay').hide();
                $('.loading-overlay').hide();
                if (x == 0) {
                    errmsg = 'No Records Found';
                    $('#' + type + '-table').append(err);
                }
                return;
            } else if (msg.trim() == "-5") {
                $('.page-overlay').hide();
                $('.loading-overlay').hide();
                errmsg = 'An Error Occured While Searching';
                $('#' + type + '-table').append(err);
                return;
            } else if (msg.trim() == "-2") {
                $('.page-overlay').hide();
                $('.loading-overlay').hide();
                errmsg = 'Please Enter Search Parameters';
                return;
            } else if (msg.trim() == "-9") {
                return;
            } else {
                try {
                    var obj = JSON.parse(msg);
                    if (x == 0) {
                        if (type == 'rod') {
                            $('#rod-filter-list').empty()
                        } else {
                            $('#ucc-filter-list').empty()
                        }
                        $('.loading-overlay').hide();
                        $('.page-overlay').show();
                        $('#' + type + '-filter-list').append(obj['list']);
                        $('html,body').animate({
                            scrollTop: $('#result').offset().top
                        }, 400);
                        $('#' + type + '-table').append(obj['table']).animate({
                            height: $('#' + type + '-table').get(0).scrollHeight
                        }, 200, 'swing', function () {
                            $(this).css({
                                height: 'auto'
                            });
                        });
                        $('.' + type + '-result').eq(0).show();
                        selected = [];
                    } else {
                        $('#' + type + '-table').append(obj['table']);
                    }
                    $('.table-header-button').each(function(){
                        if($(this).find('div').css('display')=='none'){
                            var thisClass = $(this).find('div').attr('class')
                            $('.'+thisClass).css({display:'none'});
                        }
                    });

                    var resultHeight = $('#' + type + '-table').css('height').slice(0, -2);
                    resultHeight = (parseInt(resultHeight, 10) + 64);
                    var functionHeight = $('.table-function').css('height').slice(0, -2);
                    functionHeight = parseInt(functionHeight, 10);
                    $('.result-container').css({
                        height: (resultHeight > functionHeight ? resultHeight + 'px' : functionHeight + 'px')
                    });
                    $('#' + type + '-current-page').text($('.' + type + '-result').eq(0).find('.table-row').length);
                    $('#' + type + '-total-page').text($('.' + type + '-result').find('.table-row').length);
                    $('#' + type + '-sorted-page').text(obj['sorted']);
                    var page = "<div class='page-button " + ($('.' + type + '-result').length == 1 ? 'active-page-button' : '') + "'>" + $('.' + type + '-result').length + "</div>";
                    var pages = [];
                    $('.page-button').each(function () {
                        pages.push($(this).text());
                    });
                    if (!pages.includes($('.' + type + '-result').length)) {
                        $('#' + type + '-page-buttons').append(page);
                        $('#' + type + '-page-buttons-bot').append(page);
                    }
                    pass = 1;
                    DataPaging($('.' + type + '-result .table-row').length, type, pass);
                } catch (err) {
                    $('.loading-overlay').hide();
                    $('.page-overlay').show();
                    if (msg == "-1") {
                        $(window).scrollTop(0);
                        statusBar("No items found.");
                    } else if (msg == "-2") {
                        $(window).scrollTop(0);
                        statusBar("Please Enter Search Parameters.")
                    } else if (msg == "-5") {
                        $(window).scrollTop(0);
                        statusBar("An Error has occurred.")
                    } else if (msg == "-6") {
                        $(window).scrollTop(0);
                        statusBar("Address Not Found")
                    } else {
                        $(window).scrollTop(0);
                        statusBar("An Error has occurred.")
                    }
                }
            }
        },
        failure: function (msg) {
            errmsg = 'An Error Occured While Searching';
            $('#' + type + '-table').append(err);
        }
    });
}

function FilterDoc(t) {
    filt = 1;
    var doc = '';
    var type = $('.active-table').attr('id').replace('-table', '');
    $(t).toggleClass('active-filter-list-button');
    if ($('#result-grow-shrink').hasClass('shrink')) {
        $('#' + type + '-filter-list .filter-list-button').each(function () {
            var key = $(this).attr('id').split('_')[1];
            $(this).find('label').eq(0).text(key);
        });
    }
    $('.active-filter-list-button').each(function (index) {
        selected.push($(this).attr('id'));
        if (index == '0') {
            doc = ($(this).attr("id").split('_')[1]);
        } else {
            doc += "," + ($(this).attr("id").split('_')[1]);
        }
    });
    $('#' + type + '-filter-list .filter-list-button').each(function () {
        if ($.inArray($(this), all) == '-1') {
            all.push($(this));
        }
    });
    $(($('#search-type').val() == 'rod' ? '#rodDocTypeTxt,#rodDocTypeData' : '#uccDocTypeTxt,#uccDocTypeData')).val(doc);
    Search(1, 0, 0);
}

function generateCSV() {
    var t = $('#search-type').val();
    var formData = $('#' + t + '-form :input').filter(function (index, element) {
        return $(element).val() != '';
    }).serialize() + '&' + $.param({
        sort: $('#sort').val()
    });
    window.open((t == 'rod' ? 'generateRCSV.php?' : 'generateUCSV.php?') + formData);
}

function loadCart() {
    $.post({
        url: '../ajax/cart-load.php',
        success: function (data) {
            $('.cart-overlay').hide();
            $('.cart-list').empty().append(data);
        },
        failure: function (data) {
            console.log(data);
        }
    });
}

function loadPlats(key) {
    $.post({
        url: '../ajax/search-plats.php',
        data: {
            l: key
        },
        success: function (data) {
            $('.loading-overlay').hide();
            $('.plats-result').remove();
            var obj = JSON.parse(data);
            $('#plats-table').append(obj['table']);
            var resultHeight = $('#plats-table').css('height').slice(0, -2);
            resultHeight = (parseInt(resultHeight, 10) + 64) + 'px';
            $('.result-container').animate({
                height: resultHeight
            }, 400, 'swing');
        },
        failure: function (data) {
            console.log(data);
        }
    });
}

function login() {
    $('#loginERR').html("<img id='login-spinner' class='spinner' src='../Images/select2-spinner.gif' alt='Logging In'>");
    var datas = $('#login-form').serialize();
    $.post({
        url: '../ajax/login-new.php',
        data: datas,
        success: function (data) {
            if (data == 1) {
                window.location = 'https://www.okcc.online/index.php?l='+$('#index-language').val();
            } else if (data == '-9') {
                $('#loginERR').text('Error updating cart items');
            } else if (data == '-8') {
                $('#loginERR').text('Error accessing cart items');
            } else if (data == '-7') {
                $('#loginERR').text('Error accessing cart items');
            } else if (data == '-6') {
                $('#loginERR').text('Error logging user');
            } else if (data == '-5') {
                $('#loginERR').text('Invalid Username or Password');
            } else if (data == '-4') {
                $('#loginERR').text('Invalid Username or Password');
            } else if (data == '-3') {
                $('#loginERR').text('Invalid Username or Password');
            } else if (data == '-2') {
                $('#loginERR').text('Invalid Username or Password');
            } else if (data == '-1') {
                $('#loginERR').text('Invalid Username or Password');
            }
        },
        failure: function (data) {
            console.log(data);
        }
    });
}

function logout() {
    $.post({
        url: '../ajax/logout.php',
        success: function (data) {
            if (data == 1) {
                window.location = 'https://www.okcc.online/index.php?l='+$('#index-language').val();
            }
        },
        failure: function (data) {
            console.log(data);
        }
    });
};

function OpenA(tax) {
//    window.open("https://ariisp1.oklahomacounty.org/assessor/Searches/AN-R.asp?Accountno=R" + tax, "_blank");
    window.open("https://ariisp1.oklahomacounty.org/AssessorWP5/RealAccountConfirm.asp?Accountno=" + tax, "_blank");
}

function OpenC(num) {
    var crtWins = num.split(';')
    for (var nmx = 0; nmx < crtWins.length - 1; nmx++) {
        window.open("http://www.oscn.net/dockets/GetCaseInformation.aspx?db=oklahoma&number=" + crtWins[nmx], "_blank");
    }
}

function OpenD(tax, tab, x) {
    $(x).css("color","purple")   
    $('#more-skey').val(tax);
    $('.more-menu').show();
    if(tab=='f'){
        $('#document-feedback').click();
    }else if(tab=='l'){
        $('#document-legal').click();
    }else{
        $('#document-overview').click();
    }
}

function OpenE(tax,tab){
    $('#more-skey').val(tax);
    $('.more-menu').show();
    $('#document-entity').click();
}


function LoadPDF(data) {
        $('#skviewldtxt').show();
        $('#unofficialDocViewFrame').attr('src', "/document.php?s=" + data);
        $('.body').hide();
        $('.footer').hide();
        $('.pdf-viewer').show();
}

function visited(x) {
    $(x).addClass('viewed')
} 

function OpenP(key,x) {
    $(x).addClass('viewed')
    $('#unofficialDocViewFrame').attr('src', "");
    scroll = $(window).scrollTop();
    $('#skview').val(key);
      $.post({
        url: "../ajax/auth-new.php",
          async: "false",
        data: {
            s: key
        },
        cache:false
    }).done(function (data) {
        setTimeout(LoadPDF(data), 1000);
    });
}

function OpenT(tax) {
    window.open("https://ok-oklahomacounty.civicplus.com/545/Public-Access-Search?PropertyID=" + tax, "_blank");
}

function orderDoc(key, type) {
    $.post({url:'../ajax/cart-add.php',data:{key:key,type:type},
        success:function(data){
            if (data == '1') {
                statusBar("Item Added To Cart");
                $("#cart_" + key).attr('src', '/Images/glyphicons-540-cart-tick-muted.png');
            } else if (data == "-1") {
                statusBar("Item Already In Cart");
            } else if (data == "-105") {
                statusBar("You Are Not Logged In");
            } else if (data == "-100") {
                statusBar("Your Session Has Expired, Please Log In");
            }else if(data=="999"){
                var result=prompt('This Document Is Currently Unavailable. Would You Like To Be Notified By Email When It Is Available?','');
                if(result!=''){
                    alertMod(result,key,type);
                }
            } else {
                statusBar("Error Adding Item To Cart");
            }
        },
        failure:function(data){
            console.log(data);
        }
    });
}
function alertMod(email,key,type){
    $.post({url:'../ajax/admin-doc-alert.php',data:{email:email,key:key,type:type},
        success:function(data){
            if(data=='1'){
                statusBar("Notification Confirmed");
            }
        }
    });
}
function PrintJS() {
    /*
    $.post("../ajax/auth.php", {
        s: $('#skview').val()
    }, function (data) {
            var prntFrm = document.createElement("form");
            var prntKey = document.createElement("input");
            prntFrm.method = "POST";
            prntFrm.action = "../Print.php";
            prntFrm.setAttribute("target", "_blank");
            prntKey.name = "s";
            prntKey.value = data;
            prntKey.type = 'hidden';
            prntFrm.appendChild(prntKey);
            document.body.appendChild(prntFrm);
            prntFrm.submit();
            prntFrm.focus();
    });
    */
    $.post({url:'../ajax/auth.php',data:{s:$('#skview').val()},success:function(data){
            window.open('https://www.okcc.online/Print.php?s='+data,'_blank');
        }
    });
}

function removeFromCart(key) {
    $.post({
        url: '../ajax/cart-remove.php',
        data: {
            key: key
        },
        success: function (data) {
            if (data == '1') {
                $('.cart-overlay').show();
                loadCart();
            } else {
                console.log(data);
            }
        },
        failure: function (data) {
            console.log(data);
        }
    });
}

function Search(clear, start, sort) {
    var type = $('#search-type').val();
    if (clear) {
        if (!sort)
            $('#sort').val('id');
    }
    $('.error-result').remove();
    $('.' + type + '-result').remove();
    $('.loading-overlay').show();
    $('#' + type + '-current-page').text('0');
    $('#' + type + '-total-page').text('0');
    $('#' + type + '-sorted-page').text('Instrument #');
    $('#' + type + '-page-buttons').empty();
    $('#' + type + '-page-buttons-bot').empty();
    stopAJ();
    if (filt != 1) {
        $('#' + type + '-filter-list').empty();
    }
    DataPaging(start, type, 1);
}

function sortColumns(column) {
    filt = 1;
    var type = $('.active-table').attr('id').replace('-table', '');
    $('#' + type + '-filter-list .filter-list-button').each(function () {
        if (all.indexOf($(this)) == '-1') {
            all.push($(this));
        }
    });
    var newSort = column + ($('#sort').val() == column + 'd' ? 'a' : 'd');
    $('#sort').val(newSort);
    Search(1, 0, 1);
}

function statusBar(text) {
    $('.status-bar').text(text);
    $('.status-bar').show()
        .animate({
            top: '114px'
        }, 500, "swing")
        .delay(3200)
        .animate({
            top: '0'
        }, 500, "swing", function () {
            $('.status-bar').hide();
        });
}

function stopAJ() {
    if (xhr != null) {
        xhr.abort();
        xhr = null;
    }
}

function banner() {
    var j = 0,
        i = 1;
    $('.banner-image').eq(j).css({
        'z-index': '1'
    }).show();
    setInterval(function () {
        $('.banner-image').eq(j).css({
            'z-index': '1'
        }).show();
        $('.banner-image').eq(i).show();
        $('.banner-image').eq(j).delay(3200).animate({
            opacity: '0'
        }, 800, 'swing', function () {
            $(this).css({
                'z-index': '0',
                opacity: '1'
            }).hide();
        });
        i = (i == $('.banner-image').length - 1 ? 0 : i + 1);
        j = (j == $('.banner-image').length - 1 ? 0 : j + 1);
    }, 4000);
}
/* document detail menu */
$('.document-detail-button').on('click', function () {
    var id = $(this).attr('id').replace('document-', '');
    $('#document-menu').empty().html("<img src='/assets/gifs/select2-spinner.gif' alt='Loading Details...' height='16px' width='16px' style='margin-left:45%; margin-right:auto'/>");
    var url, datas;
    switch (id) {
        case 'overview':
            $('#document-feedback-menu').hide();
            url = '/ajax/overview-new.php';
            datas = {
                s: $('#more-skey').val(),
                t: $('#search-type').val()
            };
            break;
        case 'view':
            $('#document-feedback-menu').hide();
            url = '/ajax/auth-new.php';
            datas = {
                s: $('#more-skey').val()
            };
            break;
        case 'legal':
            $('#document-feedback-menu').hide();
            url = '/ajax/legs-new.php';
            datas = {
                s: $('#more-skey').val()
            };
            break;
        case 'entity':
            $('#document-feedback-menu').hide();
            url = '/ajax/ents-new.php';
            datas = {
                s: $('#more-skey').val(),
                t: $('#search-type').val()
            };
            break;
        case 'feedback':
            $('.document-overlay').hide();
            $('.document-menu').hide();
            $('#document-feedback-menu').show();
            break;
        case 'close':
            $('#document-feedback-menu').hide();
            $('.more-menu').hide();
            $('#document-menu').empty();
            break;
    }
    if (id != 'feedback' && id != 'close') {
        $.post({
            url: url,
            data: datas,
            success: function (data) {
                $('.document-overlay').hide();
                if (id == 'view') {
                    $('#document-menu').empty().html('<iframe class="docdetailframe" src="/document.php?s=' + data + '&h=1" style="width:99%; height: 600px;"></iframe>').show();
                } else {
                    $('#document-menu').empty().html(data).show();
                }
            },
            failure: function (data) {
                console.log(data);
            }
        });
    }
});
$('#feedback-submit').click(function () {
    var datas = $('#feedback-form').serialize();
    $.post({
        url: '../ajax/feedback-new.php',
        data: datas,
        success: function (data) {
            if (data == 1) {
                statusBar('Feedback Successfully Submitted');
            } else if (data == 0) {
                statusBar('Error Submitting Feedback');
            } else if (data == 9) {
                statusBar('You Must Login Before Submitting Feedback');
            }
        },
        failure: function (data) {
            console.log(data);
        }
    });
});
/* autos */
$('#rodDocTypeTxt').autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "ajax/getType.php",
            dataType: "json",
            type: "post",
            data: {
                q: request.term,
                t: "dt",
                s: "1"
            },
            success: function (data) {
                if (data.length) {
                    response(data);
                } else {
                    $('#rodDocTypeData').val(request.term);
                }
            }
        });
    },
    minLength: 1,
    select: function (event, ui) {
        $('#rodDocTypeData').val(ui.item.id);
    }
});
$('#uccDocTypeTxt').autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "ajax/getType.php",
            dataType: "json",
            type: "post",
            data: {
                q: request.term,
                t: "dt",
                s: "3"
            },
            success: function (data) {
                if (data.length) {
                    response(data);
                } else {
                    $('#uccDocTypeData').val(request.term);
                }
            }
        });
    },
    minLength: 1,
    select: function (event, ui) {
        $('#uccDocTypeData').val(ui.item.id);
    }
});

$('#rodSubDivTxt').autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "ajax/getType.php",
            dataType: "json",
            type: "post",
            data: {
                q: request.term,
                t: "sd"
            },
            success: function (data) {
                if (data.length) {
                    response(data);
                } else {
                    $('#rodSubDivTxt').val(request.term);
                }
            }
        });
    },
    minLength: 3,
    select: function (event, ui) {
        $('#rodSubDivTxt').val(ui.item.id);
    }
});

function decodeEntities(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}
/* datepicker */
var datepicker = 0;
$('.datepicker-trigger').on('focus', function () {
    $('.datepicker').hide();
    $('.datepicker-focus').each(function () {
        $(this).removeClass('datepicker-focus');
    });
    $(this).addClass('datepicker-focus');
    datepicker = Date.now();
    var id = $(this).attr('id').replace('Txt', 'picker');
    $('#' + id).show();
    setMonth();
    setYear();
    var year = $('#' + id + ' .year-current').text();
    var month = $('#' + id + ' .month-current').text();
    buildDays(year, month);
});
$('.datepicker').on('click', '.day-select', function () {
    var id = $(this).parents('.datepicker').attr('id');
    $('.datepicker-focus').val(input['month'] + '/' + input['day'] + '/' + input['year']).removeClass('datepicker-focus');
    $('#' + id).hide();
});
$(document).click(function (e) {
    if ($(e.target).closest('.datepicker').length == 0) {
        var temp = Date.now();
        if ((temp - datepicker) > 500) {
            $('.datepicker').hide();
        }
    }
});
