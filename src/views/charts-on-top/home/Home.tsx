import "./Home.css"
import React from 'react'
import Grammar from '../grammar/Grammar'
import GraphicalDisplays from "../graphical-displays/GraphicalDisplays"

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <div className="home">
        <div className='component' style={{padding: 0, position: "absolute", left: "7px", top: "7px", width: "1800px", height: "800px"}}>
          <GraphicalDisplays/>
        </div>
        <div className='component grammar-wrapper grammar-wrapper--isOpen'>
          <Grammar/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home