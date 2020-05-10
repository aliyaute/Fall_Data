import * as d3 from 'd3'
import * as topojson from 'topojson'

const margin = { top: 20, left: 20, right: 20, bottom: 20 }

const height = 500 - margin.top - margin.bottom

const width = 900 - margin.left - margin.right

const svg = d3
  .select('#chart-7')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const projection = d3.geoMercator()

const path = d3.geoPath().projection(projection)
const lineWidthScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, 20])

Promise.all([
  d3.json(require('/data/world.topojson')),
  d3.csv(require('/data/coordinates.csv')),
  d3.csv(require('/data/transit-data.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

const coordinateStore = d3.map()

function ready([json, coordinateData, transitData]) {
  // Loop through the city/coordinate data
  // and save the coordinates inside the
  // coordinateStore based on the name
  // later we can do coordinateStore.get('London'), etc
  coordinateData.forEach(d => {
    const name = d.name
    const coords = [d.lon, d.lat]
    coordinateStore.set(name, coords)
  })

  const countries = topojson.feature(json, json.objects.countries)
  svg
    .append('g')
    .selectAll('.country')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', 'lightgrey')

  svg
    .selectAll('.city')
    .data(coordinateData)
    .enter()
    .append('circle')
    .attr('class', 'city')
    .attr('r', 3)
    .attr('transform', d => `translate(${projection([d.lon, d.lat])})`)

  svg
    .selectAll('.transit')
    .data(transitData)
    .enter()
    .append('path')
    .attr('d', d => {
      // What is the 'from' city?
      // console.log(d.from)
      // Get the coordinates based on that city's name
      // console.log(coordinateStore.get(d.from))

      // Pull out our coordinates
      const fromCoords = coordinateStore.get(d.from)
      const toCoords = coordinateStore.get(d.to)

      // Build a GeoJSON LineString
      const geoLine = {
        type: 'LineString',
        coordinates: [fromCoords, toCoords]
      }

      // Feed that to our d3.geoPath()
      return path(geoLine)
    })
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', d => lineWidthScale(d.amount))
    .attr('opacity', 0.5)
    .attr('stroke-linecap', 'round')
}
