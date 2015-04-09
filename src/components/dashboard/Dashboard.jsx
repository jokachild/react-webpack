var React = require("react");
var Aggregations = require("./Aggregations.jsx");
var FeedbackList = require("./FeedbackList.jsx");
var FeedbackChart = require("./FeedbackChart.jsx");
var OrderList = require("./OrderList.jsx");

var Dashboard = React.createClass({

    getInitialState: function () {
        return {
            aggregations: {feedbacks: 26, tasks: 12, orders: 124, tickets: 13},
            feedbacks: [
                {orderId: 10000, text: "Feedback...", score: 5, timestamp: 1428590077893},
                {orderId: 10001, text: "Feedback...", score: 2, timestamp: 1428590067893},
                {orderId: 10002, text: "Feedback...", score: 3, timestamp: 1428590057893},
                {orderId: 10003, text: "Feedback...", score: 5, timestamp: 1428590047893},
                {orderId: 10004, text: "Feedback...", score: 4, timestamp: 1428590037893},
                {orderId: 10005, text: "Feedback...", score: 3, timestamp: 1428590027893},
                {orderId: 10006, text: "Feedback...", score: 1, timestamp: 1428590017893},
                {orderId: 10007, text: "Feedback...", score: 4, timestamp: 1428590007893},
                {orderId: 10008, text: "Feedback...", score: 2, timestamp: 1428590997893},
                {orderId: 10009, text: "Feedback...", score: 5, timestamp: 1428590987893}
            ],
            orders: [
                {orderId: 10000, timestamp: 1428590077893, status: 1, amount: 280},
                {orderId: 10001, timestamp: 1428590067893, status: 2, amount: 550},
                {orderId: 10002, timestamp: 1428590057893, status: 3, amount: 1000},
                {orderId: 10003, timestamp: 1428590047893, status: 4, amount: 150},
                {orderId: 10000, timestamp: 1428590077893, status: 1, amount: 280}
            ]
        };
    },

    render: function() {
        return (
            <div className="container-fluid">
                <h1 className="page-header">Dashboard</h1>
                <Aggregations data={this.state.aggregations} />
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <FeedbackList data={this.state.feedbacks} />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <FeedbackChart data={this.state.feedbacks} />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <OrderList data={this.state.orders}/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Dashboard;