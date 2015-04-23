var _ = require("lodash");
var React = require("react");
var d3 = require("d3");

var DonutChart = React.createClass({

    colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"],

    extraRadius: -10,

    render: function() {
        return (
            <svg></svg>
        );
    },

    componentDidMount: function() {
        this.drawChart(this.props);
    },

    shouldComponentUpdate: function(props) {
        this.drawChart(props)
        return false;
    },

    drawChart: function (props) {
        var radius = Math.min(props.width, props.height) / 2,
            colors = d3.scale.ordinal().range(this.colors),
            pie = d3.layout.pie().sort(null).value(function (d) { return d.value; });

        this.arc = d3.svg.arc().outerRadius(_.bind(function () {
            return radius + this.extraRadius;
        }, this)).innerRadius(radius - 70);

        this.svg = d3.select(this.getDOMNode());
        this.svg.selectAll("*").remove();
        this.svg.attr("width", props.width)
            .attr("height", props.height);

        var gM = this.svg.append("g")
            .attr("transform", "translate(" + props.width / 2 + ", " + props.height / 2 + ")");

        this.hint = gM.append("text")
            .attr("dy", ".35em")
            .style({
                "text-anchor": "middle",
                "font-weight": "bold",
                "font-size": "1.5em"
            });
        
        var g = gM.selectAll(".arc")
            .data(pie(props.data))
            .enter()
            .append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", this.arc)
            .style("fill", function (d) {
                return colors(d.data.key);
            })
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