var React = require("react");
var UserTable = require("./users/UserTable.jsx");

var Root = React.createClass({

    getInitialState: function() {
        return {
            selectedMenuItem: "dashboard"
        };
    },

    render: function() {
        var component;

        switch (this.state.selectedMenuItem) {
            case "dashboard":
                component = (
                    <UserTable key="userList" componentId="userList" />
                );
                break;
            case "menuItem":
                component = (
                    <div>Menu Item Content</div>
                );
                break;
            case "menuItem2":
                component = (
                    <div>Menu Item 2 Content</div>
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
                                <a href="#" onClick={this.handleMenuClick.bind(this, "dashboard")}>Dashboard</a>
                            </li>
                            <li className={this.state.selectedMenuItem === "menuItem" ? "active" : null}>
                                <a href="#" onClick={this.handleMenuClick.bind(this, "menuItem")}>Menu Item</a>
                            </li>
                            <li className={this.state.selectedMenuItem === "menuItem2" ? "active" : null}>
                                <a href="#" onClick={this.handleMenuClick.bind(this, "menuItem2")}>Menu Item 2</a>
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

    handleMenuClick: function (menuItem, e) {
        e.preventDefault();
        this.setState({
            selectedMenuItem: menuItem
        });
    }

});

React.render(<Root title="React Dashboard" />, document.body);

module.exports = Root;