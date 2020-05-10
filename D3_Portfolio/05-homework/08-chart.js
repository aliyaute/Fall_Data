//Every circle's cy to be the vertical center of the graph
//Each circle to be evenly spaced out on the x axis.
//Each circle's size to reflect the weight of the animal. If an animal were 1000 lb, it should have a radius of 50.
(function() {


  // Don't edit any of this
  var height = 50, width = 400;

  var svg = d3.select("#chart8")
    .select("svg")
    .attr("height", height + 50)
    .attr("width", width)
    .select("g")
    .attr("transform", "translate(50, 0)")

  var data = [
    { 'name': 'Panda', 'weight': 150 },
    { 'name': 'Cat', 'weight': 8 },
    { 'name': 'Horse', 'weight': 840 },
    { 'name': 'Pig', 'weight': 100 }
  ]

  // Build your scales here
  var xPositionScale = d3
  .scalePoint()
  .domain(["Panda", "Cat", "Horse", "Pig"])
  .range([0, 300])

  var radiusScale = d3
  .scaleSqrt()
  .domain([0, 1000])
  .range([0, 50]);

  // Set your attributes here
  svg.selectAll("circle")
  .data(data)
    .attr("cx", function(d) {
      return xPositionScale(d.name);
    })
    .attr("cy", height / 2)
    .attr("r", function(d) {
      return radiusScale(d.weight);
    });
})()