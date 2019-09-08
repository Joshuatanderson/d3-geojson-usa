import React, { useEffect, useState } from 'react';
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
    // geoData && drawMap(path)
  }, [geoData])


  const STATS_PATH: string =
    'https://gist.githubusercontent.com/Fil/fa99e877a5698f5fdf0eb0246c86348b/raw/d3761d7e58f9c7f7d2b3c4679ddd65c86c6c3fdb/unemployment201907.csv';
  const GEO_PATH: string =
    '../assets/usGeo.json';

  const WIDTH: number = 1500;
  const HEIGHT: number = 1000;

  // draw SVG
  const createSvg = () => {
    d3.select('.App')
      .append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
  }

  // download data asynchronously
  const loadCsvData = async (path: string) => {
    return await d3.csv(path);
  }

  const loadJsonData = async (path: string) => {
    const data = await fetch(path);
    console.log(data)
    return data
  }

  // create projection

  const projection = d3.geoAzimuthalEqualArea()
  // .scale()
  .translate([WIDTH / 2, HEIGHT / 2])

  const path = d3.geoPath(projection)


  const drawMap = (path: any) => {
    // draw map

    d3.select('svg')
      .append("path")
      .datum({ type: "FeatureCollection", features: geoData.features })
      .attr("d", path)
      .attr('fill', '#f880f9')
      .attr('stroke', '#fff')
  }


  // color map
  return (
    <div className="App">

    </div>
  );
}

export default App;
