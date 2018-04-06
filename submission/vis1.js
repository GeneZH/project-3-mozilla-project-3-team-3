vis1();

function vis1() {
    var fields = ['Price', 'Features', 'Safety', 'Security', 'Privacy',
        'Reliability', 'User Review', 'Expert REC', 'Friend/Family REC', 'Convenience'
    ];
    d3.csv("./data/vis1.csv", function(data) {
        var fieldData = [
            []
        ];
        console.log(data[0]);
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



        svg.append("g")
            .attr("class", "errorbar").selectAll("line")
            .data(showdata).enter()
            .append("line")
            .attr("class", "error-line")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("x1", function(d) {
                return xScale(d.key) + 35;
            })
            .attr("y1", function(d) {
                return yScale(d.mean + d.deviation);
            })
            .attr("x2", function(d) {
                return xScale(d.key) + 35;
            })
            .attr("y2", function(d) {
                return yScale(d.mean - d.deviation);
            });

        // Add Error Top Cap
        svg.append("g")
            .attr("class", "errorbar").selectAll("line")
            .data(showdata).enter()
            .append("line")
            .attr("class", "top-error-cap")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("x1", function(d) {
                return xScale(d.key) - 4 + 35;
            })
            .attr("y1", function(d) {
                return yScale(d.mean + d.deviation);
            })
            .attr("x2", function(d) {
                return xScale(d.key) + 4 + 35;
            })
            .attr("y2", function(d) {
                return yScale(d.mean + d.deviation);
            });

        // Add Error Bottom Cap
        svg.append("g")
            .attr("class", "errorbar")
            .selectAll("line")
            .data(showdata).enter()
            .append("line")
            .attr("class", "bot-error-cap")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("x1", function(d) {
                return xScale(d.key) - 4 + 35;
            })
            .attr("y1", function(d) {
                return yScale(d.mean - d.deviation);
            })
            .attr("x2", function(d) {
                return xScale(d.key) + 4 + 35;
            })
            .attr("y2", function(d) {
                return yScale(d.mean - d.deviation);
            });

        // Add Scatter Points
        svg.append("g").attr("class", "scatter")
            .selectAll("circle")
            .data(showdata).enter()
            .append("circle")
            .attr("r", 3.5)
            .attr("fill", "red")
            .attr("cx", function(d) {
                return xScale(d.key) + 35;
            })
            .attr("cy", function(d) {
                return yScale(d.mean);
            })
            .attr("r", 4);

        // Add Axis labels
        svg.append("g")
            .attr("class", "x axis")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(0," + yScale(0.5) + ")");

        svg.append("g").call(yAxis);

        d3.select("#sortChoice1").on("change", change);
        d3.select("#sortChoice2").on("change", change);
        d3.select("#sortChoice3").on("change", change);


        function change() {

            if(document.getElementById("sortChoice1").checked)
            	showdata.sort(function(a, b) { return fields.indexOf(a.key) - fields.indexOf(b.key); });
            if(document.getElementById("sortChoice2").checked)
            	showdata.sort(function(a, b) { return a.mean - b.mean; });
            if(document.getElementById("sortChoice3").checked)
            	showdata.sort(function(a, b) { return a.deviation - b.deviation; });
            xScale = d3.scaleBand()
                .domain(showdata.map(function(d) { return d.key; }))
                .range([0, width])
                .padding(0.2);

            yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, 10]).nice();

            xAxis = d3.axisBottom(xScale);
            yAxis = d3.axisLeft(yScale).ticks(12 * height / width);
            console.log(svg.selectAll(".errorbar"));

            var errorbars = svg.selectAll(".errorbar").selectAll(".error-line")
                .data(showdata);
            errorbars.exit().remove();
            errorbars.enter().append("line");
            errorbars.transition()
                .duration(500)
                .attr("x1", function(d) {
                    return xScale(d.key) + 35;
                })
                .attr("y1", function(d) {
                    return yScale(d.mean + d.deviation);
                })
                .attr("x2", function(d) {
                    return xScale(d.key) + 35;
                })
                .attr("y2", function(d) {
                    return yScale(d.mean - d.deviation);
                });



            var toperrorcap = svg.selectAll(".errorbar").selectAll(".top-error-cap")
                .data(showdata);
            toperrorcap.exit().remove();
            toperrorcap.enter().append("line");
            toperrorcap.transition()
                .duration(500)
                .attr("x1", function(d) {
                    return xScale(d.key) - 4 + 35;
                })
                .attr("y1", function(d) {
                    return yScale(d.mean + d.deviation);
                })
                .attr("x2", function(d) {
                    return xScale(d.key) + 4 + 35;
                })
                .attr("y2", function(d) {
                    return yScale(d.mean + d.deviation);
                });

            var boterrorcap =
                svg.selectAll(".errorbar").selectAll(".bot-error-cap")
                .data(showdata);
            boterrorcap.exit().remove();
            boterrorcap.enter().append("circle");
            boterrorcap.transition()
                .duration(500)
                .attr("x1", function(d) {
                    return xScale(d.key) - 4 + 35;
                })
                .attr("y1", function(d) {
                    return yScale(d.mean - d.deviation);
                })
                .attr("x2", function(d) {
                    return xScale(d.key) + 4 + 35;
                })
                .attr("y2", function(d) {
                    return yScale(d.mean - d.deviation);
                });

            var points = svg.selectAll(".scatter").selectAll("circle")
                .data(showdata);
            points.exit().remove();
            points.enter().append("line");
            points.transition()
                .duration(500)
                .attr("cx", function(d) {
                    return xScale(d.key) + 35;
                })
                .attr("cy", function(d) {
                    return yScale(d.mean);
                });

            svg.select(".x.axis").transition().duration(500).call(d3.axisBottom(xScale));

        };




    });
}