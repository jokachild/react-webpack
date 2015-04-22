var AppDispatcher = require("../common/AppDispatcher");

var FeedbackActions = {
    
    actionTypes: {
        REQUEST_DATA: "REQUEST_FEEDBACKS"
    },

    requestData: function () {
        AppDispatcher.dispatch({
            actionType: this.actionTypes.REQUEST_DATA
        });
    }

};

module.exports = FeedbackActions;