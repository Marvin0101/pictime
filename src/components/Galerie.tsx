import React, { useEffect, useState } from "react";

function Galerie(){
  const [image, setImage] = useState<any>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<number>(0);
  const [backColor, setBackcolor] = useState<string[]>([]);
  const [textColor, setTextcolor] = useState<string[]>([]);
  const [sizePicker,setSizePicker] = useState<string>("normal");
  const [imagesize, setImagesize] = useState<number>(300);
  const [tagList, setTagList] = useState<string[]>([]);
  const [backColorList, setBackColorList] = useState<string[]>([]);
  const [textColorList, setTextColorList] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [inputColor, setInputColor] = useState<string>('#d4d800');
  const [inputTextColor, setInputTextColor] = useState<string>('#a43538');

  const onImageChange = (event:any) => {
    console.log("onImageChange: event.target.files: "+event.target.files);
    if (event.target.files && event.target.files[0]) {
      console.log("bin in if");
      setImage((image: any) => [...image, URL.createObjectURL(event.target.files[0])]);
      setTag((tag: any) => [...tag, tagList[dropdown]]);
      setBackcolor((backColor: any) =>[...backColor,backColorList[dropdown]]);
      setTextcolor((textColor: any) =>[...textColor,textColorList[dropdown]]);

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
  
  const handleCreateTag = (event:any) => {
    setTagList((tagList) => [...tagList, input]);
    setBackColorList((backColorList) => [...backColorList, inputColor]);
    setTextColorList((textColorList) => [...textColorList, inputTextColor]);
  }

  console.log("Image 1 Url: "+image[0]);
  console.log("Imagesize: "+sizePicker);
  console.log("TagList: "+tagList);
  console.log("Dropdown: "+dropdown);
  console.log("Backcolor: "+backColor);
  console.log("Imagetags: "+tag);
  console.log("Inputcolor: "+inputColor);
  return (
    <div className="main">
      <table style={{width:"100%"}}>
        <tr>
        
        <td style={{width:"calc(100%/3)"}} >
        <span style={{float:"left"}}>
          <label>Tagname: </label>
          <input type="text" className="filetype" placeholder="Tagname" style={{width:"100px"}} value={input} onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)}></input>
          <label className="filetype">Tagfarbe: </label>
          <input type="color" className="colorpicker" value={inputColor} onInput={(e) => setInputColor((e.target as HTMLTextAreaElement).value)}></input>
          <label className="filetype">Textfarbe: </label>
          <input type="color" className="colorpicker" value={inputTextColor} onInput={(e) => setInputTextColor((e.target as HTMLTextAreaElement).value)}></input>
          <button onClick={handleCreateTag} style={{backgroundColor:inputColor, color:inputTextColor}}>Tag erstellen</button><br/>
          </span>
        </td>
        <td style={{width:"calc(100%/3)"}}>
     
      <label className="filetype">Tag wählen</label>
      <select value={dropdown} id="tags" onChange={handleChange} className="filetype">
        <option value="(kein Tag)">(kein Tag)</option>
        {tagList.map((tagList:string, i:number) => 
            <option value={i} style={{backgroundColor:backColorList[i], color:textColorList[i]}}>{tagList}</option>
        )}
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

export default Galerie;


