import React, { useEffect, useState } from "react";
import Modalview from "./Modalview";
import Image from "./Image";
import Upload from "./Upload";
import Sizepicker from "./Sizepicker";
import Filterpicker from "./Filterpicker";
import Tagpicker from "./Tagpicker";
import Tagcreator from "./Tagcreator";

function Galerie() {
  const [image, setImage] = useState<string[]>([]);
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
    if (event.target.files && event.target.files[0]) {
      console.log("bin in if");
      setImage((image:string[]) => [...image, URL.createObjectURL(event.target.files[0])]);
      setTag((tag:string[]) => [...tag, tagList[dropdown]]);
      setBackcolor((backColor:string[]) => [...backColor, backColorList[dropdown]]);
      setTextcolor((textColor:string[]) => [...textColor, textColorList[dropdown]]);
      setImageTagList((imageTagList:number[]) => [...imageTagList, dropdown+1]);
    }
  }

  const handleChange = (event: any) => {
    setDropdown(parseInt(event.target.value));
  }

  const handleDelete = (i: number) => {
    if(filter !== 0){
      setImage(image.filter((item: any, index: number) => index !== indices[i]));
      setTag(tag.filter((item: any, index:number) => index !== indices[i]));
      setBackcolor(backColor.filter((item: any, index:number) => index !== indices[i]));
      setTextcolor(textColor.filter((item: any, index:number) => index !== indices[i]));
      setImageTagList(imageTagList.filter((item: any, index:number) => index !== indices[i]));
      // console.log("X clicked, i=" + i);
      // console.log(image);
    } else {
      setImage(image.filter((x: any, index:number) => index !== i));
      setTag(tag.filter((item: any, index:number) => index !== i));
      setBackcolor(backColor.filter((item: any, index:number) => index !== i));
      setTextcolor(textColor.filter((item: any, index:number) => index !== i));
      setImageTagList(imageTagList.filter((item: any, index:number) => index !== i));
      // console.log("X clicked, i=" + i);
      // console.log(image);
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

  // console.log("Image " + image);
  // console.log("Imagesize: " + sizePicker);
  // console.log("TagList: " + tagList);
  // console.log("Dropdown: " + dropdown);
  // console.log("Backcolor: " + backColor);
  // console.log("Imagetags: " + tag);
  // console.log("Inputcolor: " + inputColor);
  // console.log("ImageTagList: "+ imageTagList);

  for (let i=0; i < imageTagList.length; i++ ){
    if ( imageTagList[i] === filter ){
        indices.push( i );
    }
  }

  filtered = image.filter((x: any, index:number) => indices.includes(index));
  filteredTag = tag.filter((x: any, index:number) => indices.includes(index));
  filteredBackColor = backColor.filter((x: any, index:number) => indices.includes(index));
  filteredTextColor = textColor.filter((x: any, index:number) => indices.includes(index));
  imageShown = filter !==0 ? filtered : image;
  tagShown = filter !==0 ? filteredTag : tag;
  backColorShown = filter !==0 ? filteredBackColor : backColor;
  textColorShown = filter !==0 ? filteredTextColor : textColor;

  // console.log("Imageshown: "+imageShown);
  // console.log("filtered: "+filtered);
  // console.log("filteredTag: "+filteredTag);
  // console.log("Indices: "+indices);

  return (
    <div className="main">
      <table style={{ width: "100%" }}>
        <tr>
          <td style={{ width: "calc(200%/5)" }} >
            <span style={{ float: "left" }}>
              <Tagcreator inputtext={input} inputcolor={inputColor} inputtextcolor={inputTextColor} handler={handleCreateTag} setInputtext={setInput} setInputcolor={setInputColor} setInputtextcolor={setInputTextColor}/>
            </span>
          </td>
          <td style={{ width: "calc(100%/5)" }}>
            <Tagpicker value={dropdown} handler={handleChange} tags={tagList} backcolors={backColorList} textcolors={textColorList}/>
            <Upload handler={onImageChange}/>
          </td>
          <td style={{ width: "calc(200%/5)" }}>
            <span style={{ float: "right" }}>
              <Filterpicker value={filter} handler={handleFilter} tags={tagList} backcolors={backColorList} textcolors={textColorList}/>
              <Sizepicker value={sizePicker} handler={handleSize}/>
            </span>
          </td>
        </tr>
      </table>
      <p> Es {image.length === 1 ? "befindet" : "befinden"} sich {image.length} {image.length === 1 ? "Bild" : "Bilder"} in der Galerie.</p>

      <Modalview 
        display={modalVisible} 
        setInvisible = {setModalVisible} 
        imageUrl={imageShown} 
        tag={tagShown} 
        backColor={backColorShown} 
        textColor={textColorShown} 
        modalIndex={modalIndex}
      />

      <ul className="flex-container">
        {imageShown.map((image: string, i: number) =>
          <Image 
            key={i} 
            image={image} 
            tag={tagShown[i]} 
            imageSize={imagesize} 
            backColor={backColorShown[i]} 
            textColor={textColorShown[i]} 
            fontSize={fontsize} 
            index={i} 
            handlerImage={()=>handleImageClick(i)} 
            handlerDelete={()=>handleDelete(i)}
          />
        )
        }
      </ul>
    </div>
  )
}

export default Galerie;


