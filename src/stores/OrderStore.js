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

    getData: function () {
        var data = _.cloneDeep(this.orders);
        if (this.orderStatus) {
            data = this.filter(data);
        }
        _.each(data, function (order) {
            order.createTime = moment(order.timestamp).format("MM/DD/YYYY hh:mm");
        }, this);
        data = _.sortByOrder(data, ["timestamp"], [false]);
        data = _.take(data, ORDER_LIMIT);
        return data;
    },

    getOrderById: function (orderId) {
        return _.find(this.getData(), function (order) {
            return order.orderId === orderId;
        }, this);
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

    onError: function (xhr) {
        this.orders = [];
    }
};

var OrderStore = _.extend({}, {

    orders: new Orders(),

    getModel: function () {
        return this.orders;
    },

    dispatchRegister: function (action) {
        switch (action.actionType) {
            case OrderActions.REQUEST_DATA:
                this.handleRequestData(null);
            break;
            case OrderActions.FILTER:
                this.orders.setFilterValue(action.data.status);
                this.emitChange();
            break;
            case OrderActions.SAVE:
                console.log("Attempting to save order...");
                console.log(action.data.order);
                this.emitChange();
            break;
        }
    }
}, StoreBase);

AppDispatcher.register(_.bind(OrderStore.dispatchRegister, OrderStore));

module.exports = OrderStore;