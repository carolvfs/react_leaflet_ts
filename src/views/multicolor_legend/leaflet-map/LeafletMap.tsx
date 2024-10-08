import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from "d3"

interface D3 {
    [key: string]: any;
  }

const d3Typed = d3 as D3

interface ILeafletMapProps {
  geojson: any
}

type ColorInterpolator = (t: number) => string

const LeafletMap: React.FC<ILeafletMapProps> = (props) => {
  const mapRef = useRef(null);
  const startCenter = [41.88199188922012, -87.62778901271656] as L.LatLngTuple;

  const [geojsonData, setGeojsonData] = useState(props.geojson);

  // const colorScheme = "interpolatePlasma"
  // const domain = [0, 1]

  const mapStyle = (feature: any, colorScheme: any, domain: any) => {
    
    // const colorScale = d3.scaleLinear().domain(domain).range([0, 1]);
    // let colorInterpolator;
    // if (typeof colorScheme === "string") {
    //   // colorInterpolator = d3Typed[colorScheme] as d3.Interpolator<number>;
    //   colorInterpolator = d3Typed[colorScheme]
    // } else {
    //   colorInterpolator = d3.scaleSequential(d3.piecewise(d3.interpolateRgb, colorScheme));
    // }

    let colorScale = null
    let colorInterpolator: ColorInterpolator = (t: number) => d3.interpolateBlues(t);
    
    if (typeof colorScheme === 'string') {
      colorInterpolator = d3[colorScheme as keyof typeof d3] as ColorInterpolator;
      colorScale = d3.scaleLinear()
        .domain(domain)
        .range([0, 1])

    } else {
      colorScale = d3.scaleLinear<string>()
        .domain(domain)
        .range(colorScheme)
    }

    const fillColor = feature.properties.values 
      ? typeof colorScheme === 'string'
        ? colorInterpolator(colorScale(feature.properties.values[0] as number) as number) // for NO2, try indices 27 and 40.
        : colorScale(feature.properties.values[0]) as string
      : "grey";

    const myStyle = {
      color: "#FEF9F8",
      weight: 0.8,
      fillColor: fillColor,
      fillOpacity: 0.8
    }

    return myStyle

  }

  const renderLayers = () => {
    if(geojsonData) {

    return (
        <GeoJSON key={`geojson-${geojsonData.id}`}
        data={geojsonData.data}
        style={ (feature) => mapStyle(feature, geojsonData.colorScheme, geojsonData.domain)}
            />
        )
    } else {
        return null
    }
  }

  useEffect(() => {
    setGeojsonData(props.geojson);
  }, [props.geojson]);

  return (
    <React.Fragment>
      <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer ref={mapRef} center={startCenter} zoom={9} style={{ height: "100%", width: "100%" }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {renderLayers()}
        </MapContainer>
      </div>
    </React.Fragment>
  );
};

export default LeafletMap;
