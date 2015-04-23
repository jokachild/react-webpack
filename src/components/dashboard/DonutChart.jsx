var _ = require("lodash");
var React = require("react");
var d3 = require("d3");

var data = [{"age":"<5","population":"2704659"},{"age":"5-13","population":"4499890"},{"age":"14-17","population":"2159981"},{"age":"18-24","population":"3853788"},{"age":"25-44","population":"14106543"},{"age":"45-64","population":"8819342"},{"age":"≥65","population":"612463"}];

var DonutChart = React.createClass({

    colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],

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
            pie = d3.layout.pie().sort(null).value(function (d) { return d.population; });

        this.arc = d3.svg.arc().outerRadius(_.bind(function () {
            return radius + this.extraRadius;
        }, this)).innerRadius(radius - 70);

        this.svg = d3.select(this.getDOMNode());
        this.svg.selectAll("*").remove();
        this.svg.attr("width", props.width)
            .attr("height", props.height);

        var gM = this.svg.append("g")
            .attr("transform", "translate(" + props.width / 2 + ", " + props.height / 2 + ")");
        
        _.forEach(data, function (d) {
            d.population = +d.population;
        });

        var g = gM.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", this.arc)
            .style("fill", function (d) {
                return colors(d.data.age);
            })
            .on("mouseover", this.mouseover)
            .on("mouseout", this.mouseout);

        /*g.append("text")
            .attr("transform", function (d) {
                return "translate(" + self.arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .style({
                "text-anchor": "middle",
                "fill": "#fff"
            })
            .text(function (d) {
                return d.data.age;
            });*/
    },

    mouseover: function (dataNode) {
        this.svg.selectAll("path").attr("d", this.arc);
        this.extraRadius = 0;
        this.svg.selectAll("path")
            .filter(function(node) {
                return node.data.age === dataNode.data.age;
            })
            .transition()
            .duration(100)
            .attr("d", this.arc);
        this.extraRadius = -10;
    },

    mouseout: function (dataNode) {
        this.svg.selectAll("path")
            .transition()
            .duration(100)
            .attr("d", this.arc);
    }

});

module.exports = DonutChart;