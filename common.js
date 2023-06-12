const rootUrl = window.location.origin;

function ajaxGetSend(callback, url, data) {
    if (url == undefined || url == null || url == '') {
        alert('url undefined');
        return;
    }

    startLoading();

    url = rootUrl + url;

    if (data == undefined || data == null || data == '') {
        data = {};
    }

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: data
    }).done(function (json) {
        endLoading();
        if (callback == undefined || callback == null || callback == '') {
            alert('success!');
        } else {
            callback(json);
        }
        return;
    }).fail(function (xhr, status, errorThrown) {
        endLoading();
        alert('Ajax Failed');
    });
}

function ajaxPostSend(callback, url, data) {
    if (url == undefined || url == null || url == '') {
        alert('url undefined');
        return;
    }

    startLoading();

    url = rootUrl + url;

    if (data == undefined || data == null || data == '') {
        data = {};
    }

    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: data
    }).done(function (json) {
        endLoading();
        if (callback == undefined || callback == null || callback == '') {
            alert('success!');
        } else {
            callback(json);
        }
        return;
    }).fail(function (xhr, status, errorThrown) {
        endLoading();
        alert('Ajax Failed');
    });
}

function startLoading() {
    var loading = ` <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> `

    $('#loading').html(loading);
}

function endLoading() {
    $('#loading').html('');
}