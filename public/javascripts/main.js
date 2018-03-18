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
            success: function(data) {
                callback(null, data);
            },
            error: function(err) {
                callback(err);
            }
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

    $('button#logout').click(function() {
        Request.get('/logout', function(res){
            console.log(res);
            window.location.reload();
        });
    });

});