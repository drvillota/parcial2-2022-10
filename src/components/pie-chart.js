import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Pie = ({ data, width = 600, height = 600 }) => {
  const pieChart = useRef();

  useEffect(() => {
    // Get positions for each data object
    const piedata = d3.pie().value((d) => d.height)(data);
    console.log('piedata', piedata);
    // Define arcs for graphing
    const arc = d3.arc().innerRadius(0).outerRadius(200);
    // Define scale ordinal - discrete
    const colors = d3.scaleOrdinal([
      '#ffa822',
      '#134e6f',
      '#ff6150',
      '#1ac0c6',
      '#dee0e6',
    ]);

    // Define the size and position of svg
    const svg = d3
      .select(pieChart.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(300,300)');

    // Tooltip
    const tooldiv = d3
      .select('#chartArea')
      .append('div')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'gray');

    // Draw pie
    svg
      .append('g')
      .selectAll('path')
      .data(piedata)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors(i))
      .attr('stroke', 'white')
      .on('mouseover', (e, d) => {
        console.log(e);
        console.log(d);

        tooldiv
          .style('visibility', 'visible')
          .text(`${d.data.name}: ` + `${new Intl.NumberFormat().format(d.data.height)}`);
      })
      .on('mousemove', (e, d) => {
        tooldiv
          .style('top', e.pageY - 50 + 'px')
          .style('left', e.pageX - 50 + 'px');
      })
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden');
      });

    // Add title
    svg
      .append('text')
      .attr('x', '0px')
      .attr('y', '-250px')
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', 'black')
  });

  return (
    <div id='chartArea'>
      <svg ref={pieChart}></svg>
    </div>
  );
};

export default Pie;
