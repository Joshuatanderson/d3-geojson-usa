import React, { useEffect, useState } from 'react';
import './App.css'
import * as d3 from 'd3';

const App: React.FC = () => {
  const [statsData, setStatsData] = useState()
  const [geoData, setGeoData] = useState()

  // runs once on load, 
  // draws svg container, 
  // loads data
  useEffect(() => {
    createSvg()
    loadCsvData(STATS_PATH)
      .then(data => setStatsData(data))
    loadJsonData(GEO_PATH)
      .then(data => setGeoData(data))
  }, [])

  useEffect(() => {
    geoData && drawMap(path)
  }, [geoData])


  const STATS_PATH: string =
    'https://gist.githubusercontent.com/Fil/fa99e877a5698f5fdf0eb0246c86348b/raw/d3761d7e58f9c7f7d2b3c4679ddd65c86c6c3fdb/unemployment201907.csv';
  const GEO_PATH: string = 'https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/be6a6e239cd5b5b803c6e7c2ec405b793a9064dd/Colombia.geo.json'
  // https://bl.ocks.org/john-guerra/43c7656821069d00dcbc;

  const WIDTH: number = 1000;
  const HEIGHT: number = 750;

  // draw SVG
  const createSvg = () => {
    d3.select('#svg-cont')
      .append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
  }

  // download data asynchronously
  const loadCsvData = async (path: string) => {
    return await d3.csv(path);
  }

  const loadJsonData = async (path: string) => {
    return await d3.json(path)
  }

  // create projection

  const projection = d3.geoMercator()
    .translate([WIDTH / 2, HEIGHT / 2])
    .scale(2000)
    // this isn't the center of the SVG, but of the map's coordinates
    //https://bl.ocks.org/john-guerra/43c7656821069d00dcbc 
    .center([-74, 4.5])

  const path = d3.geoPath(projection)


  const drawMap = (path: any) => {
    // draw map
    d3.select('svg')
      .selectAll("path")
      .data(geoData.features)
      .enter().append("path")
      .attr("d", path)
      .style('fill', '#de8cce')
      .style('stroke', '#ffffff')
  }


  // color map
  return (
    <div className="App">
        <h1>Colombia</h1>
        <h3>Made with D3, TS, React, and &lt;3 </h3>
      <div id="svg-cont"></div> 
    </div>
  );
}

export default App;
