import React from "react";
import { TagpickerProps } from "../Pictime.types";

function Tagpicker(props: TagpickerProps) {

  return (
    <>
      <label className="filetype">Tag wählen</label>
      <select value={props.value} id="tags" onChange={props.handler} className="filetype">
        <option value={-1}>(kein Tag)</option>
        {props.tags.map((tag: string, i: number) =>
          <option value={i} style={{ backgroundColor: props.backcolors[i], color: props.textcolors[i] }}>{tag}</option>
        )}
      </select>
    </>
  )
}

export default Tagpicker;