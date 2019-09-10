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
    'https://raw.githubusercontent.com/Joshuatanderson/d3-geojson-usa/master/assets/unemploymentData.csv';
  const GEO_PATH: string = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';

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

  const projection = d3.geoAlbersUsa()
    .translate([WIDTH / 2, HEIGHT / 2])
    .scale(1300)
  // this isn't the center of the SVG, but of the map's coordinates
  //https://bl.ocks.org/john-guerra/43c7656821069d00dcbc 
  // .center([39, 98])

  const path = d3.geoPath(projection)

  const colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues['9']);

  const drawMap = (path: any) => {
    // draw map
    d3.select('svg')
      .selectAll("path")
      .data(geoData.features)
      .enter().append("path")
      .attr("d", path)
      .attr('stroke', '#ffffff')
      .attr("class", "state")
      .attr("fill", (d: any) => {
        console.log(statsData)
        return colorScale(d.total);
      })
  }


  // color map
  return (
    <div className="App">
      <h1>'Merica</h1>
      <h3>Made with D3, TS, React, and &lt;3 </h3>
      <div id="svg-cont"></div>
    </div>
  );
}

export default App;
