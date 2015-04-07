var AppDispatcher = require("../dispatcher/AppDispatcher");

var UserActions = {
    
    actionTypes: {
        REQUEST_DATA: "REQUEST_DATA",
        FILTER: "FILTER",
        SORT: "SORT"
    },

    requestData: function (id, filters) {
        AppDispatcher.dispatch({
            actionType: this.actionTypes.REQUEST_DATA,
            componentId: id,
            data: {
                filters: filters
            }
        });
    },

    filter: function (id, value) {
        AppDispatcher.dispatch({
            actionType: this.actionTypes.FILTER,
            componentId: id,
            data: {
                value: value
            }
        });
    }

};

module.exports = UserActions;