var React = require("react");
var DataMixins = require("../../mixins/DataMixins");
var UserActions = require("../../actions/UserActions");
var UserListStore = require("../../stores/UserListStore");

var UserTable = React.createClass({

    mixins: [
        DataMixins.dataRequest,
        DataMixins.eventSubscription(UserListStore)
    ],

    getInitialState: function() {
        return {
            loading: true,
            data: null,
            selectedItems: [] 
        };
    },

    render: function() {
        var filter, pagination, thead, tbody, noResults, loading;
        

        if (this.state.data) {
            filter = this.getFilter();
            pagination = this.getPagination();
            thead = this.getTableHead();
            tbody = this.getTableBody();
        } 
        if (this.state.data && !this.state.data.length) {
            noResults = <div className="no-results">No results</div>
        }

        return (
            <div>
                <h2 className="sub-header">List</h2>
                <div className="table-controls clearfix">
                    {filter}
                    {pagination}
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>{thead}</thead>
                        <tbody>{tbody}</tbody>
                    </table>
                </div>
                {noResults}
                <i className={this.state.loading ? "loading" : "hide"}>Loading...</i>
            </div>
        );
    },

    getTableHead: function () {
        return (
            <tr>
                <th>
                    <input type="checkbox" />
                </th>
                <th>Name</th>
                <th>Age</th>
            </tr>
        );
    },

    getTableBody: function () {
        return this.state.data.map(function (item) {
            return (
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                </tr>
            );
        }.bind(this));
    },

    getFilter: function () {
        return (
            <div className="filter pull-left">
                <form className="form-inline">
                    <div className="form-group">
                        <label for="table-filter">Filter list</label>
                        <input type="text" className="form-control" placeholder="Filter..." onChange={this.handleFilterChange} />
                    </div>
                </form>
            </div>
        );
    },

    getPagination: function () {
        return (
            <div className="pull-right">Pagination</div>
        );
    },

    requestData: function () {
        this.setState({
            loading: true
        });
        UserActions.requestData(this.props.componentId, {});
    },

    onDataReceived: function () {
        var UserList = UserListStore.getInstance(this.props.componentId);
        this.setState({
            loading: false,
            data: UserList.getData()
        });
    },

    onError: function () {
        console.log("Error occurred...");
    },

    handleFilterChange: function (e) {
        UserActions.filter(this.props.componentId, e.target.value);
    }

});

module.exports = UserTable;