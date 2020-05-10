import * as d3 from 'd3'

var margin = { top: 0, left: 0, right: 0, bottom: 0 }

var height = 400 - margin.top - margin.bottom

var width = 400 - margin.left - margin.right

var svg = d3
  .select('#chart-7')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('transform', `translate(${width/2},${height/2})`)

var pie = d3.pie().value(function(d) {
  return d.amount
})

var radius = 100

var arc = d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius)

var colorScale = d3.scaleOrdinal().range(['pink', 'cyan', 'magenta', 'mauve'])

d3.csv(require('/data/pie-data.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

function ready(datapoints) {
  // console.log(pie(datapoints))

  // svg
  //   .selectAll('path')
  //   .data(pie(datapoints))
  //   .enter()
  //   .append('path')
  //   .attr('d', d => arc(d))
  //   .attr('fill', d => colorScale(d.data.category))
}
