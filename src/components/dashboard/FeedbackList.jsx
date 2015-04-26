var _ = require("lodash");
var React = require("react");

var DataMixins = require("../../mixins/DataMixins");
var FeedbackActions = require("../../actions/FeedbackActions");
var FeedbackStore = require("../../stores/FeedbackStore");

var FEEDBACK_LIMIT = 10;

var FeedbackList = React.createClass({

    mixins: [
        DataMixins.dataRequest,
        DataMixins.eventSubscription(FeedbackStore)
    ],

    getInitialState: function () {
        return {
            feedbacks: [],
            loading: true
        };
    },

    render: function() {
        var loadingClass, feedbackRows;
        if (this.state.loading) {
            loadingClass = "loading";
            feedbackRows = [];
        } else {
            loadingClass = "hide";
            feedbackRows = _.map(this.state.feedbacks, this.getFeedbackRow, this);
        }
        return (
            <div className="panel panel-default latest-feedbacks">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span>
                    <span> Feedbacks</span>
                    <span className="refresh pull-right glyphicon glyphicon-refresh" onClick={this.onRefresh}></span>
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        {feedbackRows}
                    </div>
                    <div className={loadingClass}>Loading...</div>
                    <div className="text-right">
                        <a href="#feedbacks">
                            <span>View All </span>
                            <span className="glyphicon glyphicon-circle-arrow-right"></span>
                        </a>
                    </div>
                </div>
            </div>
        );
    },

    getFeedbackRow: function (feedback) {
        var href = "#feedbacks/" + feedback.orderId;
        var stars = _.map(_.range(feedback.score), function () {
            return (
                <span className="glyphicon glyphicon-star"></span>
            );
        }, this);
        var starsEmpty = _.map(_.range(5 - feedback.score), function () {
            return (
                <span className="glyphicon glyphicon-star-empty"></span>
            );
        }, this);
        return (
            <a href={href} className="list-group-item clearfix" title={"Score: " + feedback.score}>
                <div className="pull-left">{feedback.text}</div>
                <div className="pull-right score">
                    {stars}
                    {starsEmpty}
                </div>
            </a>
        );
    },

    onRefresh: function () {
        this.requestData();
    },

    requestData: function () {
        this.setState({
            loading: true,
            feedbacks: []
        });
        FeedbackActions.requestData();
    },

    onDataReceived: function () {
        this.setState({
            feedbacks: FeedbackStore.getModel().getData(),
            loading: false
        });
    },

    onError: function (xhr) {
        this.setState({
            loading: false
        });
    }

});

module.exports = FeedbackList;