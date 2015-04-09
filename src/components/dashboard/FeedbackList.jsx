var _ = require("lodash");
var React = require("react");

var FeedbackList = React.createClass({

    render: function() {
        var feedbacks = _.map(this.props.data, this.getFeedbackRow, this);
        return (
            <div className="panel panel-default">
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

    getFeedbackRow: function (feedback) {
        var href = "#feedbacks/" + feedback.orderId;
        var cx = React.addons.classSet;
        // TODO show stars
        var scoreClass = cx({
            "pull-right label label-success": feedback.score > 3,
            "pull-right label label-warning": feedback.score === 3,
            "pull-right label label-danger": feedback.score < 3
        });
        return (
            <a href={href} className="list-group-item clearfix">
                <div className="pull-left">{feedback.text}</div>
                <div className={scoreClass}>{feedback.score}</div>
            </a>
        );
    }

});

module.exports = FeedbackList;