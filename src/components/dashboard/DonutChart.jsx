var _ = require("lodash");
var React = require("react");
var d3 = require("d3");

var DonutChart = React.createClass({

    colorSet: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"],

    radius: 150,

    extraRadius: -10,

    render: function() {
        return (
            <svg width="100%" height="100%" viewBox="0 0 300 300" perserveAspectRatio="xMinYMid"></svg>
        );
    },

    componentDidMount: function() {
        this.arc = d3.svg.arc().outerRadius(_.bind(function () {
            return this.radius + this.extraRadius;
        }, this)).innerRadius(this.radius - 70);
        this.pie = d3.layout.pie().sort(null).value(function (d) { return d.value; });
        this.colors = d3.scale.ordinal().range(this.colorSet);

        this.svg = d3.select(this.getDOMNode());
        this.gM = this.svg.append("g")
            .attr("transform", "translate(" + this.radius + ", " + this.radius + ")");
        this.hint = this.gM.append("text")
            .attr("dy", ".35em")
            .style({
                "text-anchor": "middle",
                "font-weight": "bold",
                "font-size": "1.5em"
            });

        this.drawChart(this.props);
    },

    shouldComponentUpdate: function(newProps) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(newProps.data)) {
            this.drawChart(newProps);
        }
        return false;
    },

    drawChart: function (props) {
        this.gM.selectAll(".arc").remove();
        
        var g = this.gM.selectAll(".arc")
            .data(this.pie(props.data))
            .enter()
            .append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", this.arc)
            .style("fill", _.bind(function (d) {
                return this.colors(d.data.key);
            }, this))
            .style("stroke", "#fff")
            .on("mouseover", this.mouseover)
            .on("mouseout", this.mouseout);
    },

    mouseover: function (dataNode) {
        this.svg.selectAll("path").attr("d", this.arc);
        this.extraRadius = 0;
        this.svg.selectAll("path")
            .filter(function(node) {
                return node.data.key === dataNode.data.key;
            })
            .transition()
            .duration(100)
            .attr("d", this.arc);
        this.extraRadius = -10;
        this.hint.text("Score: " + dataNode.data.key);
    },

    mouseout: function (dataNode) {
        this.svg.selectAll("path")
            .transition()
            .duration(100)
            .attr("d", this.arc);
        this.hint.text("");
    }

});

module.exports = DonutChart;