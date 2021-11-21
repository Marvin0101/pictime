import React from "react";
import { SizepickerProps } from "../Pictime.types";

function Sizepicker(props: SizepickerProps) {

  return (
    <>
      <label className="filetype">Bildergröße: </label>
      <select value={props.value} id="imagesize" onChange={props.handler}>
        <option value="klein">Klein</option>
        <option value="normal">Normal</option>
        <option value="gross">Groß</option>
      </select>
    </>
  )
}

export default Sizepicker;