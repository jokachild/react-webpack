var _ = require("lodash");
var EventEmitter = require("events").EventEmitter;
var AppDispatcher = require("../common/AppDispatcher.js");
var UserActions = require("../actions/UserActions").actionTypes;

var UserList = function (componentId) {
    this.componentId = componentId;
    this.users = [];
    this.filterValue = "";
};

UserList.prototype = {

    constructor: UserList,

    getData: function (user) {
        var data = this.data;
        if (this.filterValue) {
            data = this.filter();
        }
        return data;
    },

    filter: function () {
        return _.filter(this.data, function (item) {
            return item.name.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0;
        }, this);
    },

    setFilterValue: function (value) {
        this.filterValue = value;
    }
};

var UserListStore = _.extend({}, EventEmitter.prototype, {

    collection: {},

    createInstance: function (id) {
        this.collection[id] = new UserList(id);
    },

    getInstance: function (id) {
        return this.collection[id];
    },

    requestData: function (id, data, callback) {
        var userList = this.getInstance(id);
        setTimeout(function () {
            userList.data = [{
                id: 1,
                name: "A",
                age: "25"
            }, {
                id: 2,
                name: "B",
                age: "26"
            }, {
                id: 3,
                name: "C",
                age: "24"
            }];
            callback();
        }, 1000)
    },

    handleRequestData: function (action) {
        if (!this.collection[action.componentId]) {
            this.createInstance(action.componentId);
        }
        this.requestData(action.componentId, action.data, _.bind(function (error) {
            if (error) {
                this.emitFail(action.componentId);
            } else {
                this.emitChange(action.componentId);
            }
        }, this));
    },

    emitChange: function (componentId) {
        this.emit("change:" + componentId);
    },

    emitFail: function (componentId) {
        this.emit("fail:" + componentId);
    },

    dispatchRegister: function (action) {
        switch (action.actionType) {
            case UserActions.REQUEST_DATA:
                this.handleRequestData(action);
            break;
            case UserActions.FILTER:
                this.getInstance(action.componentId).setFilterValue(action.data.value);
                this.emitChange(action.componentId)
            break;
        }
    }
});

AppDispatcher.register(_.bind(UserListStore.dispatchRegister, UserListStore));

module.exports = UserListStore;