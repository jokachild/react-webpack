var React = require("react");
var Aggregations = require("./Aggregations.jsx");
var FeedbackList = require("./FeedbackList.jsx");
var FeedbackChart = require("./FeedbackChart.jsx");
var OrderList = require("./OrderList.jsx");

var Dashboard = React.createClass({

    getInitialState: function () {
        return {
            aggregations: {feedbacks: 26, tasks: 12, orders: 124, tickets: 13}
        };
    },

    render: function() {
        return (
            <div className="container-fluid">
                <h1 className="page-header">Dashboard</h1>
                <Aggregations data={this.state.aggregations} />
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <FeedbackList/>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <FeedbackChart/>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <OrderList/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Dashboard;