var _ = require("lodash");
var React = require("react");

var EA = require("../common/EventAggregator");
var Dashboard = require("./dashboard/Dashboard.jsx");

var Root = React.createClass({

    getInitialState: function() {
        return {
            selectedMenuItem: "dashboard"
        };
    },

    componentDidMount: function () {
        this.navigate("dashboard");
        window.addEventListener("hashchange", this.onHashChange);
        EA.on("navigate", this.navigate);
    },

    componentWillUnmount: function () {
        window.removeEventListener("hashchange", this.onHashChange);
        EA.removeListener("navigate", this.navigate);
    },

    render: function() {
        var component;

        switch (this.state.selectedMenuItem) {
            case "dashboard":
                component = (
                    <Dashboard/>
                );
                break;
            case "feedbacks":
                component = (
                    <div>Feedbacks Content</div>
                );
                break;
            case "tasks":
                component = (
                    <div>Tasks Content</div>
                );
                break;
            case "orders":
                component = (
                    <div>Orders Content</div>
                );
                break;
            case "tickets":
                component = (
                    <div>Tickets Content</div>
                );
                break;
        }

        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">{this.props.title}</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <ul className="nav nav-sidebar">
                            <li className={this.state.selectedMenuItem === "dashboard" ? "active" : null}>
                                <a href="#" onClick={_.bind(this.handleMenuClick, this, "dashboard")}>Dashboard</a>
                            </li>
                            <li className={this.state.selectedMenuItem === "feedbacks" ? "active" : null}>
                                <a href="#" onClick={_.bind(this.handleMenuClick, this, "feedbacks")}>Feedbacks</a>
                            </li>
                            <li className={this.state.selectedMenuItem === "tasks" ? "active" : null}>
                                <a href="#" onClick={_.bind(this.handleMenuClick, this, "tasks")}>Tasks</a>
                            </li>
                            <li className={this.state.selectedMenuItem === "orders" ? "active" : null}>
                                <a href="#" onClick={_.bind(this.handleMenuClick, this, "orders")}>Orders</a>
                            </li>
                            <li className={this.state.selectedMenuItem === "tickets" ? "active" : null}>
                                <a href="#" onClick={_.bind(this.handleMenuClick, this, "tickets")}>Tickets</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        {component}
                    </div>
                </div>
            </div>
        );
    },

    navigate: function (menuItem) {
        location.hash = menuItem;
        this.setState({
            selectedMenuItem: menuItem
        });
    },

    handleMenuClick: function (menuItem, e) {
        e.preventDefault();
        this.navigate(menuItem);
    },

    onHashChange: function () {
        this.navigate(location.hash.slice(1));
    }

});

React.render(<Root title="React Dashboard" />, document.body);

module.exports = Root;