$('#tips_info_add').click(function(){
    if($('#user_table').find('td').last().attr('data-word') == '') return;
    $('#user_table').append("<tr>"+
        "<td class='border py-2 word_col text-center'>"+
        "<input class='info_race info_text' type='text' value='' placeholder='word'/>"+
        "</td>"+
        "<td class='border py-2 text_col text-center'>"+
        "<textarea class='info_text' value='' placeholder='matchArray' ></textarea>"+
        "</td>"+   
        "<td class='border py-2 text_col text-center'>"+
        "<textarea class='word_meaning info_text' value='' placeholder='Meaning' ></textarea>"+
        "</td>"+  
        "<td class='border py-2 button_col text-center' data-word=''>"+
            "<button type='button' class='Word-Update'>Save</button>" + 
            "<button type='button' class='User-Delete mt-2'>Delete</button>" +
        "</td>" +
        "</tr>");
});
$('#math_addBtn').click(function(){
    if($('#user_table').find('td').last().attr('data-word') == ''&&$('#user_table').find('tr').length!=1) return;
    $('#user_table').append("<tr>"+
        "<td class='border py-2 word_col text-center'>"+
        "<input class='info_race info_text' type='text' value='' placeholder='Target Number'/>"+
        "</td>"+
        "<td class='border py-2 text_col text-center'>"+
        "<textarea class='num_Array info_text' value='' placeholder='matchArray' ></textarea>"+
        "</td>"+    
        "<td class='border py-2 text_col text-center'>"+
        "<textarea class='operation info_text' value='' placeholder='matchArray' ></textarea>"+
        "</td>"+    
        "<td class='border py-2 button_col text-center' data-word=''>"+
            "<button type='button' class='Math-Update'>Save</button>" + 
            "<button type='button' class='Math-Delete mt-2'>Delete</button>" +
        "</td>" +
        "</tr>");
});

$(document).ready(function() {
    $(".start").each(function (e) {
        var start = $(this).data("start");
        var time = new Date(parseInt(start));
        $(this).val(time.toLocaleString());
    })
})

function update_user(filter, page, count){
    $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
    $.ajax({
        url : '/setting/word',
        type : 'POST',
        data : {
            filter: filter,
            page: page,
            count: count
        },
        success : function(wordData) {
            data = wordData.words;
            console.log(data);
            if(!data.pageInfo)return;
            $('#user-pagination').empty();
            let pageCount = Math.ceil(data.pageInfo.count / data.pageInfo.perPage);
            if ( pageCount> 0) {
                let content = "";
                content+="<ul class='pagination text-center'>";
                if (data.pageInfo.curPage == 1) {
                    content+="<li class='disabled'>First</li>";
                } else {
                    content+="<li data-page='1'>First</li>";
                }
                var i = (Number(data.pageInfo.curPage) > 5 ? Number(data.pageInfo.curPage) - 4 : 1);
                if (i !== 1) {
                    content+="<li class='disabled'>...</li>";
                }
                for (; i <= (Number(data.pageInfo.curPage) + 4) && i <= pageCount; i++) {
                    if (i == data.pageInfo.curPage) {
                        content+="<li class='active'>" + i  + "</li>";
                    } else {
                        content+="<li data-page='" + i + "'>" + i + "</li>";
                    }
                    if (i == Number(data.pageInfo.curPage) + 4 && i < pageCount) {
                        content+="<li class='disabled'>...</li>";
                    }
                }
                if (data.pageInfo.curPage == pageCount) {
                    content+="<li class='disabled'>Last</li>";
                } else {
                    content+="<li data-page='" + pageCount + "'>Last</li>";
                }
                content+="</ul>";
                $('#user-pagination').html(content);
            }
            $('#count_label').html('<label>' + data.pageInfo.count + ' of ' + data.totalNum + '</label>');
            $('#user_table').empty();
            for (var i=0; i<data.result.length; i++) {
                $('#user_table').append("<tr>"+
                    "<td class='border py-2 word_col text-center'>"+
                    "<input class='info_race info_text' type='text' value='" + data.result[i].word + "' placeholder='word' readonly/>"+
                    "</td>"+
                    "<td class='border py-2 text_col text-center'>"+
                    "<textarea class='info_text' value='' placeholder='matchArray' readonly>" + data.result[i].matchArray.join(',') + "</textarea>"+
                    "</td>"+    
                    
                    "<td class='border py-2 text_col text-center'>"+
                    "<textarea class='word_meaning info_text' value='' placeholder='Meaning' readonly>" + data.result[i].meaning + "</textarea>"+
                    "</td>"+  
                    "<td class='border py-2 button_col text-center' data-word='" + data.result[i].word + "'>"+
                        "<button type='button' class='Word-Update'>Update</button>" + 
                        "<button type='button' class='User-Delete mt-2'>Delete</button>" +
                    "</td>" +
                    "</tr>");
            } 
        },
        error: function(data){
        }
    });
}
function update_math(filter, page, count){
    $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
    $.ajax({
        url : '/setting_math/number',
        type : 'POST',
        data : {
            filter: filter,
            page: page,
            count: count
        },
        success : function(wordData) {
            data = wordData.math;
            console.log(data);
            if(!data.pageInfo)return;
            $('#user-pagination').empty();
            let pageCount = Math.ceil(data.pageInfo.count / data.pageInfo.perPage);
            if ( pageCount> 0) {
                let content = "";
                content+="<ul class='pagination text-center'>";
                if (data.pageInfo.curPage == 1) {
                    content+="<li class='disabled'>First</li>";
                } else {
                    content+="<li data-page='1'>First</li>";
                }
                var i = (Number(data.pageInfo.curPage) > 5 ? Number(data.pageInfo.curPage) - 4 : 1);
                if (i !== 1) {
                    content+="<li class='disabled'>...</li>";
                }
                for (; i <= (Number(data.pageInfo.curPage) + 4) && i <= pageCount; i++) {
                    if (i == data.pageInfo.curPage) {
                        content+="<li class='active'>" + i  + "</li>";
                    } else {
                        content+="<li data-page='" + i + "'>" + i + "</li>";
                    }
                    if (i == Number(data.pageInfo.curPage) + 4 && i < pageCount) {
                        content+="<li class='disabled'>...</li>";
                    }
                }
                if (data.pageInfo.curPage == pageCount) {
                    content+="<li class='disabled'>Last</li>";
                } else {
                    content+="<li data-page='" + pageCount + "'>Last</li>";
                }
                content+="</ul>";
                $('#user-pagination').html(content);
            }
            $('#count_label').html('<label>' + data.pageInfo.count + ' of ' + data.totalNum + '</label>');
            $('#user_table').empty();
            for (var i=0; i<data.result.length; i++) {
                $('#user_table').append("<tr>"+
                    "<td class='border py-2 word_col text-center'>"+
                    "<input class='info_race info_text' type='text' value='" + data.result[i].target_num + "' placeholder='word' readonly/>"+
                    "</td>"+
                    "<td class='border py-2 text_col text-center'>"+
                    "<textarea class=' num_Array info_text' value='' placeholder='Numbers' readonly>" + data.result[i].num_Array.join(',') + "</textarea>"+
                    "</td>"+    
                    "<td class='border py-2 text_col text-center'>"+
                    "<textarea class='operation info_text' value='' placeholder='Operation' readonly>" + data.result[i].operation + "</textarea>"+
                    "</td>"+   
                    "<td class='border py-2 button_col text-center' data-word='" + data.result[i]._id + "'>"+
                        "<button type='button' class='Math-Update'>Update</button>" + 
                        "<button type='button' class='Math-Delete mt-2'>Delete</button>" +
                    "</td>" +
                    "</tr>");
            } 
        },
        error: function(data){
        }
    });
}

$('body').on('click', '#user_find', function(){
    update_user($('#user_filter').val(), 1,  $('#user_perPage').val());
})

$('body').on('change', '#user_perPage', function(){
    update_user($('#user_filter').val(), 1,  $('#user_perPage').val());
})

$('body').on('click', '#user-pagination li', function(){
    if(!$(this).data('page'))
        return;
    update_user($('#user_filter').val(), $(this).data('page'),  $('#user_perPage').val());
})

$('body').on('click', '.User-Delete', function(){
    if($(this).closest('td').data('word') == '') {
        $(this).closest('tr').remove(); return;}
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/setting/delete',
            type : 'POST',
            data : {
                word: $(this).closest('td').data('word'),
            },
            success : function(data) {
                var filter = $('#user_filter').val();
                var page = 1;
                var perPage = $('#user_perPage').val();
                update_user(filter, page, perPage);
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
            }
        });
    }
})

$('body').on('click', '.Math-Delete', function(){
    if($(this).closest('td').data('word') == '') {
        $(this).closest('tr').remove(); return;}
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/setting_math/delete',
            type : 'POST',
            data : {
                id: $(this).closest('td').data('word'),
            },
            success : function(data) {
                var filter = $('#user_filter').val();
                var page = 1;
                var perPage = $('#user_perPage').val();
                update_math(filter, page, perPage);
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
            }
        });
    }
})

$('body').on('click', '.Word-Update', function(){
    var oldWord = $(this).closest('td').data('word');
    console.log($(this).closest('tr').find('textarea').first().val());
    if($(this).text() == 'Update') {
        $(this).closest('tr').find('input').first().attr('readonly', false);
        $(this).closest('tr').find('textarea').first().attr('readonly', false);
        $(this).closest('tr').find('.word_meaning').first().attr('readonly', false);
        $(this).text('Save');
    } else {
        $(this).closest('tr').find('input').first().attr('readonly', true);
        $(this).closest('tr').find('textarea').first().attr('readonly', true);
        $(this).closest('tr').find('.word_meaning').first().attr('readonly', true);
        $(this).text('Update');

        if($(this).closest('tr').find('input').first().val() == '') {
            $(this).closest('tr').find('input').first().val(oldWord);
            alert("Please input word.");
            return;
        }

        if(oldWord == '') {
            var last = $('#user_table').find('tr').last();
            var returnVal = confirm("Are you sure?");
            if(returnVal) {
                $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
                $.ajax({
                    url : '/setting/add',
                    type : 'POST',
                    data : {
                        word: last.find('input').first().val(),
                        matchArrayString: last.find('textarea').first().val(),
                        meaning : last.find('.word_meaning').first().val()
                    },
                    success : function(data) {
                        $('#user_table').find('input').last().attr('readonly', true);
                        $('#user_table').find('textarea').last().attr('readonly', true);
                        $('#user_table').find('.word_meaning').last().attr('readonly', true);
                        var filter = $('#user_filter').val();
                        var page = 1;
                        var perPage = $('#user_perPage').val();
                        update_user(filter, page, perPage);
                    },
                    error: function(data){
                        if(data.error) alert("Error occured..."+data.error);
                        else alert("Error occured...");
                        $('#user_table').find('tr').last().remove();
                    }
                });
            }
        } else {
            var last = $(this).closest('tr');
            var returnVal = confirm("Are you sure?");
            if(returnVal) {
                $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
                $.ajax({
                    url : '/setting/update',
                    type : 'POST',
                    data : {
                        oldword: oldWord,
                        word: last.find('input').first().val(),
                        matchArrayString: last.find('textarea').first().val(),
                        meaning: last.find('.word_meaning').first().val()

                    },
                    success : function(data) {
                        $('#user_table').find('input').attr('readonly', true);
                        $('#user_table').find('textarea').attr('readonly', true);
                        var filter = $('#user_filter').val();
                        var page = 1;
                        var perPage = $('#user_perPage').val();
                        update_user(filter, page, perPage);
                    },
                    error: function(data){
                        if(data.error) alert("Error occured..."+data.error);
                        else alert("Error occured...");
                        var filter = $('#user_filter').val();
                        var page = 1;
                        var perPage = $('#user_perPage').val();
                        update_user(filter, page, perPage);
                    }
                });
            }
        }
    }
})

$('body').on('click', '.Math-Update', function(){
    var oldTarget = $(this).closest('td').data('word');
    if($(this).text() == 'Update') {
        $(this).closest('tr').find('input').first().attr('readonly', false);
        $(this).closest('tr').find('.num_Array').attr('readonly', false);
        $(this).closest('tr').find('.operation').attr('readonly', false);
        $(this).text('Save');
    } else {
        $(this).closest('tr').find('input').first().attr('readonly', true);
        $(this).find('.num_Array').first().attr('readonly', true);
        $(this).find('.operation').first().attr('readonly', true);
        $(this).text('Update');

        if($(this).closest('tr').find('input').first().val() == '') {
            $(this).closest('tr').find('input').first().val(oldTarget);
            alert("Please input word.");
            return;
        }
        if(oldTarget == '') {
            var last = $('#user_table').find('tr').last();
            var returnVal = confirm("Are you sure?");
            if(returnVal) {
                $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
                $.ajax({
                    url : '/setting_math/add',
                    type : 'POST',
                    data : {
                        target_num: last.find('input').first().val(),
                        num_Array: last.find('textarea.num_Array').first().val(),
                        operation: last.find('textarea.operation').first().val()
                    },
                    success : function(data) {
                        $('#user_table').find('input').last().attr('readonly', true);
                        $('#user_table').find('textarea').last().attr('readonly', true);
                        var filter = $('#user_filter').val();
                        var page = 1;
                        var perPage = $('#user_perPage').val();
                        update_math(filter, page, perPage);
                    },
                    error: function(data){
                        if(data.error) alert("Error occured..."+data.error);
                        else alert("Error occured...");
                        $('#user_table').find('tr').last().remove();
                    }
                });
            }
        } else {
            var last = $(this).closest('tr');
            var returnVal = confirm("Are you sure?");
            if(returnVal) {
                $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
                $.ajax({
                    url : '/setting_math/update',
                    type : 'POST',
                    data : {
                        old_id: oldTarget,
                        target_num: last.find('input').first().val(),
                        num_Array: last.find('textarea.num_Array').first().val(),
                        operation: last.find('textarea.operation').first().val()
                    },
                    success : function(data) {
                        $('#user_table').find('input').attr('readonly', true);
                        $('#user_table').find('textarea').attr('readonly', true);
                        var filter = $('#user_filter').val();
                        var page = 1;
                        var perPage = $('#user_perPage').val();
                        update_math(filter, page, perPage);
                    },
                    error: function(data){
                        if(data.error) alert("Error occured..."+data.error);
                        else alert("Error occured...");
                        var filter = $('#user_filter').val();
                        var page = 1;
                        var perPage = $('#user_perPage').val();
                        update_math(filter, page, perPage);
                    }
                });
            }
        }
    }
})

$('#tournament_add').click(function(){
    if($('tr').length > 1 && $('tr:last').find('.room_id').first().text() == '') return;
    var no = $('tr').length;
    $('#room_table').append(
        "<tr data-room_id=''>" +
            "<td class='border py-2 text-center'>" + no + "</td>" +
            "<td class='border py-2 time_col text-center'>" +
                "<input class='start info_race info_text' type='text' value='' placeholder='MM/DD/YYYY, hh:mm:ss PM/AM'/>" +
            "</td>" +
            "<td class='border py-2 number_col text-center'>" +
                "<input class='fee info_race info_text' type='number' value='0'/>" +
            "</td>" +
            // "<td class='border py-2 number_col text-center'>" +
            //     "<input class='prize info_race info_text' type='number' value='0'/>" +
            // "</td>" +
            "<td class='border py-2 text_col text-center'>" +
                "<span class='room_id info_race info_text'></span>" +
            "</td>" +
            "<td class='border py-2 button_col text-center' data-room_id=''>" +
                "<button type='button' class='Room-Delete mt-2'>Delete</button>" +
            "</td>" +
        "</tr>"
    );
})

var lastDelRoomId;

$('body').on('click', '.Room-Delete', function(){
    var roomId = $(this).closest('td').data('room_id');
    if(roomId == '') {
        $(this).closest('tr').remove(); return;}
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        lastDelRoomId = roomId;
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/tournament/delete',
            type : 'POST',
            data : {
                room_id: roomId,
            },
            success : function(data) {
                for (var i = 0; i < $('tr').length; i++) {
                    if ( $('tr').eq(i).data('room_id') == lastDelRoomId ) $('tr').eq(i).remove();
                };
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
            }
        });
    }
})

var oldData = {start: '', fee: '', prize: ''};

$('#tournament_save').click(function(){
    var newData = {
        start: $('tr:last').find('.start').first().val(),
        fee: $('tr:last').find('.fee').first().val(),
        // prize: $('tr:last').find('.prize').first().val(),
        room_id: $('tr:last').find('.room_id').first().text()
    };

    if (newData.room_id != '') return;
    console.log(newData);

    if(newData.start == '' || newData.fee < 0/* || newData.prize < 0*/) {
        $('tr:last').find('.start').first().val('');
        $('tr:last').find('.fee').first().val(0);
        // $('tr:last').find('.prize').first().val(0);
        alert("Input value is invalid. Try again.");
        return;
    }

    var newStartDate = new Date(newData.start);
    if (isNaN(newStartDate)) {
        $('tr:last').find('.start').first().val('');
        $('tr:last').find('.fee').first().val(0);
        // $('tr:last').find('.prize').first().val(0);
        alert("Invalid DateTime input. Try again.");
        return;
    };

    newData.start = newStartDate.getTime();
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/tournament/add',
            type : 'POST',
            data : newData,
            success : function(data) {
                $('tr:last').find('input').attr('readonly', true);
                $('tr:last').data('room_id', data.result);
                $('tr:last').find('td:last').data('room_id', data.result);
                $('tr:last').find('.room_id').first().text(data.result);
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
                $('tr:last').remove();
            }
        });
    }
});

$('#rule_save').click(function(){
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/rule/save',
            type : 'POST',
            data : {rule:$('#rule_content').val()},
            success : function(data) {
                alert('Save succeed!');
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
            }
        });
    }
});

$('#method_save').click(function(){
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/method/save',
            type : 'POST',
            data : {method:$('#method_content').val()},
            success : function(data) {
                alert('Save succeed!');
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
            }
        });
    }
});

$('#policy_save').click(function(){
    var returnVal = confirm("Are you sure?");
    if(returnVal) {
        $.blockUI({ message: '<h1><img src="/img/busy.gif" /> Just a moment...</h1>' });
        $.ajax({
            url : '/policy/save',
            type : 'POST',
            data : {policy:$('#policy_content').val()},
            success : function(data) {
                alert('Save succeed!');
            },
            error: function(data){
                if(data.error) alert("Error occured..."+data.error);
                else alert("Error occured...");
            }
        });
    }
});

$(document).ajaxStop($.unblockUI);