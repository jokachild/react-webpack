var _ = require("lodash");

var AppDispatcher = require("../common/AppDispatcher");
var StoreBase = require("./StoreBase");
var API = require("./ApiConfig");
var FeedbackActions = require("../actions/FeedbackActions").actionTypes;

var FEEDBACK_LIMIT = 10;

var Feedbacks = function () {
    this.url = API.FEEDBACKS;
    this.feedbacks = [];
};

Feedbacks.prototype = {

    constructor: Feedbacks,

    getData: function () {
        var data = _.cloneDeep(this.feedbacks);
        data = _.sortByOrder(data, ["timestamp"], [false]);
        data = _.take(data, FEEDBACK_LIMIT);
        return data;
    },

    onDataReceived: function (feedbacks) {
        this.feedbacks = feedbacks;
    },

    onError: function (xhr) {
        this.feedbacks = [];
    }
};

var FeedbackStore = _.extend({}, {

    model: new Feedbacks(),

    getModel: function () {
        return this.model;
    },

    dispatchRegister: function (action) {
        switch (action.actionType) {
            case FeedbackActions.REQUEST_DATA:
                this.handleRequestData(null);
            break;
        }
    }
}, StoreBase);

AppDispatcher.register(_.bind(FeedbackStore.dispatchRegister, FeedbackStore));

module.exports = FeedbackStore;