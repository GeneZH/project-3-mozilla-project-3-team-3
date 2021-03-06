function vis2(id_list) {

var div = document.getElementById('vis2_plot');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }


var id_set = new Set(id_list);
    

    var fields = [
    'Router', 'Laptop Computer', 'Smart Phone', 'Smart TV', 'Activity Tracker', 'Smarthome Hub', 'Car', 'Smart Thermostat', 'Smart Appliance', 'Smart Door Locks', 'Smart Lighting'
    ];

    var showdata = [];
    d3.csv("./data/vis2.csv", function(data) {
        var fieldData = [
            []
        ];
        console.log(data[0]);
        for (i = 0; i < 11; i++)
            fieldData.push([]);

        
        data.forEach(function(d) {
          if (!id_set.has(d['Response ID']))
                return;
            for (i = 0; i < 11; i++) {
                fieldData[i].push(d[fields[i]]);
            }
        });

        var total = fieldData[0].length;
        console.log(total);

        for (i = 0; i < 11; i++) {

            var responses = fieldData[i].filter(function(value) { return value !== "" }).length;
            var percentage = responses / total;
            showdata.push({ "device": fields[i], "responses": responses, "percentage": percentage });
        }
        console.log(showdata);

   

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


    var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(showdata.map(function(d) { return d.device; }));
    y.domain([0, d3.max(showdata, function(d) { return d.percentage; })]);



     var svg = d3.select("#vis2_plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("percentage");

      svg.selectAll(".bar")
        .data(showdata)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.device); })
          .attr("y", function(d) { return y(d.percentage); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.percentage)})
          .on("mouseover", function(d) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + x.bandwidth() / 2 ;
            var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2 + 1300;
              d3.select("#tooltip2")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + "px")
                        .select("#value")
                        .text(d.responses);

                    d3.select("#tooltip2").classed("hidden", false);
            })
         .on("mouseout", function() {
            d3.select("#tooltip2").classed("hidden", true);
         });

        


        d3.select("#vis2_checkbox").on("change", change1);

        var sortTimeout = setTimeout(function() {
          d3.select("#vis2_checkbox").property("checked", true).each(change1);
        }, 2000);

        function change1() {
          clearTimeout(sortTimeout);



         var x0 = x.domain(showdata.sort(this.checked
        ? function(a, b) { return a.percentage - b.percentage; }
        : function(a, b) { return b.percentage - a.percentage; })
        .map(function(d) { return d.device; }))
        .copy();
      

        svg.selectAll("rect")
           .sort(function(a, b) {
              return x0(a.device) - x0(b.device);
                
            });


        var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };


    transition.selectAll("rect")
        .delay(delay)
        .attr("x", function(d) { return x0(d.device); });


        transition.select(".x.axis")
        .call(d3.axisBottom(x))
      .selectAll("g")
        .delay(delay);

  }

        });


}