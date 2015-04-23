var _ = require("lodash");

var aggregationsData = {feedbacks: 26, tasks: 12, orders: 124, tickets: 13};

var feedbackData = [
    {orderId: 10000, text: "Feedback...", score: 5, timestamp: 1428590077893},
    {orderId: 10001, text: "Feedback...", score: 2, timestamp: 1428590067893},
    {orderId: 10002, text: "Feedback...", score: 3, timestamp: 1428590057893},
    {orderId: 10003, text: "Feedback...", score: 5, timestamp: 1428590047893},
    {orderId: 10004, text: "Feedback...", score: 4, timestamp: 1428590037893},
    {orderId: 10005, text: "Feedback...", score: 3, timestamp: 1428590027893},
    {orderId: 10006, text: "Feedback...", score: 1, timestamp: 1428590017893},
    {orderId: 10007, text: "Feedback...", score: 4, timestamp: 1428590007893},
    {orderId: 10008, text: "Feedback...", score: 2, timestamp: 1428590997893},
    {orderId: 10009, text: "Feedback...", score: 5, timestamp: 1428590987893}
];

var ordersData = [
    {orderId: 10000, timestamp: 1428511077893, status: "pending", amount: 280},
    {orderId: 10001, timestamp: 1428522077893, status: "processing", amount: 550},
    {orderId: 10002, timestamp: 1428533077893, status: "shipped", amount: 1000},
    {orderId: 10003, timestamp: 1428544077893, status: "delivered", amount: 150},
    {orderId: 10004, timestamp: 1428555077893, status: "pending", amount: 480},
    {orderId: 10005, timestamp: 1428566077893, status: "pending", amount: 125},
    {orderId: 10006, timestamp: 1428577077893, status: "shipped", amount: 1200},
    {orderId: 10007, timestamp: 1428588077893, status: "pending", amount: 990},
    {orderId: 10008, timestamp: 1428599077893, status: "shipped", amount: 360},
    {orderId: 10009, timestamp: 1428500077893, status: "processing", amount: 50}
];

var request = function (url, data, success, error) {
    setTimeout(function () {
        switch (url) {
            case "/aggregations":
                success(_.cloneDeep(aggregationsData));
                break;
            case "/feedbacks":
                success(_.cloneDeep(feedbackData));
                break;
            case "/orders":
                success(_.cloneDeep(ordersData));
                break;
        }
    }, 1000);
};

module.exports = {
    request: request
};