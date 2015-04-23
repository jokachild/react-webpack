var _ = require("lodash");
var React = require("react");
var d3 = require("d3");

var DonutChart = require("./DonutChart.jsx");

var FeedbackList = React.createClass({

    render: function() {
        return (
            <div className="panel panel-default feedback-chart">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span>
                    <span> Feedbacks Chart</span>
                </div>
                <div className="panel-body">
                    <div className="chart">
                        <DonutChart width={300} height={300}/>
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