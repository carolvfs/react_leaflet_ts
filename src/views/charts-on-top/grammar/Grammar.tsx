import "./Grammar.css"
import React from "react"
import JSONEditorReact from "./JSONEditorReact"
import {Col, Row, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Grammar: React.FC = () => {

  const renderJSONEditorReact = () => {
    return(
      <div className="grammar">
        <JSONEditorReact/>
      </div>
    )
  }

  const renderShowHideIcon = () => {
    return (
      <button id={"toggleSideBar"}>
        <FontAwesomeIcon id="rightArrow" size="2x" style={{color: "#696969", padding: 0, marginTop: "5px", marginBottom: "5px"}} icon={faArrowRight} />
        <FontAwesomeIcon id="leftArrow" className='hidden' size="2x" style={{color: "#696969", padding: 0, marginTop: "5px", marginBottom: "5px"}} icon={faArrowLeft} />
      </button> 
    )
  }

  return (
    <React.Fragment>
      {renderJSONEditorReact()}
      {/* {renderShowHideIcon()} */}
    </React.Fragment>
  )
}

export default Grammar