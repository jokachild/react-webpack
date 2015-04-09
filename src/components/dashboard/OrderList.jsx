var _ = require("lodash");
var React = require("react");

var OrderStatusLabels = {
    "1": "Pending",
    "2": "Processing",
    "3": "Shipped",
    "4": "Delivered"
};

var FeedbackList = React.createClass({

    getInitialState: function() {
        return {
            orderStatus: null 
        };
    },

    render: function() {
        var orders = _.map(this.props.data, this.getOrderRow, this);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-shopping-cart"></span>
                    <span> Orders</span>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-right">
                        <a href="#orders">
                            <span>View All </span>
                            <span className="glyphicon glyphicon-circle-arrow-right"></span>
                        </a>
                    </div>
                </div>
            </div>
        );
    },

    getOrderRow: function (order) {
        var href = "#orders/" + order.orderId;
        var cx = React.addons.classSet;
        var statusClass = cx({
            "label label-warning": order.status === 1,
            "label label-info": order.status === 2,
            "label label-success": order.status === 3,
            "label label-danger": order.status === 4
        });
        return (
            <tr>
                <td>
                    <a href={href}>{order.orderId}</a>
                </td>
                <td>{order.timestamp}</td>
                <td>${order.amount}</td>
                <td className="text-center">
                    <span className={statusClass}>{OrderStatusLabels[order.status]}</span>
                </td>
            </tr>
        );
    }

});

module.exports = FeedbackList;