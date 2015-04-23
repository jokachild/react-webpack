var AppDispatcher = require("../common/AppDispatcher");

var AggregationActions = {
    
    actionTypes: {
        REQUEST_DATA: "REQUEST_AGGREGATIONS"
    },

    requestData: function () {
        AppDispatcher.dispatch({
            actionType: this.actionTypes.REQUEST_DATA
        });
    }

};

module.exports = AggregationActions;