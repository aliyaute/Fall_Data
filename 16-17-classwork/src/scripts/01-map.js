import * as d3 from 'd3'
import * as topojson from 'topojson'

const margin = { top: 0, left: 0, right: 0, bottom: 0 }

const height = 500 - margin.top - margin.bottom

const width = 900 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const projection = d3.geoMercator()
const graticule = d3.geoGraticule()
const path = d3.geoPath().projection(projection)

d3.json(require('/data/world.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(json) {
  console.log('What is our data?')
  const countries = topojson.feature(json, json.objects.countries)
  console.log(json)
  console.log(countries)
  // countries is not a list, but countries.features is//
  svg
    .selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', 'lightgrey')

  console.log(graticule())

  svg
    .append('path')
    .datum(graticule())
    .attr('d', path) // why is path not in quotes but in quotes before?//
    .attr('stroke', 'black')
    .attr('fill', 'none')
}
