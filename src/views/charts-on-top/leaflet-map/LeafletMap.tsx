import React, { useEffect } from "react"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface ILeafletMapProps {
  center: [number, number]
  zoom?: number
  canvasLayer: any

}

const LeafletMap: React.FC<ILeafletMapProps> = (props) => {
  const CanvasLayer = () => {
    const map = useMap()
  
    useEffect(() => {

      props.canvasLayer.addTo(map)

    }, [map, props.canvasLayer])
  
    return null
  }

  return (
    <React.Fragment>
      <MapContainer center={props.center} zoom={15} style={{ height:"100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <CanvasLayer/>
      </MapContainer>
    </React.Fragment>
  )
}


// const CanvasLayer = (canvas:any, setCanvasLayer:Function) => {
//   const map = useMap()

//   useEffect(() => {

//     if(canvas) {
//       const canvasLayer = L.layerGroup().addTo(map)
//       // const canvasDataURL = canvas.toDataURL()
//       // canvasLayer.addLayer(L.imageOverlay(canvasDataURL, [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]]))
//       setCanvasLayer(canvasLayer)
//     }

//     // d3.select(canvas).remove()
//   }, [map, canvas, setCanvasLayer])

//   return null
// }


// const LeafletMap: React.FC<ILeafletMapProps> = (props) => {
//   const _zoom: number = props.zoom || 15

//   const CanvasLayer = () => {
//     const map = useMap()
  
//     useEffect(() => {
  
//       if(props.canvas) {
//         const canvasLayer = L.layerGroup().addTo(map)
//         // const canvasDataURL = canvas.toDataURL()
//         // canvasLayer.addLayer(L.imageOverlay(canvasDataURL, [[41.88461455979, -87.6279943111182],[41.88210642924351, -87.62464691457575]]))
//         props.setCanvasLayer(canvasLayer)
//       }
  
//       // d3.select(canvas).remove()
//     }, [map, props.canvas, props.setCanvasLayer])
  
//     return null
//   }

//   const renderMapContainer = () => {

//     if(props.center) {
//       return (
//         <MapContainer center={props.center} zoom={_zoom} style={{ height:"100%" }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//           />
//           <CanvasLayer/>
//         </MapContainer>
//       )
//     } else {
//       return null
//     }
//   }
  
//   return(
//     <React.Fragment>
//       {renderMapContainer()}
//     </React.Fragment>
//   )
// }

export default LeafletMap