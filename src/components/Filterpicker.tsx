import React from "react";
import { TagpickerProps } from "../Pictime.types";

function Filterpicker(props: TagpickerProps) {

  return (
    <>
      <label className="filetype">Filter: </label>
      <select value={props.value} id="imagesize" onChange={props.handler}>
        <option value={0}>Alle</option>
        {/* <option value="keineTags">(Keine Tags)</option> */}
        {props.tags.map((tag: string, i: number) =>
          <option value={i + 1} style={{ backgroundColor: props.backcolors[i], color: props.textcolors[i] }}>{tag}</option>
        )}
      </select>
    </>
  )
}

export default Filterpicker;