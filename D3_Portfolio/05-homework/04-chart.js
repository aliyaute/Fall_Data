(function() {

  var margin = { top: 25, left: 25, right: 25, bottom: 25 }
  var height = 400, width = 400;

  // This is weird compared to what we did 
  // in class, but just know that 'svg'
  // is the svg element and you can
  // do all the normal stuff with it
  var svg = d3.select("#chart4")
    .select("svg")
    .attr("height", height + 50)
    .attr("width", width + 50)
    .append("g")
    .attr("transform", "translate (' + margin.left + ',' + margin.top + ')")
  

  var datapoints = [
    {"hotdogs":10,"hamburgers":10,"animal":"dog","name":"Stevie"},
    {"hotdogs":3,"hamburgers":3,"animal":"cat","name":"Nicholas"},
    {"hotdogs":2,"hamburgers":2,"animal":"cat","name":"Bubbletree"},
    {"hotdogs":10,"hamburgers":3,"animal":"cow","name":"Particle"},
    {"hotdogs":7,"hamburgers":5,"animal":"dog","name":"Jumpup"},
    {"hotdogs":4,"hamburgers":9,"animal":"dog","name":"Parlay"},
    {"hotdogs":3,"hamburgers":1,"animal":"cat","name":"Hio"}
  ]

  // Build your scales here
var xPositionScale = d3
  .scaleLinear()
  .domain([0,10])
  .range([0, width])

var yPositionScale = d3
  .scaleLinear()
  .domain([0,10])
  .range([height,0])

 d3.csv("./eating-data.csv")
   .then(ready)
   .catch(function(err) {
     console.log("Failed with", err)
   })  

  function ready(datapoints) {

  // Add your circles and style them here
  
svg
   .selectAll("circle")
   .data(datapoints)
   .enter()
   .append('circle')
   .attr('r', 10)
   .attr('cx', function(d) {
     return xPositionScale(d['hamburgers'])
  })
  .attr('cy', function(d) {
    return yPositionScale(d['hotdogs'])
  })
  .attr('fill', '#EBDEF0')

var yAxis = d3.axisLeft(yPositionScale)
svg
  .append('g')
  .attr('class', 'axis y-axis')
  .call(yAxis)  

var xAxis = d3.axisBottom(xPositionScale)
svg
  .append('g')
  .attr('class', 'axis x-axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis)  

}})