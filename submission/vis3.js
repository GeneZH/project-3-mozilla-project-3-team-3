
function vis3(id_list) {

var div = document.getElementById('vis3_plot');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

var id_set = new Set(id_list);

    var fields = [
    'fear'
    ];

    var showdata = [];
    d3.csv("./data/vis3.csv", function(data) {
        var fieldData = [
            []
        ];
        console.log(data[0]);
        for (i = 0; i < 1; i++)
            fieldData.push([]);

        
        data.forEach(function(d) {
       	if (!id_set.has(d['Response ID']))
                return;
            for (i = 0; i < 1; i++) {
                fieldData[i].push(d[fields[i]]);
            }
        });

        var total = fieldData[0].length;
      


        
       	var num_privacy =  fieldData[0].filter(function(value) { return value == "Loss of privacy" }).length;
       	var num_safe =  fieldData[0].filter(function(value) { return value == "We will be less safe" }).length;
       	var num_noproblem = fieldData[0].filter(function(value) { return value == "I have no fears about a more connected future" }).length;
       	var num_touch =  fieldData[0].filter(function(value) { return value == "We will lose touch with one another" }).length;
       	var num_other =  fieldData[0].filter(function(value) { return value == "Other" }).length;


       	var per_privacy = num_privacy/total;
       	var per_safe =  num_safe/total;
       	var per_noproblem = num_noproblem/total;
       	var per_touch =  num_touch/total;
       	var per_other = num_other/total;
       
       	var showdata = [];
       	showdata.push({ "percentage": per_privacy, "responses":num_privacy });
       	showdata.push({ "percentage": per_safe, "responses":num_safe});
       	showdata.push({ "percentage": per_noproblem, "responses":num_noproblem});
       	showdata.push({ "percentage": per_touch, "responses":num_touch});
       	showdata.push({ "percentage": per_other, "responses":num_other});	

       	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


            radius = Math.min(width, height) / 2;

    
    	
    	var pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.percentage; });

        var svg = d3.select("#vis3_plot").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 'translate(' + (width / 2 + 100) + ',' + (height / 2) + ')');

        var arc = svg.selectAll(".arc")
            .data(pie(showdata))
            .enter().append("g")
            .attr("class", "arc");

       

  

   		var color = d3.scaleOrdinal(["#98abc5", "#7b6888", "#6b486b",  "#d0743c", "#ff8c00"]);

   		
		var path = d3.arc()
		.outerRadius(radius - 10)
		.innerRadius(0);

		var label = d3.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);

	


		arc.append("path")
		  .attr("d", path)
		  .attr("fill", function(d) { return color(d.data.percentage); })
		   ;

		arc.append("text")
		  .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		  .attr("dy", "0.35em")
		  .text(function(d) { return d.data.percentage; });
});

}



