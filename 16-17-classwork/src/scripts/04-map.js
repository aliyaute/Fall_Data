import * as d3 from 'd3'
import * as topojson from 'topojson'
const margin = { top: 20, left: 20, right: 20, bottom: 20 }
const height = 500 - margin.top - margin.bottom
const width = 900 - margin.left - margin.right
const svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const projection = d3.geoMercator()
const nyc = [-74, 40]
const london = [0, 51]
const tehran = [51, 35]
const perth = [115, -31]
const path = d3.geoPath().projection(projection)
const basicLine = d3.line()
d3.json(require('/data/world.topojson'))
  .then(ready)
  .catch(err => console.log('Failed on', err))
function ready(json) {
  const world = topojson.feature(json, json.objects.countries)
  // console.log('the world is', world)
  svg
    .selectAll('.country')
    .data(world.features)
    .enter()
    .append('path')
    .attr('fill', 'lightgrey')
    .attr('stroke', 'white')
    .attr('d', path)
  // console.log(nyc)
  // console.log(projection(nyc))
  svg
    .append('circle')
    .attr('r', 5)
    .attr('transform', `translate(${projection(nyc)})`)
  svg
    .append('circle')
    .attr('r', 5)
    .attr('transform', `translate(${projection(london)})`)
  svg
    .append('circle')
    .attr('r', 5)
    .attr('transform', `translate(${projection(tehran)})`)
  svg
    .append('circle')
    .attr('r', 5)
    .attr('transform', `translate(${projection(perth)})`)
  // Let's draw a line between NYC and London
  let coords = [nyc, london]
  let geoLine = {
    type: 'LineString',
    coordinates: coords
  }
  svg
    .append('path')
    .datum(geoLine)
    .attr('stroke', 'red')
    .attr('fill', 'none')
    .attr('d', path)
  svg
    .append('path')
    .datum([projection(nyc), projection(london)])
    .attr('stroke', 'green')
    .attr('fill', 'none')
    .attr('d', basicLine)
  // Let's draw a line between NYC and Tehran
  coords = [nyc, tehran]
  geoLine = {
    type: 'LineString',
    coordinates: coords
  }
  svg
    .append('path')
    .datum(geoLine)
    .attr('stroke', 'red')
    .attr('fill', 'none')
    .attr('d', path)
  // Let's draw a line between NYC and Perth
  coords = [nyc, perth]
  geoLine = {
    type: 'LineString',
    coordinates: coords
  }
  svg
    .append('path')
    .datum(geoLine)
    .attr('stroke', 'red')
    .attr('fill', 'none')
    .attr('d', path)
  svg
    .append('path')
    .datum([projection(nyc), projection(perth)])
    .attr('stroke', 'green')
    .attr('fill', 'none')
    .attr('d', basicLine)
}
