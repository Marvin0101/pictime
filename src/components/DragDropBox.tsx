import React, { useState } from "react";

function DragDropBox(){
  const [image, setImage] = useState<any>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<string>("Frühling");
  const [backColor, setBackcolor] = useState<string[]>([]);
  const [textColor, setTextcolor] = useState<string[]>([]);

  const onImageChange = (event:any) => {
    console.log("onImageChange: event.target.files: "+event.target.files);
    if (event.target.files && event.target.files[0]) {
      console.log("bin in if");
      setImage((image: any) => [...image, URL.createObjectURL(event.target.files[0])]);
      setTag((tag: any) => [...tag, dropdown]);
      switch(dropdown){
        case "Frühling":
          setBackcolor([...backColor,"green"]);
          setTextcolor([...textColor,"white"]);
          break;
        case "Sommer":
          setBackcolor([...backColor,"#92AD40"]);
          setTextcolor([...textColor,"white"]);
          break;
        case "Herbst":
          setBackcolor([...backColor,"rgb(228, 81, 13)"]);
          setTextcolor([...textColor,"whiten"]);
          break;
        case "Winter":
          setBackcolor([...backColor,"white"]);
          setTextcolor([...textColor,"black"]);
      }
    }
  }

  const handleChange = (event:any) => {
      setDropdown(event.target.value);
  }

  const handleDelete = (i:number) => {
    setImage(image.filter((x:any, index:any) => index !== i));
    setTag(tag.filter((item:any, index) => index !==i));
    setBackcolor(backColor.filter((item:any, index) => index !==i));
    setTextcolor(textColor.filter((item:any, index) => index !==i));
    console.log("X clicked, i=" +i);
    console.log(image);
  }
  console.log("Image 1 Url: "+image[0]);
  return (
    <div>
      <label>Tag: </label>

      <select value={dropdown} id="tags" onChange={handleChange} className="filetype">
          <option value="Frühling">Frühling</option>
          <option value="Sommer">Sommer</option>
          <option value="Herbst">Herbst</option>
          <option value="Winter">Winter</option>
      </select>

      <label id="labelbutton" htmlFor="selectedFile"> 
        Upload 
      </label>

      <input 
        type="file" 
        id="selectedFile" 
        onChange={onImageChange} 
        className="filetype" 
        style={{display:"none"}} 
        onClick={(event)=> {(event.target as HTMLInputElement).value = ""}} 
        accept="image/*"
      />
      
      <p> Es {image.length === 1 ? "befindet": "befinden"} sich {image.length} {image.length === 1 ? "Bild": "Bilder"} in der Galerie.</p>

      <ul className="flex-container">
        {image.map((image:any, i:any) =>  
          <li key={i} className= "flex-item">
            <div className="container">
              <img src={image} alt=""/>
              <div className="tag" style={{backgroundColor:backColor[i], color:textColor[i]}}>
                {tag[i]}
              </div>
              <div className="close" onClick={() =>handleDelete(i)}>
                x
              </div>
              <a target="_blank" rel="noopener noreferrer" href={image}>
                <div className="open">
                  o
                </div>
              </a>
            </div>
          </li>
          )
        }
      </ul>
    </div>
  )
}

export default DragDropBox;