var $ = require("jquery");

var request = function (url, data, success, error) {
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        success: success,
        error: error
    });
};

module.exports = {
    request: request
};