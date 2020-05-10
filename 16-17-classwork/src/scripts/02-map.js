import * as d3 from 'd3'
import * as topojson from 'topojson'
const margin = { top: 0, left: 0, right: 0, bottom: 0 }
const height = 400 - margin.top - margin.bottom
const width = 900 - margin.left - margin.right
const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const colorScale = d3
  .scaleOrdinal()
  .range([
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5'
  ])
const projection = d3.geoAlbersUsa().scale(600)
const path = d3.geoPath().projection(projection)
d3.json(require('/data/us_states.json'))
  .then(ready)
  .catch(err => console.log('Failed on', err))
function ready(json) {
  console.log('What is our data?')
  // console.log(json)
  const states = topojson.feature(json, json.objects.us_states)
  svg
    .selectAll('path')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', function(d) {
      console.log(d.properties.region_big)
      return colorScale(d.properties.region_big)
    })

  svg
    .selectAll('text')
    .data(states.features)
    .enter()
    .append('text')
    .text(function(d) {
      return d.properties.postal
    })
    .attr('transform', function(d) {
      console.log(path.centroid(d))
      return `translate(${path.centroid(d)})`
    })
    .attr('text-anchor', 'middle')
    .attr('text-alignment', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', 12)
    .attr('dy', function(d) {
      if (d.properties.postal === 'DC') {
        return 10
      } else {
        return 0
      }
    })
    .attr('dx', function(d) {
      if (d.properties.postal === 'DC') {
        return 10
      } else if (d.properties.postal === 'DE') {
        return 10
      } else {
        return 0
      }
    })
}
