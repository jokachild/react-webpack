var _ = require("lodash");
var React = require("react");
var cx = React.addons.classSet;
var moment = require("moment");

var OrderStatus = {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered"
};

var ORDER_LIMIT = 10;

var FeedbackList = React.createClass({

    getInitialState: function() {
        return {
            orderStatus: null 
        };
    },

    render: function() {
        var orderRows = _.map(this.getData(), this.getOrderRow, this);
        return (
            <div className="panel panel-default latest-orders">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-shopping-cart"></span>
                    <span> Orders</span>
                    <span className="refresh pull-right glyphicon glyphicon-refresh" onClick={this.onRefresh}></span>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Created</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderRows}
                            </tbody>
                        </table>
                    </div>
                    <div className="clearfix">
                        <div className="pull-left">
                            {this.getStateFilter()}
                        </div>
                        <div className="pull-right text-right view-all-block">
                            <a href="#orders">
                                <span>View All </span>
                                <span className="glyphicon glyphicon-circle-arrow-right"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    getData: function () {
        var data = _.cloneDeep(this.props.data);
        if (this.state.orderStatus) {
            data = _.filter(data, function (order) {
                return order.status === this.state.orderStatus;
            }, this);
        }
        data = _.sortByOrder(data, ["timestamp"], [false]);
        data = _.take(data, ORDER_LIMIT);
        return data;
    },

    getOrderRow: function (order) {
        var href = "#orders/" + order.orderId;
        var statusClass = cx({
            "label label-warning": order.status === OrderStatus.PENDING,
            "label label-info": order.status === OrderStatus.PROCESSING,
            "label label-success": order.status === OrderStatus.SHIPPED,
            "label label-danger": order.status === OrderStatus.DELIVERED
        });
        return (
            <tr>
                <td>
                    <a href={href}>{order.orderId}</a>
                </td>
                <td>{moment(order.timestamp).format("MM/DD/YYYY hh:mm")}</td>
                <td>${order.amount}</td>
                <td className="text-center">
                    <span className={statusClass}>{order.status}</span>
                </td>
            </tr>
        );
    },

    getStateFilter: function () {
        var filterButtonClass = cx({
            "btn-default": this.state.orderStatus === null,
            "btn-warning": this.state.orderStatus === OrderStatus.PENDING,
            "btn-info": this.state.orderStatus === OrderStatus.PROCESSING,
            "btn-success": this.state.orderStatus === OrderStatus.SHIPPED,
            "btn-danger": this.state.orderStatus === OrderStatus.DELIVERED
        }) + " btn filter-state-btn dropdown-toggle";
        var filterButtonText = this.state.orderStatus || "all";
        return (
            <div className="btn-group">
                <button type="button" className={filterButtonClass} data-toggle="dropdown" aria-expanded="false">
                    {_.capitalize(filterButtonText)} <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu">
                    <li><a href="#" onClick={_.bind(this.onSelectFilter, this, OrderStatus.PENDING)}>{_.capitalize(OrderStatus.PENDING)}</a></li>
                    <li><a href="#" onClick={_.bind(this.onSelectFilter, this, OrderStatus.PROCESSING)}>{_.capitalize(OrderStatus.PROCESSING)}</a></li>
                    <li><a href="#" onClick={_.bind(this.onSelectFilter, this, OrderStatus.SHIPPED)}>{_.capitalize(OrderStatus.SHIPPED)}</a></li>
                    <li><a href="#" onClick={_.bind(this.onSelectFilter, this, OrderStatus.DELIVERED)}>{_.capitalize(OrderStatus.DELIVERED)}</a></li>
                    <li className="divider"></li>
                    <li><a href="#" onClick={_.bind(this.onSelectFilter, this, null)}>All</a></li>
                </ul>
            </div>
        );
    },

    onSelectFilter: function (state, e) {
        e.preventDefault();
        this.setState({
            orderStatus: state
        });
    },

    onRefresh: function () {
        console.log("Refresh recent orders...");
    }

});

module.exports = FeedbackList;