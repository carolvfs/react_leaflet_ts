import JSONEditor, { JSONEditorMode } from "jsoneditor"
import 'jsoneditor/dist/jsoneditor.min.css'
import React, { Component, useEffect, useRef } from "react"

const JSONEditorReact: React.FC = ({

}) => {

  const refEditor = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if(refEditor.current == null) {
      const container = document.getElementById("json-editor");
      const options = {}
      refEditor.current = new JSONEditor(container as HTMLElement, options);
      
      const json = {
        "paper": {
          "conference": "VIS 2024",
          "submitted": true,
          "accepted": true,
          "we_are_going_to_Florida": true
        }
        // 'paperName': "???",
        // 'authors': "???",
        // 'accepted': true,
        // 'null': null,
        // 'number': 123,
        // 'object': {'a': 'b', 'c': 'd'},
        // 'time': 1575599819000,
        // 'string': 'Hello World',
        // 'onlineDemo': 'https://jsoneditoronline.org/'
      }

      // const json = {
      //   'array': [1, 2, 3],
      //   'boolean': true,
      //   'color': '#82b92c',
      //   'null': null,
      //   'number': 123,
      //   'object': {'a': 'b', 'c': 'd'},
      //   'time': 1575599819000,
      //   'string': 'Hello World',
      //   'onlineDemo': 'https://jsoneditoronline.org/'
      // }
      
      // refEditor.current.update(json)
      refEditor.current.set(json)
      refEditor.current.setMode("code")
    }
  }, []);
  console.log("jsoneditorreact")
  return (
    <React.Fragment>
      <div id="json-editor" style={{height: "100%"}}></div>

    </React.Fragment>
  )
  

}

export default JSONEditorReact
