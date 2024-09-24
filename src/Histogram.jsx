import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Histogram = ({ data, selectedGene }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.Temp37_effect_size)])
      .nice()
      .range([0, width]);

    const bins = d3
      .bin()
      .domain(x.domain())
      .thresholds(x.ticks(100))
      (data.map((d) => d.Temp37_effect_size));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .nice()
      .range([height, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    const selectedGeneData = selectedGene
    const selectedEffectSize = selectedGeneData ? selectedGeneData.Temp37_effect_size : null;

    svg.selectAll(".bar")
      .data(bins)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.x0))
      .attr("y", (d) => y(d.length))
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("height", (d) => height - y(d.length))
      .attr("fill", (d) => {
        if (selectedEffectSize >= d.x0 && selectedEffectSize < d.x1) {
          return "gold";
        }
        return "maroon";
      });

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Effect Size");

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top)
      .text("Frequency");
  }, [data, selectedGene]);

  return <svg ref={svgRef}></svg>;
};

export default Histogram;
