var _ = require("lodash");
var React = require("react");
var d3 = require("d3");
var $ = require("jquery");

var DataMixins = require("../../mixins/DataMixins");
var FeedbackStore = require("../../stores/FeedbackStore");
var DonutChart = require("./DonutChart.jsx");

var FeedbackList = React.createClass({

    mixins: [
        DataMixins.eventSubscription(FeedbackStore)
    ],

    getInitialState: function () {
        return {
            chartData: []
        }
    },

    render: function() {
        return (
            <div className="panel panel-default feedback-chart">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span>
                    <span> Feedbacks Chart</span>
                </div>
                <div className="panel-body">
                    <div className="chart" ref="chartContainer">
                        <DonutChart data={this.state.chartData} />
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

    componentDidMount: function () {
        /*setTimeout(_.bind(function () {
            this.setState({
                svgSize: this.getChartContainerWidth()
            });
            this.resizeHandler = _.throttle(_.bind(this.onResize, this), 500, {leading: false});
            $(window).on("resize", this.resizeHandler);
        }, this), 0);*/
    },

    componentWillUnmount: function() {
        //$(window).off("resize", this.resizeHandler);
    },

    onDataReceived: function () {
        var feedbacks = FeedbackStore.getModel().getData();
        feedbacks = _.groupBy(feedbacks, function (feedback) {
            return feedback.score;
        }, this);
        feedbacks = _.map(feedbacks, function (f, k) {
            return {
                key: k,
                value: f.length
            };
        }, this);
        this.setState({
            chartData: feedbacks
        });
    },

    onError: function (xhr) {
    },

    onResize: function () {
        var size = this.getChartContainerWidth();
        if (size !== this.state.svgSize) {
            this.setState({
                svgSize: this.getChartContainerWidth()
            });
        }
    },

    getChartContainerWidth: function () {
        var containerWidth = $(this.refs.chartContainer.getDOMNode()).width();
        return Math.floor(containerWidth * 0.75);
    }

});

module.exports = FeedbackList;