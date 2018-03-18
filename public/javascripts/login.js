$(function() {
    function buildQueryString(query) {
        if(typeof query === 'object') {
            var queryStringArray = [];
            for(var i in query) {
                queryStringArray.push(i+'='+query[i]);
            }
            if(queryStringArray.length === 0) {
                return '';
            } else {
                return '?' + queryStringArray.join('&')
            }
        } else {
            return '';
        }
    }

    function requestUrl(url, method, data, callback, query) {
        var queryStr = buildQueryString(query);
        $.ajax({
            url: url+queryStr,
            type: method,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            // success: function(data) {
            //     console.log('success')
            //     callback(null, data);
            // },
            // error: function(err) {
            //     console.log('error')
            //     callback(err);
            // }
        }).done((data)=>{
            console.log('success')
            callback(null, data);
        }).fail((err)=>{
            console.log('error')
            callback(err);
        });
    }
    var Request = {
        get: function(url, callback, query) {
            requestUrl(url, 'GET', null, callback, query);
        },
        put: function(url, data, callback, query) {
            requestUrl(url, 'PUT', data, callback, query);
        },
        post: function(url, data, callback, query) {
            requestUrl(url, 'POST', data, callback, query);
        },
        postFormData: function(url, formData, callback) {
            $.ajax({
                url: url,
                data: formData,
                type: 'POST',
                processData: false,
                contentType: false,
                success: function(data) {
                    callback(null, data);
                },
                error: function(err) {
                    callback(err);
                }
            });
        }
    };

    function getConfig() {
        return {
            username: $('#username').val(),
            password: $('#password').val()
        };
    }

    function getURLStr(isSSL) {
        var myuri = window.location.href;
        var tmp = myuri.split(":");
        var IPaddr = tmp[1];
        if (!isSSL) {
            return "http:" + IPaddr + ":8080"
        } else
        return "https:" + IPaddr + ":8992";
    }
    // $( "#myfn" ).submit(function( event ) {
    //     alert( "Handler for .submit() called." );
    //     event.preventDefault();
    // });
    $('#login').click(function() {
        console.log(getConfig())
        Request.post('/login', getConfig(), (err, data)=>{
            console.log(err, data);
            if(err) console.log(err)
            else{
                if(data.message)
                    console.log('error msg', data.message)
                else{
                    let url = getURLStr(false);
                    console.log(url)
                    window.location = url;
                }
            }
        });
        // var fd = new FormData();
        // fd.append('username', $('input#username').val());
        // fd.append('password', $('input#password').val());
        // Request.postFormData('/login', fd, function(err, data) {
        //     if(err) {
        //         console.log('err', err);
        //     } else {
        //         console.log('data', data);
        //     }
        // });
        // console.log('aaa', $('#myfn'))
        // $('#myfn').submit();
    });

});