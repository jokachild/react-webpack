var $ = require("jquery");

var request = function (type, url, data, success, error) {
    $.ajax({
        type: type,
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