import React from "react";
import { UploadProps } from "../Pictime.types";

function Upload(props: UploadProps) {

  return (
    <>
      <label id="labelbutton" htmlFor="selectedFile">
        Upload
      </label>
      <input
        type="file"
        id="selectedFile"
        onChange={props.handler}
        className="filetype"
        style={{ display: "none" }}
        onClick={(event) => { (event.target as HTMLInputElement).value = "" }}
        accept="image/*"
      />
    </>
  )
}

export default Upload;