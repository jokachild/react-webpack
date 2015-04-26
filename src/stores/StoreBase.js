var _ = require("lodash");
var EventEmitter = require("events").EventEmitter;
var RequestHandler = require("../utils/RequestHandlerLocal");

var StoreBase = _.extend({}, EventEmitter.prototype, {

    getData: function (params, callback) {
        var model = this.getModel();
        RequestHandler.request("GET", model.url, params, function (data) {
            model.onDataReceived(data);
            callback();
        }, function (xhr) {
            model.onError(xhr);
            callback(xhr);
        });
    },

    putData: function (data, callback) {
        var model = this.getModel();
        RequestHandler.request("PUT", model.saveUrl(data), data, function (data) {
            model.onDataSaved(data);
            callback();
        }, function (xhr) {
            model.onError(xhr);
            callback(xhr);
        });
    },

    handleRequestData: function (params) {
        this.getData(params, _.bind(function (error) {
            if (error) {
                this.emitFail(error);
            } else {
                this.emitChange();
            }
        }, this));
    },

    handleSaveData: function (data) {
        this.putData(data, _.bind(function (error) {
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