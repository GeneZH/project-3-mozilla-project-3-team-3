vis1();

function vis1() {
    var fields = ['Price', 'Features', 'Safety', 'Security', 'Privacy',
        'Reliability', 'User Review', 'Expert Recommendation', 'Friend or Family Recommendation', 'Convenience'
    ];
    d3.csv("/data/vis1.csv", function(data) {
        var fieldData = [
            []
        ];
        for (i = 0; i < 10; i++)
            fieldData.push([]);

        var showdata = [];
        data.forEach(function(d) {
            for (i = 0; i < 10; i++) {
                fieldData[i].push(parseFloat(d[fields[i]]));
            }
        });

        for (i = 0; i < 10; i++) {
            var minValue = d3.min(fieldData[i]);
            var maxValue = d3.max(fieldData[i]);
            var maxValue = d3.max(fieldData[i]);
            var meanValue = d3.mean(fieldData[i]);
            var std = d3.deviation(fieldData[i]);
            showdata.push({ "key": fields[i], "min": minValue, "max": maxValue, "mean": meanValue, "deviation": std });
        }
        console.log(showdata);

        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var xScale = d3.scaleBand()
            .domain(showdata.map(function(d) { return d.key; }))
            .range([0, width])
            .padding(0.2);

        var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 10]).nice();

        var xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale).ticks(12 * height / width);

        let line = d3.line()
            .x(function(d) {
                return xScale(d.key);
            })
            .y(function(d) {
                return yScale(d.mean);
            });

        var svg = d3.select("#vis1_plot").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //svg.append("g").append("rect").attr("width", width).attr("height", height).attr("class", "plot-bg");

        // Add Axis labels
        svg.append("g")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(-20," + yScale(0.5) + ")");

        svg.append("g").attr("class", "axis axis--y").call(yAxis);

        svg.append("g").selectAll("line")
            .data(showdata).enter()
            .append("line")
            .attr("stroke", "steelblue")
            .attr("x1", function(d) {
                return xScale(d.key);
            })
            .attr("y1", function(d) {
                return yScale(d.mean + d.deviation);
            })
            .attr("x2", function(d) {
                return xScale(d.key);
            })
            .attr("y2", function(d) {
                return yScale(d.mean - d.deviation);
            });

        // Add Error Top Cap
        svg.append("g").selectAll("line")
            .data(showdata).enter()
            .append("line")
            .attr("class", "error-cap")
            .attr("stroke", "steelblue")
            .attr("x1", function(d) {
                return xScale(d.key) - 4;
            })
            .attr("y1", function(d) {
                return yScale(d.mean + d.deviation);
            })
            .attr("x2", function(d) {
                return xScale(d.key) + 4;
            })
            .attr("y2", function(d) {
                return yScale(d.mean + d.deviation);
            });

        // Add Error Bottom Cap
        svg.append("g").selectAll("line")
            .data(showdata).enter()
            .append("line")
            .attr("class", "error-cap")
            .attr("stroke", "steelblue")
            .attr("x1", function(d) {
                return xScale(d.key) - 4;
            })
            .attr("y1", function(d) {
                return yScale(d.mean - d.deviation);
            })
            .attr("x2", function(d) {
                return xScale(d.key) + 4;
            })
            .attr("y2", function(d) {
                return yScale(d.mean - d.deviation);
            });

        // Add Scatter Points
        svg.append("g").attr("class", "scatter")
            .selectAll("circle")
            .data(showdata).enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d.key);
            })
            .attr("cy", function(d) {
                return yScale(d.mean);
            })
            .attr("r", 4);

    });
}