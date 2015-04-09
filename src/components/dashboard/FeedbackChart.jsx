var _ = require("lodash");
var React = require("react");

var FeedbackList = React.createClass({

    render: function() {
        //var feedbacks = _.map(this.props.data, this.getFeedbackRow, this);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span>
                    <span> Feedbacks Chart</span>
                </div>
                <div className="panel-body">
                    <div className="">
                        Chart placeholder
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
    }

});

module.exports = FeedbackList;