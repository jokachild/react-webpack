var _ = require("lodash");
var React = require("react");

var FEEDBACK_LIMIT = 10;

var FeedbackList = React.createClass({

    render: function() {
        var feedbacks = _.map(this.getData(), this.getFeedbackRow, this);
        return (
            <div className="panel panel-default latest-feedbacks">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span>
                    <span> Feedbacks</span>
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        {feedbacks}
                    </div>
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

    getData: function () {
        var data = _.cloneDeep(this.props.data);
        data = _.sortByOrder(data, ["timestamp"], [false]);
        data = _.take(data, FEEDBACK_LIMIT);
        return data;
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
    }

});

module.exports = FeedbackList;