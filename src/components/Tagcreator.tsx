import React from "react";
import { TagcreatorProps } from "../Pictime.types";

function Tagcreator(props: TagcreatorProps) {

  return (
    <>
      <label>Tagname: </label>
      <input 
        type="text" 
        maxLength={20} 
        className="filetype" 
        placeholder="max. 20 Zeichen" 
        style={{ width: "100px" }} 
        value={props.inputtext} 
        onInput={(e) => props.setInputtext((e.target as HTMLTextAreaElement).value)}>
      </input>
      <label className="filetype">Tagfarbe: </label>
      <input 
        type="color" 
        className="colorpicker" 
        value={props.inputcolor} 
        onInput={(e) => props.setInputcolor((e.target as HTMLTextAreaElement).value)}>  
      </input>
      <label className="filetype">Textfarbe: </label>
      <input 
        type="color" 
        className="colorpicker" 
        value={props.inputtextcolor} 
        onInput={(e) => props.setInputtextcolor((e.target as HTMLTextAreaElement).value)}>
      </input>
      <button onClick={props.handler} style={{ backgroundColor: props.inputcolor, color: props.inputtextcolor }}>Tag erstellen</button><br />
    </>
  )
}

export default Tagcreator;