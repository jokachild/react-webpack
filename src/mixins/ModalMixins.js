
var React = require("react");
var $ = require("jquery");

module.exports = {

    modalRender: {
        componentDidMount: function () {
            $(this.getDOMNode())
                .modal()
                .on("hidden.bs.modal", this.props.onClose);
        }
    },

    modalControl: {
        openModal: function (modalComponent) {
            this.modalNode = document.createElement("div");
            $(document.body).append(this.modalNode);
            React.render(modalComponent, this.modalNode);
        },
        closeModal: function () {
            React.unmountComponentAtNode(this.modalNode);
            $(this.modalNode).remove();
            this.modalNode = null;
        }
    }

};