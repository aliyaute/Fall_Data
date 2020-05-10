(function() {

  //changing this SVG to be 400 pixels wide, 
  //200 pixels tall, with a 50 pixel margin the rectangle inside

  // Delete this line, redo it.
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var width = 400 - margin.left - margin.right

  var height = 200 - margin.top - margin.bottom

  var svg = d3
    .select('#chart7')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')  

  // DO NOT CHANGE THIS SECTION
  svg.append("rect")
    .attr("height", 100)
    .attr("width", 300)
    .attr("x", 0)
    .attr("y", 0)
  // DO NOT CHANGE THIS SECTION
})()