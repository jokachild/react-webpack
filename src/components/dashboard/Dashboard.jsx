var React = require("react");
var Aggregations = require("./Aggregations.jsx");

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
            </div>
        );
    }

});

module.exports = Dashboard;