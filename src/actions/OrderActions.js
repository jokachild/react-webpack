var AppDispatcher = require("../common/AppDispatcher");

var OrderActions = {
    
    actionTypes: {
        REQUEST_DATA: "REQUEST_ORDERS",
        FILTER: "FILTER_ORDERS",
        SORT: "SORT_ORDERS"
    },

    requestData: function () {
        AppDispatcher.dispatch({
            actionType: this.actionTypes.REQUEST_DATA
        });
    },

    filter: function (status) {
        AppDispatcher.dispatch({
            actionType: this.actionTypes.FILTER,
            data: {
                status: status
            }
        });
    },

    sort: function (col, dir) {
        AppDispatcher.dispatch({
            actionType: this.actionTypes.FILTER,
            data: {
                col: col,
                dir: dir
            }
        });
    }

};

module.exports = OrderActions;