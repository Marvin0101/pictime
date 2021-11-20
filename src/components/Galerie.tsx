import React, { useEffect, useState } from "react";
import Modalview from "./Modalview";

function Galerie() {
  const [image, setImage] = useState<any>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<number>(-1);
  const [backColor, setBackcolor] = useState<string[]>([]);
  const [textColor, setTextcolor] = useState<string[]>([]);
  const [sizePicker, setSizePicker] = useState<string>("normal");
  const [imagesize, setImagesize] = useState<number>(300);
  const [fontsize, setFontsize] = useState<number>(20);
  const [tagList, setTagList] = useState<string[]>([]);
  const [backColorList, setBackColorList] = useState<string[]>([]);
  const [textColorList, setTextColorList] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [inputColor, setInputColor] = useState<string>('#d4d800');
  const [inputTextColor, setInputTextColor] = useState<string>('#a43538');
  const [filter, setFilter] = useState<number>(0);
  const [imageTagList, setImageTagList] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<string>("none");
  const [modalIndex, setModalIndex] = useState<number>(0);
  let filtered:string[] = [];
  let filteredTag:string[] = [];
  let filteredBackColor:string[] = [];
  let filteredTextColor:string[] = [];
  let imageShown:string[] = [];
  let tagShown:string[] = [];
  let backColorShown:string[] = [];
  let textColorShown:string[] = [];
  let indices:number[] = [];

  const onImageChange = (event: any) => {
    console.log("onImageChange: event.target.files: " + event.target.files);
    if (event.target.files && event.target.files[0]) {
      console.log("bin in if");
      setImage((image: any) => [...image, URL.createObjectURL(event.target.files[0])]);
      setTag((tag: any) => [...tag, tagList[dropdown]]);
      setBackcolor((backColor: any) => [...backColor, backColorList[dropdown]]);
      setTextcolor((textColor: any) => [...textColor, textColorList[dropdown]]);
      setImageTagList((imageTagList:number[]) => [...imageTagList, dropdown+1]);
    }
  }

  const handleChange = (event: any) => {
    setDropdown(parseInt(event.target.value));
  }

  const handleDelete = (i: number) => {
    if(filter !== 0){
      setImage(image.filter((x: any, index: any) => index !== indices[i]));
      setTag(tag.filter((item: any, index) => index !== indices[i]));
      setBackcolor(backColor.filter((item: any, index) => index !== indices[i]));
      setTextcolor(textColor.filter((item: any, index) => index !== indices[i]));
      setImageTagList(imageTagList.filter((item: any, index) => index !== indices[i]));
      console.log("X clicked, i=" + i);
      console.log(image);
    } else {
      setImage(image.filter((x: any, index: any) => index !== i));
      setTag(tag.filter((item: any, index) => index !== i));
      setBackcolor(backColor.filter((item: any, index) => index !== i));
      setTextcolor(textColor.filter((item: any, index) => index !== i));
      setImageTagList(imageTagList.filter((item: any, index) => index !== i));
      console.log("X clicked, i=" + i);
      console.log(image);
    }
    
  }

  const handleSize = (event: any) => {
    setSizePicker(event.target.value);
  }

  useEffect(() => {
    switch (sizePicker) {
      case "klein":
        setImagesize(200);
        setFontsize(20);
        console.log("klein");
        break;
      case "normal":
        setImagesize(300);
        setFontsize(25);
        console.log("normal");
        break;
      case "gross":
        setImagesize(400);
        setFontsize(30);
        console.log("groß");
        break;
    }
  }, [sizePicker]);

  const handleCreateTag = (event: any) => {
    setTagList((tagList) => [...tagList, input]);
    setBackColorList((backColorList) => [...backColorList, inputColor]);
    setTextColorList((textColorList) => [...textColorList, inputTextColor]);
  }

  const handleFilter = (event: any) => {
    setFilter(parseInt(event.target.value));
  }

  const handleImageClick = (i:number) => {
    setModalVisible("block");
    setModalIndex(i);
  }

  console.log("Image " + image);
  console.log("Imagesize: " + sizePicker);
  console.log("TagList: " + tagList);
  console.log("Dropdown: " + dropdown);
  console.log("Backcolor: " + backColor);
  console.log("Imagetags: " + tag);
  console.log("Inputcolor: " + inputColor);
  console.log("ImageTagList: "+ imageTagList);

  for (let i=0; i < imageTagList.length; i++ ){
    if ( imageTagList[i] === filter ){
        indices.push( i );
    }
}

  filtered = image.filter((x: any, index: any) => indices.includes(index));
  filteredTag = tag.filter((x: any, index: any) => indices.includes(index));
  filteredBackColor = backColor.filter((x: any, index: any) => indices.includes(index));
  filteredTextColor = textColor.filter((x: any, index: any) => indices.includes(index));
  imageShown = filter !==0 ? filtered : image;
  tagShown = filter !==0 ? filteredTag : tag;
  backColorShown = filter !==0 ? filteredBackColor : backColor;
  textColorShown = filter !==0 ? filteredTextColor : textColor;

  console.log("Imageshown: "+imageShown);
  console.log("filtered: "+filtered);
  console.log("filteredTag: "+filteredTag);
  console.log("Indices: "+indices);

  return (
    <div className="main">
      <table style={{ width: "100%" }}>
        <tr>

          <td style={{ width: "calc(200%/5)" }} >
            <span style={{ float: "left" }}>
              <label>Tagname: </label>
              <input type="text" maxLength={20} className="filetype" placeholder="max. 20 Zeichen" style={{ width: "100px" }} value={input} onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)}></input>
              <label className="filetype">Tagfarbe: </label>
              <input type="color" className="colorpicker" value={inputColor} onInput={(e) => setInputColor((e.target as HTMLTextAreaElement).value)}></input>
              <label className="filetype">Textfarbe: </label>
              <input type="color" className="colorpicker" value={inputTextColor} onInput={(e) => setInputTextColor((e.target as HTMLTextAreaElement).value)}></input>
              <button onClick={handleCreateTag} style={{ backgroundColor: inputColor, color: inputTextColor }}>Tag erstellen</button><br />
            </span>
          </td>
          <td style={{ width: "calc(100%/5)" }}>

            <label className="filetype">Tag wählen</label>
            <select value={dropdown} id="tags" onChange={handleChange} className="filetype">
              <option value={-1}>(kein Tag)</option>
              {tagList.map((tagList: string, i: number) =>
                <option value={i} style={{ backgroundColor: backColorList[i], color: textColorList[i] }}>{tagList}</option>
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
              style={{ display: "none" }}
              onClick={(event) => { (event.target as HTMLInputElement).value = "" }}
              accept="image/*"
            />
          </td>
          <td style={{ width: "calc(200%/5)" }}>
            <span style={{ float: "right" }}>
              <label className="filetype">Filter: </label>

              <select value={filter} id="imagesize" onChange={handleFilter}>
                <option value={0}>Alle</option>
                {/* <option value="keineTags">(Keine Tags)</option> */}
                {tagList.map((tagList: string, i: number) =>
                  <option value={i+1} style={{ backgroundColor: backColorList[i], color: textColorList[i] }}>{tagList}</option>
                )}
              </select>
              <label className="filetype">Bildergröße: </label>

              <select value={sizePicker} id="imagesize" onChange={handleSize}>
                <option value="klein">Klein</option>
                <option value="normal">Normal</option>
                <option value="gross">Groß</option>
              </select>
            </span>
          </td>
        </tr>
      </table>
      <p> Es {image.length === 1 ? "befindet" : "befinden"} sich {image.length} {image.length === 1 ? "Bild" : "Bilder"} in der Galerie.</p>

      <Modalview display={modalVisible} setInvisible = {setModalVisible} imageUrl={imageShown} tag={tagShown} backColor={backColorShown} textColor={textColorShown} modalIndex={modalIndex}/>

      <ul className="flex-container">
        {imageShown.map((image: any, i: any) =>
          <li key={i} className="flex-item">
            <div className="container">
              <img src={image} alt="" style={{maxHeight:imagesize}} onClick={() => handleImageClick(i)} className="imageview"/>
              <div className="tag" style={{ backgroundColor: backColorShown[i], color: textColorShown[i], fontSize: fontsize }}>
                {tagShown[i]}
              </div>
              <div className="close" onClick={() => handleDelete(i)}>
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


