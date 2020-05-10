import * as d3 from 'd3'
import * as topojson from 'topojson'

const margin = { top: 0, left: 0, right: 0, bottom: 0 }

const height = 600 - margin.top - margin.bottom

const width = 900 - margin.left - margin.right

const svg = d3
  .select('#chart-6')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .style('background', 'black')
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const projection = d3.geoAlbersUsa()

// out geoPath needs a PROJECTION variable
const path = d3.geoPath().projection(projection)

Promise.all([
  d3.json(require('/data/pudding/us.topojson')),
  d3.csv(require('/data/pudding/incarceration_2.csv')),
  d3.csv(require('/data/pudding/all_points_5.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready([json, incarceration, allPoints]) {
  const states = topojson.feature(json, json.objects.states)
  states.features = states.features.filter(d => d.id !== 72 && d.id !== 78)
  const stateData = {}
  incarceration.forEach(function(d) {
    stateData[d.id] = d
  })
  // Not sure how to do scale/center/etc?
  // Just use .fitSize to center your map
  // and set everything up nice
  // projection.fitSize([width, height], states)

  svg
    .append('g')
    .attr('transform', 'translate(-140,-10) scale(1.22)')
    .selectAll('.state')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'state')
    .attr('d', path)
    .attr('fill', 'rgba(0,0,0,0.01)')
    .on('mouseenter', function(d) {
      d3.select(this).attr('stroke', 'white')
    })
    .on('mouseleave', function(d) {
      d3.select(this).attr('stroke', 'none')
    })

  /* Weird pudding stuff goes here */
  const radiusScale = d3
    .scaleSqrt()
    .domain([1000, 50000])
    .range([1, 3.5])
    .clamp(true)

  const xExtent = d3.extent(allPoints, d => +d.x)
  const yExtent = d3.extent(allPoints, d => +d.y)

  const jailExtent = d3.extent(allPoints, d => d.jail_black_2010 / d.total_2010)

  const colorScale = d3
    .scaleSequential(d3.interpolatePlasma)
    .domain(jailExtent)
    .clamp(true)

  const xPositionScale = d3
    .scaleLinear()
    .domain(xExtent)
    .range([0, width])
  const yPositionScale = d3
    .scaleLinear()
    .domain(yExtent)
    .range([height, 0])

  svg
    .append('g')
    .lower()
    .selectAll('circle')
    .data(allPoints)
    .enter()
    .append('circle')
    .attr('r', 2)
    .attr('cx', d => xPositionScale(d.x))
    .attr('cy', d => yPositionScale(d.y))
    .attr('fill', d => {
      return colorScale((d.jail_black_2010 / d.total_2010) * 50)
    })
}
