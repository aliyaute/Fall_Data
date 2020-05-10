import * as d3 from 'd3'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-01')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 70000])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 80])
  .range([height, 0])

d3.csv(require('../data/countries.csv')).then(ready)

function ready(datapoints) {
  console.log('Data read in:', datapoints)

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('class', 'country-circle')
    .attr('r', 2)
    .attr('cx', d => xPositionScale(d.gdp_per_capita))
    .attr('cy', d => yPositionScale(d.life_expectancy))
    .attr('fill', 'pink')

  const yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  const xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.format('$,'))

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

    function render() {
      //grabbing the div that our svg is inside of
      //and asking it how wide it is
      //"hey svgi that is really a <g>, go through"
    

      const svgContainer = svg.node().closest('div')
      const svgWidth = svgContainer.offsetWidth
      console.log(svgWidth)
      // .node() means "no really give me the HTML element,
      //    not the weird d3 representation"
      // .parentNode means "give me the svg that's outside
      //    of the g," which we can actually change
      //    the size of with .attr
      // .closest('svg) means "go through your parents untill you find an svg "
      const actualSvg = d3.select(svg.node().closest('svg'))
      actualSvg.attr('width', svgWidth)

      //Remember how we do
      //var width = 700 - margin.left - margin.right?
    // this is the same thing, since svgWidth is the FULL
    // SIZE of the svg, not the drawing area (the g)

      const newWidth = svgWidth - margin.left - margin.right

      //Update our axes
      //First, update the scale
      //Then, update the axis

      xPositionScale.range([0, newWidth])

       // What's the right number of ticks?
    if (svgWidth < 400) {
      xAxis.ticks(2)
    } else if (svgWidth < 550) {
      xAxis.ticks(4) // only have 3 ticks
    } else {
      xAxis.ticks(null) // resets it to the default number of ticks
    }

      svg.select('.x-axis').call(xAxis)

      svg.selectAll('.country-circle')
      .attr('cx', d => xPositionScale(d.gdp_per_capita))


      console.log('resized to 500')
    }
    //When the window resizes, run the funciton
    //that redraws everything
    window.addEventListener('resize', render)

    
    render()

}
