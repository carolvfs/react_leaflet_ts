import React from "react"
import "./GraphicalDisplays.css"
import SpatialView from "../spatial-view/SpatialView"

const GraphicalDisplays: React.FC = () => {
  return (
    <React.Fragment>
      <div style={{paddingLeft: 465, width: "100%", height: "100%"}}>
        <div className="graphical-displays">
          <SpatialView/>
        </div>
    </div>
    </React.Fragment>
  )
}

export default GraphicalDisplays