import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LegendProps {
  colorScheme: string | string[];
  domain: number[];
}

const Legend: React.FC<LegendProps> = ({ colorScheme, domain }) => {
  const legendRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!legendRef.current) return;

    const legendWidth = 200;
    const legendHeight = 20;
    const padding = 10;

    const svg = d3.select(legendRef.current)
      .attr('width', legendWidth + 2 * padding)
      .attr('height', legendHeight + 2 * padding + 30);

    svg.selectAll('*').remove(); // Clear previous contents
    
    let colorScale = null
    let colorInterpolator: (t: number) => string;
    
    if (typeof colorScheme === 'string') {
      colorInterpolator = d3[colorScheme as keyof typeof d3] as (t: number) => string;
      colorScale = d3.scaleLinear()
      .domain(domain)
      .range([0, 1])

    } else {
      colorScale = d3.scaleLinear<string>()
      .domain(domain)
      .range(colorScheme)
    }

    const linearGradient = svg.append('defs').append('linearGradient')
      .attr('id', 'linear-gradient');

    linearGradient.selectAll('stop')
      .data(colorScale.ticks().map((t, i, n) => ({
        offset: `${100 * (i / (n.length - 1))}%`,
        color: typeof colorScheme === 'string' ? colorInterpolator(colorScale(t as number) as number) : colorScale(t as number)
      })))
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    svg.append('rect')
      .attr('x', padding)
      .attr('y', padding)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)');

    const xAxis = d3.axisBottom(d3.scaleLinear()
      .domain([domain[0], domain[domain.length - 1]])
      .range([padding, legendWidth + padding]))
      .ticks(5);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${legendHeight + padding})`)
      .call(xAxis);

  }, [colorScheme, domain]);

  return (
    <div className="legend-container">
        <svg ref={legendRef} style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex:1000 }}></svg>
    </div>
  );
};

export default Legend;
