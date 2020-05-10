import * as d3 from 'd3'
import * as topojson from 'topojson'
const margin = { top: 0, left: 0, right: 0, bottom: 0 }
const height = 400 - margin.top - margin.bottom
const width = 900 - margin.left - margin.right
const svg = d3
  .select('#chart-3')
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
Promise.all([
  d3.json(require('/data/us_states.json')),
  d3.csv(require('/data/wafflehouses.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))
function ready([json, datapoints]) {
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
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 2)
    .attr('opacity', 0.5)
    .attr('transform', function(d) {
      console.log(d)
      const coords = [d.long, d.lat]
      console.log(projection(coords))
      return `translate(${projection(coords)})`
    })
}
