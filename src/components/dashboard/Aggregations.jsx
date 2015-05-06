var _ = require("lodash");
var React = require("react");

var DataMixins = require("../../mixins/DataMixins");
var AggregationActions = require("../../actions/AggregationActions");
var AggregationStore = require("../../stores/AggregationStore");

var Aggregation = require("./Aggregation.jsx");

var Aggregations = React.createClass({

    mixins: [
        DataMixins.dataRequest,
        DataMixins.eventSubscription(AggregationStore)
    ],

    getInitialState: function () {
        return {
            aggregations: {feedbacks: 0, tasks: 0, orders: 0, tickets: 0}
        };
    },

    componentDidMount: function () {
        this.updateInterval = setInterval(_.bind(this.requestData, this), 30000);
    },

    componentWillUnmount: function () {
        clearInterval(this.updateInterval);
    },

    render: function() {
        var aggregations = _.map(this.state.aggregations, function (value, name) {
            return <Aggregation name={name} value={value} />
        }, this);
        return (
            <div className="row">
                {aggregations}
            </div>
        );
    },

    requestData: function () {
        AggregationActions.requestData();
    },

    onDataReceived: function () {
        this.setState({
            aggregations: AggregationStore.getModel().getData()
        });
    },

    onError: function (xhr) {
    }

});

module.exports = Aggregations;