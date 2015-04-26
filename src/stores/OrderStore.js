var _ = require("lodash");
var moment = require("moment");

var AppDispatcher = require("../common/AppDispatcher");
var StoreBase = require("./StoreBase");
var OrderActions = require("../actions/OrderActions").actionTypes;

var ORDER_LIMIT = 10;

var Orders = function () {
    this.url = "/orders"
    this.orders = [];
    this.orderStatus = null;
};

Orders.prototype = {

    constructor: Orders,

    getOrders: function () {
        var data = _.cloneDeep(this.orders);
        if (this.orderStatus) {
            data = this.filter(data);
        }
        _.each(data, this.format, this);
        data = _.sortByOrder(data, ["timestamp"], [false]);
        data = _.take(data, ORDER_LIMIT);
        return data;
    },

    getOrder: function (orderId) {
        var order = _.find(this.orders, function (order) {
            return order.orderId === orderId;
        }, this);
        order = _.cloneDeep(order);
        this.format(order);
        return order;
    },

    saveUrl: function (order) {
        return this.url + "/" + order.orderId;
    },

    format: function (order) {
        order.createTime = moment(order.timestamp).format("MM/DD/YYYY hh:mm");
    },

    filter: function (data) {
        return _.filter(data, function (order) {
            return order.status === this.orderStatus;
        }, this);
    },

    setFilterValue: function (status) {
        this.orderStatus = status;
    },

    onDataReceived: function (orders) {
        this.orders = orders;
    },

    onDataSaved: function (updatedOrder) {
        var order = _.find(this.orders, function (order) {
            return order.orderId === updatedOrder.orderId;
        }, this);
        _.extend(order, updatedOrder);
    },

    onError: function (xhr) {
        this.orders = [];
    }
};

var OrderStore = _.extend({}, {

    model: new Orders(),

    getModel: function () {
        return this.model;
    },

    dispatchRegister: function (action) {
        switch (action.actionType) {
            case OrderActions.REQUEST_DATA:
                this.handleRequestData(null);
            break;
            case OrderActions.FILTER:
                this.getModel().setFilterValue(action.data.status);
                this.emitChange();
            break;
            case OrderActions.SAVE:
                this.handleSaveData(action.data.order);
            break;
        }
    }
}, StoreBase);

AppDispatcher.register(_.bind(OrderStore.dispatchRegister, OrderStore));

module.exports = OrderStore;