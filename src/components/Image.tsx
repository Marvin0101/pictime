import React from "react";
import { ImageProps } from "../Pictime.types";

function Image(props: ImageProps) {

  return (
    <li key={props.index} className="flex-item">
      <div className="container">
        <img src={props.image} alt="" style={{ maxHeight: props.imageSize }} onClick={() => props.handlerImage(props.index)} className="imageview" />
        <div className="tag" style={{ backgroundColor: props.backColor, color: props.textColor, fontSize: props.fontSize }}>
          {props.tag}
        </div>
        <div className="close" onClick={() => props.handlerDelete(props.index)}>
          x
        </div>
        <a target="_blank" rel="noopener noreferrer" href={props.image}>
          <div className="open">
            o
          </div>
        </a>
      </div>
    </li>
  )
}

export default Image;