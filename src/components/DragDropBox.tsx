import React, { useEffect, useState } from "react";

function DragDropBox(){
  const [image, setImage] = useState<any>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<string>("Frühling");
  const [backColor, setBackcolor] = useState<string[]>([]);
  const [textColor, setTextcolor] = useState<string[]>([]);
  const [sizePicker,setSizePicker] = useState<string>("normal");
  const [imagesize, setImagesize] = useState<number>(300);

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

  const handleSize = (event:any) => {
    setSizePicker(event.target.value);
    }

  useEffect(() => {
      console.log('fuck react should update the state immediatly, dumbass: '+sizePicker);
   
    switch(sizePicker) {
      case "klein":
        setImagesize(200);
        console.log("klein");
        break;
      case "normal":
        setImagesize(300);
        console.log("normal");
        break;
      case "gross":
        setImagesize(400);
        console.log("groß");
        break;
    }
  }, [sizePicker]);
  

  console.log("Image 1 Url: "+image[0]);
  console.log("Imagesize: "+sizePicker);
  return (
    <div>
      <table style={{width:"100%"}}>
        <tr>
        
        <td style={{width:"calc(100%/3)"}} ></td>
        <td style={{width:"calc(100%/3)"}}>
      <label>Tag: </label>

      <select value={dropdown} id="tags" onChange={handleChange} className="filetype">
          <option value="Frühling" style={{backgroundColor:"green"}}>Frühling</option>
          <option value="Sommer" style={{backgroundColor:"#92AD40"}}>Sommer</option>
          <option value="Herbst" style={{backgroundColor:"rgb(228, 81, 13)"}}>Herbst</option>
          <option value="Winter" style={{backgroundColor:"white", color:"black"}}>Winter</option>
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
      </td>
      <td style={{width:"calc(100%/3)"}}>
      <span style={{float:"right"}}>
      <label>Bildergröße: </label>

      <select value={sizePicker} id="imagesize" onChange={handleSize}>
          <option value="klein">Klein</option>
          <option value="normal">Normal</option>
          <option value="gross">Groß</option>
      </select>
      </span>
      </td>
      </tr>
      </table>
      <p> Es {image.length === 1 ? "befindet": "befinden"} sich {image.length} {image.length === 1 ? "Bild": "Bilder"} in der Galerie.</p>

      <ul className="flex-container">
        {image.map((image:any, i:any) =>  
          <li key={i} className= "flex-item">
            <div className="container">
              <img src={image} alt="" height={imagesize}/>
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