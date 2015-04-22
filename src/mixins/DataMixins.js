
module.exports = {

    dataRequest: {
        componentDidMount: function () {
            setTimeout(function () {
                this.requestData();
            }.bind(this), 0);
        }
    },

    eventSubscription: function (store) {
        return {
            componentDidMount: function () {
                store.on("change", this.onDataReceived);
                store.on("fail", this.onError);
            },
            componentWillUnmount: function () {
                store.removeListener("change", this.onDataReceived);
                store.removeListener("fail", this.onError);
            }
        };
    }

};