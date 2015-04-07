var _ = require("underscore");
var React = require("react");

var EA = require("../../common/EventAggregator");

var Definitions = {
    feedbacks: {
        target: "feedbacks",
        title: "New Feedbacks",
        icon: "glyphicon-comment",
        color: "primary"
    },
    tasks: {
        target: "tasks",
        title: "New tasks",
        icon: "glyphicon-tasks",
        color: "green"
    },
    orders: {
        target: "orders",
        title: "New Orders",
        icon: "glyphicon-shopping-cart",
        color: "yellow"
    },
    tickets: {
        target: "tickets",
        title: "New Support Tickets",
        icon: "glyphicon-wrench",
        color: "red"
    }
};

var Aggregations = React.createClass({

    render: function() {
        var aggregations = _.map(_.keys(this.props.data), this.generateAggregationBlock, this);
        return (
            <div className="row">
                {aggregations}
            </div>
        );
    },

    generateAggregationBlock: function (key) {
        var config = Definitions[key],
            panelClass = "panel panel-" + config.color,
            iconClass = "glyphicon " + config.icon;
        return (
            <div className="col-lg-3 col-md-6 aggregation">
                <div className={panelClass}>
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                                <span className={iconClass}></span>
                            </div>
                            <div className="col-xs-9 text-right">
                                <div className="huge">{this.props.data[key]}</div>
                                <div>{config.title}</div>
                            </div>
                        </div>
                    </div>
                    <a href="#" onClick={_.bind(this.handleDetailsClick, this, config.target)}>
                        <div className="panel-footer clearfix">
                            <div className="pull-left">View Details</div>
                            <div className="pull-right">
                                <span className="glyphicon glyphicon-circle-arrow-right"></span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    },

    handleDetailsClick: function (target, e) {
        e.preventDefault();
        EA.emit("navigate", target);
    }

});

module.exports = Aggregations;