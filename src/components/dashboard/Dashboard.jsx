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
                {orderId: 10000, timestamp: 1428511077893, status: "pending", amount: 280},
                {orderId: 10001, timestamp: 1428522077893, status: "processing", amount: 550},
                {orderId: 10002, timestamp: 1428533077893, status: "shipped", amount: 1000},
                {orderId: 10003, timestamp: 1428544077893, status: "delivered", amount: 150},
                {orderId: 10004, timestamp: 1428555077893, status: "pending", amount: 480},
                {orderId: 10005, timestamp: 1428566077893, status: "pending", amount: 125},
                {orderId: 10006, timestamp: 1428577077893, status: "shipped", amount: 1200},
                {orderId: 10007, timestamp: 1428588077893, status: "pending", amount: 990},
                {orderId: 10008, timestamp: 1428599077893, status: "shipped", amount: 360},
                {orderId: 10009, timestamp: 1428500077893, status: "processing", amount: 50}
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