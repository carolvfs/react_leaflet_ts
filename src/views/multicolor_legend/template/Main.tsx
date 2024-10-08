import "./Main.css"
import React from "react"

const Main = (props:any) => {
  return (
    <React.Fragment>
      <main className="content container-fluid">
        <div className="p-2 mt-3">
          {props.children}
        </div>
      </main>
    </React.Fragment>
  )
}

export default Main