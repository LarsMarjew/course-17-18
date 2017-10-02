var svg = d3.select("svg"),
    margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
//Adds margins to the BasicBarchart, it determines the width and height.

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
//Adds the scales with all the attributes

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//The var G creates a new SVG element, positions the newly made SVG in place

d3.tsv("data.tsv", function (d) {
    d.tijd = +d.tijd;
    return d;
}, function (error, data) {
    if (error) throw error;
//Loading the data form TSV file
    
    x.domain(data.map(function (d) {
        return d.locatie;
    }));
    //Mapping data to the x scale
    
    y.domain([0, d3.max(data, function (d) {
        return d.tijd;
    })]);
    //Sets up data for the y scale

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    //Adds attributes for the x scale

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
    //Adds attributes for the y scale

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.locatie);
        })
        .attr("y", function (d) {
            return y(d.tijd);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.tijd);
        });
    //Connects all the data to the bars in our Barchart
});

//Mike Bostock's example of a baiscbarchart
//https://bl.ocks.org/mbostock/3885304