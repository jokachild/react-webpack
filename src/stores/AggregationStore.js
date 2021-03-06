var _ = require("lodash");

var AppDispatcher = require("../common/AppDispatcher");
var StoreBase = require("./StoreBase");
var API = require("./ApiConfig");
var AggregationActions = require("../actions/AggregationActions").actionTypes;

var Aggregations = function () {
    this.url = API.AGGREGATIONS;
    this.aggregations = [];
};

Aggregations.prototype = {

    constructor: Aggregations,

    getData: function () {
        return _.cloneDeep(this.aggregations);
    },

    onDataReceived: function (aggregations) {
        this.aggregations = aggregations;
    },

    onError: function (xhr) {
        this.aggregations = [];
    }
};

var AggregationStore = _.extend({}, {

    model: new Aggregations(),

    getModel: function () {
        return this.model;
    },

    dispatchRegister: function (action) {
        switch (action.actionType) {
            case AggregationActions.REQUEST_DATA:
                this.handleRequestData(null);
            break;
        }
    }
}, StoreBase);

AppDispatcher.register(_.bind(AggregationStore.dispatchRegister, AggregationStore));

module.exports = AggregationStore;