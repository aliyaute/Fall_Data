import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }

const height = 400 - margin.top - margin.bottom

const width = 780 - margin.left - margin.right

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

const monthColor = ['Jul', 'Aug', 'Sep', 'Oct']
// I give you a month
// you give me back a number of radians
const angleScale = d3
  // .scalePoint()
  // .padding(0.5)
  .scaleBand()
  .domain(months)
  .range([0, Math.PI * 2])

const radius = 150

const radiusScale = d3
  .scaleLinear()
  .domain([0, 112597920.5])
  .range([40, radius])

const arc = d3
  .arc()
  .innerRadius(function(d) {
    return 0
  })
  .outerRadius(function(d) {
    return radiusScale(d.data.pounds)
  })

const labelArc = d3
  .arc()
  .innerRadius(60)
  .outerRadius(60)
  .startAngle(d => angleScale(d))
  .endAngle(d => angleScale(d) + angleScale.bandwidth())

const pie = d3
  .pie()
  .value(1 / 12)
  .sort(null)

const colorScale = d3
  .scaleLinear()
  .domain([0, 112597920.5])
  .range(['lightblue', 'navy'])

d3.csv(require('/data/2017_CAD_landings_Monthly.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(datapoints) {
  const container = svg
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  container
    .append('text')
    .attr('x', 0)
    .attr('y', -140)
    .attr('font-size', 28)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 600)

  container
    .selectAll('path')
    .data(pie(datapoints))
    .enter()
    .append('path')
    .attr('class', function(d) {
      return d.data.month
    })
    .attr('d', arc)
    .attr('fill', function(d) {
      return colorScale(d.data.pounds)
    })

  container
    .append('circle')
    .attr('fill', '#666')
    .attr('r', 2)

  container
    .selectAll('.month-label')
    .data(angleScale.domain())
    .enter()
    .append('text')
    .text(d => d)
    // .attr('y', -radius) // set it up at the top of the chart
    .attr('dy', 4.5) // give a little offset to push it higher
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('transform', function(d) {
      return `translate(${labelArc.centroid(d)})`
    })
    .style('fill', function(d) {
      if (d === 'Dec' || d === 'Jun' || d === 'May') {
        return 'white'
      } else {
        return 'black'
      }
    })
}
