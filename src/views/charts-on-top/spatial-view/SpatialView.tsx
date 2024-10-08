import React, { useRef, useEffect, useCallback, useState, createElement } from "react"
import LeafletMap from "../leaflet-map/LeafletMap"
import D3Plot from "../d3-plot/D3Plot"
import * as d3 from "d3"
import { Canvg } from 'canvg'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


const SpatialView: React.FC = () => {

  const center:[number, number] = [41.88199188922012, -87.62778901271656]

  const multipleData = [[3, 4, 6, 8, 10], [6, 9, 23, 12, 21], [1, 2, 0, 3, 1]]
  const margin = {top: 10, right: 10, bottom: 20, left: 20}

  const contentHeight = 150//d3.select('.analyses-content-2')._groups[0][0].clientHeight
  const contentWidth  = 230//d3.select('.analyses-content-2')._groups[0][0].clientWidth

  const width  = contentWidth - margin.left - margin.right
  const height = contentHeight - margin.top - margin.bottom

  const bboxes = [
    [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]],
    [[41.87931051549818, -87.63681394296815], [41.87813694959114, -87.63530628471732]],
    [[41.884448600685275, -87.63536822725949], [41.883213512478704, -87.63387220995287]]
  ]

  const canvasLayer = L.layerGroup()
  const generateCanvas = (svg:SVGSVGElement, bbox:number[][], currentCanvas:any) => {

    if(svg && currentCanvas && canvasLayer) {
      
      const canvas: HTMLCanvasElement = currentCanvas
      const ctx = currentCanvas.getContext('2d')  
      const svgData = new XMLSerializer().serializeToString(svg)
        
      const v = Canvg.fromString(ctx, svgData)
  
      v.start()
      d3.select(svg).remove()
      
      const canvasDataURL = canvas.toDataURL()

      const corner1 = L.latLng(bbox[0][0], bbox[0][1]);
      const corner2 = L.latLng(bbox[1][0], bbox[1][1]);
      const bounds = L.latLngBounds(corner1, corner2);
  
      canvasLayer.addLayer(L.imageOverlay(canvasDataURL, bounds))

      d3.select(currentCanvas).remove()
    }

    return null
  }

  const renderPlots = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvas = d3.select(canvasRef.current)
      
    canvas.attr("width" , contentWidth.toString())
    canvas.attr("height", contentHeight.toString()) 

    return (
      <React.Fragment>
        {
          multipleData.map((data, i) => {
            const svgId = `svg-id-${i}`
            const bbox = bboxes[i]
            
            return(
              <React.Fragment key={`d3-plot-${svgId}`}>
                <D3Plot data={data} id={svgId} generateCanvas={generateCanvas} bbox={bbox} canvasRef={canvasRef}/>
              </React.Fragment>
            )
          })
        }
        <canvas ref={canvasRef}></canvas>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment> 
      <LeafletMap center={center} canvasLayer={canvasLayer}/>
      {renderPlots()}
    </React.Fragment>
  )
}

export default SpatialView