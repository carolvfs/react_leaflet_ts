import "./Home.css"
import React, { useCallback, useEffect, useState } from "react"
// import LeafletMap from "../leaflet-map/LeafletMap"
import LeafletMap from "../leaflet-map/LeafletMap"
import * as d3 from "d3"
import Form from 'react-bootstrap/Form'
import Legend from "../legend/Legend"

const Home: React.FC = () => {

  const [geojson, setGeojson] = useState<null | {id: string, data: any, colorScheme: any, domain: any}>(null)
  const geoList = [
    {title: 'Socioeconomics', file: 'rpl_theme1_ct.geojson', colorScheme: ["black", "green", "red"], domain:[0, 0.5, 1]},
    {title: 'Socioeconomics2', file: 'rpl_theme1_ct.geojson', colorScheme: "interpolateBrBG", domain:[0, 1]},
    {title: "NO2", file: "no2_wrf_ct.geojson", colorScheme: ["orange", "blue"], domain:[0, 40]}
  ]

  const handleRadio = async (item: any) => {
    try {
      const data = await d3.json(item.file);
      setGeojson({id: item.title, data: data, colorScheme: item.colorScheme, domain: item.domain});
    } catch (error) {
      console.error('Error fetching GeoJSON data:', error);
    }
  }
  
  const renderOptions = () => {
    return (
      <div className="options-container">
      <Form>
        {geoList.map((item:any, i: number) => {
          return (
            <div key={`default-${i}`} className="mb-3">
              <Form.Check // prettier-ignore
              type="radio"
              name="group1"
              id={`radio-${i}`}
              label={`${item.title}`}
              onChange={() => handleRadio(item)}
              />
            </div>
          )
      })}
      </Form>
      </div>
    )
  }

  const renderLegend = () => {
    if(geojson) {
      return <Legend colorScheme={geojson?.colorScheme} domain={geojson?.domain}/>
    } else{
      return  null
    }
  }

  return (
    <div className="home" id="home" style={{ width:"100%", height:"100%" }}>
      {renderOptions()}
      {renderLegend()}
      <LeafletMap geojson={geojson}/>
    </div>
  )
}

export default Home