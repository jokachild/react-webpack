var _ = require("lodash");
var EventEmitter = require("events").EventEmitter;
var RequestHandler = require("../utils/RequestHandlerLocal");

var StoreBase = _.extend({}, EventEmitter.prototype, {

    requestData: function (data, callback) {
        var model = this.getModel();
        RequestHandler.request(model.url, data, function (data) {
            model.onDataReceived(data);
            callback();
        }, function (xhr) {
            model.onError(xhr);
            callback(xhr);
        });
    },

    handleRequestData: function (data) {
        this.requestData(data, _.bind(function (error) {
            if (error) {
                this.emitFail(error);
            } else {
                this.emitChange();
            }
        }, this));
    },

    emitChange: function () {
        this.emit("change");
    },

    emitFail: function (xhr) {
        this.emit("fail", xhr);
    }

});

module.exports = StoreBase;