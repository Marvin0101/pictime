import React, { useEffect, useState } from "react";
import { ModalProps } from "../Pictime.types";



function Modal(props:ModalProps){

    const [imageIndex, setImageIndex] = useState<number>(props.modalIndex);

    useEffect(() => {
        setImageIndex(props.modalIndex);
    },[props.modalIndex])

    const nextImage = () => {
        if(imageIndex >= props.imageUrl.length-1){
            setImageIndex(0);
        } else {
            setImageIndex(imageIndex+1);
        }
        
    }

    const prevImage = () => {
        if(imageIndex <= 0){
            setImageIndex(props.imageUrl.length-1);
        } else {
            setImageIndex(imageIndex-1);
        }
    }

    const close = () => {
        props.setInvisible("none");
        setImageIndex(props.modalIndex);
    }

    console.log("Modalprops: " +props.imageUrl);
    console.log("Modalprops: " +props.modalIndex);
    console.log("ModalImageIndex: " +imageIndex);
    return (
        <div className="modal" style={{display:props.display}}>
            <div className="modal-content">
                <span className="closeModal" onClick={close} >&times;</span>
                <p>PicTime-Galerie</p>
                <div className="leftswipe" onClick={prevImage}><div>&lt;</div></div>
                <img src={props.imageUrl[imageIndex]} alt="" style={{height:"90%", width:"auto"}}/>
                <div className="rightswipe" onClick={nextImage}><div>&#062;</div></div>

            </div>
        </div>

    )
       

    
}

export default Modal;