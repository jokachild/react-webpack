var _ = require("lodash");
var React = require("react");
var PureRenderMixin = React.addons.PureRenderMixin;

var EA = require("../../common/EventAggregator");
var Definitions = require("../../common/AggregationDefinitions");

var Aggregation = React.createClass({

    mixins: [
        PureRenderMixin
    ],

    render: function() {
        var config = Definitions[this.props.name],
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
                                <div className="huge">{this.props.value}</div>
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

module.exports = Aggregation;