var _ = require("lodash");
var React = require("react");
var $ = require("jquery");

var DataMixins = require("../../mixins/DataMixins");
var ModalMixins = require("../../mixins/ModalMixins");
var OrderActions = require("../../actions/OrderActions");
var OrderStore = require("../../stores/OrderStore");

var OrderModal = React.createClass({

    mixins: [
        DataMixins.eventSubscription(OrderStore),
        ModalMixins.modalRender
    ],

    render: function() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Order #{this.state.order.orderId}</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label for="orderCreateTime" className="col-sm-2 control-label">Created</label>
                                    <span id="orderCreateTime" className="col-sm-10 control-label">{this.state.order.createTime}</span>
                                </div>
                                <div className="form-group">
                                    <label for="orderAmount" className="col-sm-2 control-label">Amount</label>
                                    <span id="orderAmount" className="col-sm-10 control-label">{this.state.order.amount}</span>
                                </div>
                                <div className="form-group">
                                    <label for="orderStatus" className="col-sm-2 control-label">Status</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" value={this.state.order.status} onChange={this.onChangeStatus}>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="orderComment" className="col-sm-2 control-label">Comment</label>
                                    <div className="col-sm-10">
                                        <textarea id="orderComment" className="form-control" value={this.state.order.comment}
                                            placeholder="Leave a comment..." onChange={this.onChangeComment} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveOrder}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    componentWillMount: function() {
        this.setState({
            order: OrderStore.getModel().getOrder(this.props.orderId)
        });
    },

    onDataReceived: function () {
        $(this.getDOMNode()).modal("hide");
    },

    onError: function (xhr) {
        // report an error
    },

    onChangeStatus: function (e) {
        this.updateOrder({
            status: e.target.value
        });
    },

    onChangeComment: function (e) {
        this.updateOrder({
            comment: e.target.value
        });
    },

    updateOrder: function (obj) {
        this.setState({
            order: _.extend(_.cloneDeep(this.state.order), obj)
        });
    },

    saveOrder: function () {
        OrderActions.save(this.state.order);
    }

});

module.exports = OrderModal;